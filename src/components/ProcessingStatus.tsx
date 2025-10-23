'use client'

import { Brain, Scissors, Type, CheckCircle } from 'lucide-react'

interface ProcessingStatusProps {
  step: 'analyzing' | 'cutting' | 'applying'
}

const steps = [
  {
    id: 'analyzing',
    label: 'Analisando áudio e conteúdo...',
    description: 'IA identificando momentos interessantes',
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'cutting',
    label: 'Criando cortes automáticos...',
    description: 'Gerando segmentos otimizados',
    icon: Scissors,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'applying',
    label: 'Aplicando legendas e efeitos...',
    description: 'Finalizando seu vídeo viral',
    icon: Type,
    color: 'from-green-500 to-emerald-500'
  }
]

export default function ProcessingStatus({ step }: ProcessingStatusProps) {
  const currentStepIndex = steps.findIndex(s => s.id === step)
  const currentStep = steps[currentStepIndex]
  const Icon = currentStep.icon

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
      <div className="text-center space-y-6">
        {/* Current Step Icon */}
        <div className={`w-20 h-20 bg-gradient-to-r ${currentStep.color} rounded-full flex items-center justify-center mx-auto animate-pulse`}>
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Current Step Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{currentStep.label}</h3>
          <p className="text-gray-400">{currentStep.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progresso</span>
            <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${currentStep.color} h-3 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-3 max-w-md mx-auto">
          {steps.map((stepItem, index) => {
            const StepIcon = stepItem.icon
            const isCompleted = index < currentStepIndex
            const isCurrent = index === currentStepIndex
            const isPending = index > currentStepIndex

            return (
              <div
                key={stepItem.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isCurrent ? 'bg-gray-800/50 border border-purple-500/30' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500'
                      : isCurrent
                      ? `bg-gradient-to-r ${stepItem.color}`
                      : 'bg-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : (
                    <StepIcon className={`w-4 h-4 text-white ${isCurrent ? 'animate-pulse' : ''}`} />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isCompleted
                      ? 'text-green-400'
                      : isCurrent
                      ? 'text-white font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  {stepItem.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Fun Loading Messages */}
        <div className="text-center">
          <p className="text-sm text-gray-500 animate-pulse">
            {step === 'analyzing' && "🧠 Analisando cada palavra e emoção..."}
            {step === 'cutting' && "✂️ Criando momentos virais perfeitos..."}
            {step === 'applying' && "✨ Adicionando o toque final mágico..."}
          </p>
        </div>
      </div>
    </div>
  )
}