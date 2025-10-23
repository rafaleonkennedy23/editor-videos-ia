'use client'

import { Download, Share2, RotateCcw, Play, Instagram, Youtube, Music } from 'lucide-react'

interface ResultsDisplayProps {
  template: string
  duration: number
  onReset: () => void
}

const templateNames: Record<string, string> = {
  'neon-glow': 'Neon Glow',
  'blur-background': 'Fundo Blur',
  'viral-pro': 'Viral Pro',
  'gaming-style': 'Gaming Style'
}

const socialPlatforms = [
  { name: 'TikTok', icon: Music, color: 'from-pink-500 to-red-500' },
  { name: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500' },
  { name: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600' }
]

export default function ResultsDisplay({ template, duration, onReset }: ResultsDisplayProps) {
  const templateName = templateNames[template] || template

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
          <Play className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white">Cortes Gerados com Sucesso!</h2>
        <p className="text-gray-400">
          Criamos 3 cortes de {duration}s usando o template {templateName}
        </p>
      </div>

      {/* Generated Cuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((cutNumber) => (
          <div key={cutNumber} className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20">
            {/* Video Preview */}
            <div className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
              <div className="relative text-center">
                <Play className="w-12 h-12 text-white mb-2 mx-auto" />
                <p className="text-white font-medium">Corte {cutNumber}</p>
                <p className="text-sm text-gray-400">{duration}s • {templateName}</p>
              </div>
              
              {/* Simulated Template Effects */}
              {template === 'neon-glow' && (
                <div className="absolute inset-2 border-2 border-purple-400 rounded-lg animate-pulse"></div>
              )}
              {template === 'blur-background' && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
              )}
              {template === 'viral-pro' && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              )}
              {template === 'gaming-style' && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-xs text-white rounded">00:{duration}</div>
              )}
            </div>

            {/* Cut Info */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Qualidade:</span>
                <span className="text-green-400">1080p HD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tamanho:</span>
                <span className="text-white">{Math.round(Math.random() * 10 + 5)}MB</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors flex items-center justify-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>Baixar</span>
                </button>
                <button className="px-3 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Export */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4">Exportar para Redes Sociais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon
            return (
              <button
                key={platform.name}
                className={`p-4 rounded-xl bg-gradient-to-r ${platform.color} text-white hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}
              >
                <Icon className="w-5 h-5" />
                <span>Postar no {platform.name}</span>
              </button>
            )
          })}
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Conecte suas contas para postar diretamente nas redes sociais
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Criar Novos Cortes</span>
        </button>
        
        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Baixar Todos</span>
        </button>
      </div>

      {/* Stats */}
      <div className="text-center space-y-2">
        <p className="text-green-400 font-medium">+10 pontos ganhos! 🎉</p>
        <p className="text-sm text-gray-500">
          Vídeos processados hoje: 1/2 (Plano Gratuito)
        </p>
      </div>
    </div>
  )
}