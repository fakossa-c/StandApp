import { useState, useCallback } from 'react'
import VortexCanvas from './VortexCanvas'
import LoginOverlay from './LoginOverlay'

const STATES = {
  IDLE: 'idle',
  HOVER: 'hover',
  WARP: 'warp',
  LOGIN: 'login'
}

export default function StargateLanding() {
  const [appState, setAppState] = useState(STATES.IDLE)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleHover = useCallback((isHovering) => {
    if (appState === STATES.IDLE || appState === STATES.HOVER) {
      setAppState(isHovering ? STATES.HOVER : STATES.IDLE)
    }
  }, [appState])

  const handleWarp = useCallback(() => {
    if (appState === STATES.HOVER || appState === STATES.IDLE) {
      setAppState(STATES.WARP)
      setTimeout(() => {
        setAppState(STATES.LOGIN)
      }, 1500)
    }
  }, [appState])

  const handleLogin = useCallback((userData) => {
    console.log('Login mock:', userData)
    setIsAuthenticated(true)
  }, [])

  if (isAuthenticated) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur StandApp</h1>
          <p className="text-gray-400">Application en construction...</p>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="mt-8 px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative">
      <VortexCanvas
        state={appState}
        onHover={handleHover}
        onWarp={handleWarp}
      />

      {appState === STATES.LOGIN && (
        <LoginOverlay onLogin={handleLogin} />
      )}
    </div>
  )
}
