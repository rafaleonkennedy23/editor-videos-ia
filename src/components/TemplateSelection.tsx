'use client'

import { useState } from 'react'
import { Play, Sparkles, Zap, Gamepad2, Eye } from 'lucide-react'

interface TemplateSelectionProps {
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
}

const templates = [
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Bordas brilhantes com legendas coloridas em destaque',
    icon: Sparkles,
    preview: 'bg-gradient-to-r from-pink-500 to-purple-500',
    features: ['Bordas neon', 'Texto colorido', 'Efeitos de brilho']
  },
  {
    id: 'blur-background',
    name: 'Fundo Blur',
    description: 'Vídeo com fundo desfocado e texto centralizado',
    icon: Eye,
    preview: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    features: ['Fundo blur', 'Texto central', 'Foco no conteúdo']
  },
  {
    id: 'viral-pro',
    name: 'Viral Pro',
    description: 'Transições rápidas e cortes sincronizados com batida',
    icon: Zap,
    preview: 'bg-gradient-to-r from-orange-500 to-red-500',
    features: ['Cortes rápidos', 'Sincronização', 'Efeitos virais']
  },
  {
    id: 'gaming-style',
    name: 'Gaming Style',
    description: 'Bordas metálicas e contador de tempo',
    icon: Gamepad2,
    preview: 'bg-gradient-to-r from-green-500 to-emerald-500',
    features: ['Bordas metálicas', 'Contador', 'Estilo gaming']
  }
]

export default function TemplateSelection({
  selectedTemplate,
  setSelectedTemplate
}: TemplateSelectionProps) {
  const [previewingTemplate, setPreviewingTemplate] = useState<string | null>(null)

  const handlePreview = (templateId: string) => {
    setPreviewingTemplate(templateId)
    // Simular preview de 3 segundos
    setTimeout(() => {
      setPreviewingTemplate(null)
    }, 3000)
  }

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-semibold text-white mb-6">Escolha seu Template</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {templates.map((template) => {
          const Icon = template.icon
          const isSelected = selectedTemplate === template.id
          const isPreviewing = previewingTemplate === template.id

          return (
            <div
              key={template.id}
              className={`relative group cursor-pointer transition-all duration-300 ${
                isSelected ? 'scale-105' : 'hover:scale-102'
              }`}
              onClick={() => setSelectedTemplate(template.id)}
            >
              {/* Template Card */}
              <div
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-purple-400 shadow-lg shadow-purple-400/25'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                {/* Preview Area */}
                <div className={`h-32 ${template.preview} relative flex items-center justify-center`}>
                  {isPreviewing ? (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-white text-sm font-medium animate-pulse">
                        Prévia em andamento...
                      </div>
                    </div>
                  ) : (
                    <Icon className="w-8 h-8 text-white" />
                  )}
                  
                  {/* Preview Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePreview(template.id)
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                </div>

                {/* Template Info */}
                <div className="p-4 bg-gray-800/50">
                  <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{template.description}</p>
                  
                  {/* Features */}
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 left-2 p-1 bg-purple-500 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Glow Effect */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl -z-10"></div>
              )}
            </div>
          )
        })}
      </div>

      {/* Preview Modal */}
      {previewingTemplate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Prévia: {templates.find(t => t.id === previewingTemplate)?.name}
              </h3>
              <p className="text-gray-400 mb-4">
                Simulando preview de 3 segundos...
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}