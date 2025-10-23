'use client'

import { User, Star, Award, Crown, Trophy, Zap, Target, Gift } from 'lucide-react'

interface UserProfileProps {
  userPoints: number
  userLevel: number
  dailyVideos: number
}

const achievements = [
  {
    id: 'first-video',
    name: 'Primeiro Corte',
    description: 'Criou seu primeiro vídeo viral',
    icon: Play,
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 'speed-demon',
    name: 'Demônio da Velocidade',
    description: 'Processou 5 vídeos em um dia',
    icon: Zap,
    unlocked: true,
    rarity: 'rare'
  },
  {
    id: 'template-master',
    name: 'Mestre dos Templates',
    description: 'Usou todos os 4 templates',
    icon: Crown,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'viral-creator',
    name: 'Criador Viral',
    description: 'Criou 50 vídeos virais',
    icon: Trophy,
    unlocked: false,
    rarity: 'legendary'
  }
]

const rewards = [
  {
    id: 'neon-border',
    name: 'Borda Neon Exclusiva',
    type: 'template',
    cost: 100,
    unlocked: true
  },
  {
    id: 'epic-transition',
    name: 'Transição Épica',
    type: 'effect',
    cost: 250,
    unlocked: false
  },
  {
    id: 'premium-sound',
    name: 'Som Premium',
    type: 'audio',
    cost: 500,
    unlocked: false
  }
]

function Play({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z"/>
    </svg>
  )
}

export default function UserProfile({ userPoints, userLevel, dailyVideos }: UserProfileProps) {
  const nextLevelPoints = userLevel * 100
  const currentLevelProgress = (userPoints % 100) / 100 * 100

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-500 to-gray-600'
      case 'rare': return 'from-blue-500 to-blue-600'
      case 'epic': return 'from-purple-500 to-purple-600'
      case 'legendary': return 'from-yellow-500 to-orange-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">Criador Pro</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Nível {userLevel}</span>
              <span>•</span>
              <span>{userPoints} pontos</span>
              <span>•</span>
              <span>{dailyVideos} vídeos hoje</span>
            </div>

            {/* Level Progress */}
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-400 mb-1">
                <span>Progresso para Nível {userLevel + 1}</span>
                <span>{Math.round(currentLevelProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentLevelProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-2">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <span className="text-xs text-gray-400">Nível {userLevel}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 text-center">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-bold text-white">47</div>
          <div className="text-sm text-gray-400">Vídeos Criados</div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 text-center">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-bold text-white">{userPoints}</div>
          <div className="text-sm text-gray-400">Pontos Totais</div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 text-center">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-bold text-white">2</div>
          <div className="text-sm text-gray-400">Conquistas</div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 text-center">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div className="text-xl font-bold text-white">12</div>
          <div className="text-sm text-gray-400">Dias Consecutivos</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5" />
          <span>Conquistas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/10 border-current`
                    : 'bg-gray-800/30 border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.unlocked
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                        : 'bg-gray-600'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${achievement.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.unlocked && (
                    <div className="text-green-400">
                      <Award className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rewards Store */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Gift className="w-5 h-5" />
          <span>Loja de Recompensas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                reward.unlocked
                  ? 'bg-green-500/10 border-green-500/30'
                  : userPoints >= reward.cost
                  ? 'bg-purple-500/10 border-purple-500/30 hover:border-purple-400/50 cursor-pointer'
                  : 'bg-gray-800/30 border-gray-600'
              }`}
            >
              <div className="text-center space-y-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    reward.unlocked
                      ? 'bg-green-500'
                      : userPoints >= reward.cost
                      ? 'bg-purple-500'
                      : 'bg-gray-600'
                  }`}
                >
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h4 className={`font-medium ${reward.unlocked ? 'text-green-400' : 'text-white'}`}>
                  {reward.name}
                </h4>
                <p className="text-xs text-gray-400 capitalize">{reward.type}</p>
                
                {reward.unlocked ? (
                  <div className="text-green-400 text-sm font-medium">Desbloqueado</div>
                ) : (
                  <div className="space-y-2">
                    <div className={`text-sm font-medium ${userPoints >= reward.cost ? 'text-purple-400' : 'text-gray-500'}`}>
                      {reward.cost} pontos
                    </div>
                    <button
                      disabled={userPoints < reward.cost}
                      className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        userPoints >= reward.cost
                          ? 'bg-purple-500 text-white hover:bg-purple-600'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {userPoints >= reward.cost ? 'Desbloquear' : 'Pontos Insuficientes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Upgrade */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-500/30">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Upgrade para Premium</h3>
          <p className="text-gray-300 max-w-md mx-auto">
            Desbloqueie cortes ilimitados, templates exclusivos e processamento 3x mais rápido
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>✨ Sem marca d'água</span>
            <span>•</span>
            <span>🚀 Processamento rápido</span>
            <span>•</span>
            <span>🎵 Músicas licenciadas</span>
          </div>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300">
            Fazer Upgrade - €9,99/mês
          </button>
        </div>
      </div>
    </div>
  )
}