'use client'

import { useEffect, useState } from 'react'
import { Star, Sparkles, Trophy, Zap } from 'lucide-react'

interface RewardSystemProps {
  show: boolean
  points: number
}

export default function RewardSystem({ show, points }: RewardSystemProps) {
  const [visible, setVisible] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (show) {
      setVisible(true)
      
      // Generate particles
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }))
      setParticles(newParticles)

      // Play sound effect (simulated)
      const audio = new Audio()
      audio.volume = 0.3
      // In a real app, you would load actual sound files
      // audio.src = '/sounds/reward.mp3'
      // audio.play().catch(() => {}) // Ignore errors if sound can't play

      // Hide after animation
      const timer = setTimeout(() => {
        setVisible(false)
        setParticles([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/20 animate-pulse"></div>

      {/* Main Reward Display */}
      <div className="relative">
        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 animate-ping"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.id * 100}ms`,
              animationDuration: '2s'
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
          </div>
        ))}

        {/* Central Reward */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-8 text-center animate-bounce shadow-2xl shadow-purple-500/50">
          <div className="space-y-4">
            {/* Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto animate-spin">
              <Star className="w-8 h-8 text-white" />
            </div>

            {/* Points */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white animate-pulse">
                +{points} Pontos!
              </div>
              <div className="text-white/80">Corte gerado com sucesso!</div>
            </div>

            {/* Effects */}
            <div className="flex justify-center space-x-4">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
              <Trophy className="w-6 h-6 text-yellow-300 animate-bounce" />
              <Zap className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-2xl animate-pulse -z-10 scale-150"></div>
      </div>

      {/* Achievement Notification */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-xl p-4 animate-slide-up">
        <div className="flex items-center space-x-3 text-white">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="font-medium">Progresso desbloqueado!</div>
            <div className="text-sm text-gray-300">Continue criando para mais recompensas</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <Star className="w-8 h-8 text-purple-400 animate-pulse" />
      </div>
      <div className="absolute top-1/3 right-1/4 animate-float-delayed">
        <Sparkles className="w-6 h-6 text-blue-400 animate-pulse" />
      </div>
      <div className="absolute bottom-1/3 left-1/3 animate-float">
        <Zap className="w-7 h-7 text-yellow-400 animate-pulse" />
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  )
}