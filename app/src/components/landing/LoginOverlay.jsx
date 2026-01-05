import { useState } from 'react'

export default function LoginOverlay({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Email et mot de passe requis')
      return
    }

    if (isRegister) {
      if (!formData.name) {
        setError('Nom requis')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas')
        return
      }
      if (formData.password.length < 6) {
        setError('Le mot de passe doit faire au moins 6 caractères')
        return
      }
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)
    onLogin({ email: formData.email, name: formData.name || 'User' })
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 animate-fade-in">
      <div
        className="w-full max-w-[220px] p-4 rounded-xl"
        style={{
          background: 'rgba(13, 13, 13, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {isRegister && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ton prénom"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 px-1 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                autoComplete="name"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="ton@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-2 px-1 text-sm text-white text-center placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors cursor-text"
              autoComplete="email"
              autoFocus
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/20 py-2 px-1 text-sm text-white text-center placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors cursor-text"
              autoComplete="current-password"
            />
          </div>

          {isRegister && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-white/20 py-2 px-1 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors"
                autoComplete="new-password"
              />
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-3/4 py-2 rounded-lg font-semibold text-sm text-white cursor-pointer transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #f97316, #a855f7, #3b82f6)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite'
              }}
            >
              {isLoading
                ? 'Connexion...'
                : isRegister
                  ? "Rejoindre l'équipe"
                  : 'Entrer'
              }
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
