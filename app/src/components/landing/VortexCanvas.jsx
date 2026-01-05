import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function VortexPortal({ state, onHover, onWarp }) {
  const meshRef = useRef()
  const particlesRef = useRef()
  const glowRef = useRef()

  const isHovering = state === 'hover'
  const isWarping = state === 'warp'
  const isLogin = state === 'login'

  const rotationSpeed = useMemo(() => {
    if (isWarping) return 1.0
    if (isHovering) return 0.3
    if (isLogin) return 0.05
    return 0.1
  }, [isHovering, isWarping, isLogin])

  const particleCount = 250
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2 * 3
      const radius = 1 + Math.random() * 2
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }
    return positions
  }, [])

  const particleSpeeds = useMemo(() => {
    return Array.from({ length: particleCount }, () => 0.5 + Math.random() * 1.5)
  }, [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * rotationSpeed
    }

    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9
      const intensity = isWarping ? 2 : isHovering ? 1.3 : 1
      glowRef.current.scale.setScalar(pulse * intensity)
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      const speedMultiplier = isWarping ? 5 : isHovering ? 2 : 1

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3
        const x = positions[idx]
        const y = positions[idx + 1]

        const angle = Math.atan2(y, x)
        const radius = Math.sqrt(x * x + y * y)

        const newRadius = radius - delta * particleSpeeds[i] * speedMultiplier

        if (newRadius < 0.3) {
          const resetRadius = 2.5 + Math.random() * 0.5
          positions[idx] = Math.cos(angle) * resetRadius
          positions[idx + 1] = Math.sin(angle) * resetRadius
        } else {
          const newAngle = angle + delta * rotationSpeed * 2
          positions[idx] = Math.cos(newAngle) * newRadius
          positions[idx + 1] = Math.sin(newAngle) * newRadius
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const opacity = 0.3

  return (
    <group>
      {/* Zone de détection invisible couvrant tout le vortex */}
      <mesh
        position={[0, 0, 0.1]}
        onPointerEnter={() => onHover(true)}
        onPointerLeave={() => onHover(false)}
        onClick={onWarp}
      >
        <circleGeometry args={[2.3, 64]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh ref={meshRef}>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.5 * opacity}
          transparent
          opacity={opacity}
        />
      </mesh>

      <mesh ref={glowRef}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.3 * opacity}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh>
        <ringGeometry args={[1.5, 2.3, 64]} />
        <shaderMaterial
          transparent
          uniforms={{
            uOpacity: { value: opacity }
          }}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec2 vUv;
            uniform float uOpacity;
            void main() {
              vec3 orange = vec3(0.976, 0.451, 0.086);
              vec3 purple = vec3(0.659, 0.333, 0.969);
              vec3 blue = vec3(0.231, 0.510, 0.965);

              vec3 color = mix(orange, purple, vUv.x);
              color = mix(color, blue, vUv.x * vUv.x);

              float alpha = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
              gl_FragColor = vec4(color, alpha * 0.6 * uOpacity);
            }
          `}
        />
      </mesh>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent
          opacity={0.8 * opacity}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

function WarpFlash({ active }) {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current && active) {
      meshRef.current.scale.x += delta * 15
      meshRef.current.scale.y += delta * 15
      meshRef.current.material.opacity = Math.max(0, meshRef.current.material.opacity - delta * 0.8)
    }
  })

  if (!active) return null

  return (
    <mesh ref={meshRef} position={[0, 0, 1]}>
      <circleGeometry args={[0.5, 64]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={1} />
    </mesh>
  )
}

function CTAText({ state }) {
  const text = state === 'hover' ? "Let's go" : "Ready ?"
  const scale = state === 'hover' ? 1.1 : 1

  if (state === 'warp' || state === 'login') return null

  return (
    <div
      className="absolute left-1/2 top-1/2 text-white text-2xl font-semibold pointer-events-none transition-all duration-300"
      style={{
        transform: `translate(-50%, -50%) scale(${scale})`,
        textShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
      }}
    >
      {text}
    </div>
  )
}

export default function VortexCanvas({ state, onHover, onWarp }) {
  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: '#000000', cursor: 'pointer' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 5]} intensity={1} color="#a855f7" />

        <Suspense fallback={null}>
          <VortexPortal state={state} onHover={onHover} onWarp={onWarp} />
          <WarpFlash active={state === 'warp'} />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>

      <CTAText state={state} />
    </>
  )
}
