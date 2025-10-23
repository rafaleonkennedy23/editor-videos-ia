'use client'

import { useState, useEffect } from 'react'
import { Zap, TrendingUp, User, Upload, Link, Play, Star, Award, Crown } from 'lucide-react'
import VideoUploader from '@/components/VideoUploader'
import TemplateSelection from '@/components/TemplateSelection'
import ProcessingStatus from '@/components/ProcessingStatus'
import ResultsDisplay from '@/components/ResultsDisplay'
import TrendingWeek from '@/components/TrendingWeek'
import UserProfile from '@/components/UserProfile'
import RewardSystem from '@/components/RewardSystem'
import UsageLimits from '@/components/UsageLimits'

type Tab = 'edit' | 'trending' | 'profile'
type ProcessingStep = 'idle' | 'analyzing' | 'cutting' | 'applying' | 'complete'

export default function CutStorm() {
  const [activeTab, setActiveTab] = useState<Tab>('edit')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [selectedDuration, setSelectedDuration] = useState<15 | 30 | 60>(30)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle')
  const [userPoints, setUserPoints] = useState(150)
  const [userLevel, setUserLevel] = useState(3)
  const [dailyVideos, setDailyVideos] = useState(0)
  const [showReward, setShowReward] = useState(false)

  // Simular processamento
  const handleGenerateCuts = async () => {
    if (!uploadedFile && !videoUrl) return
    if (!selectedTemplate) return

    const steps: ProcessingStep[] = ['analyzing', 'cutting', 'applying', 'complete']
    
    for (const step of steps) {
      setProcessingStep(step)
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    // Adicionar pontos e mostrar recompensa
    setUserPoints(prev => prev + 10)
    setDailyVideos(prev => prev + 1)
    setShowReward(true)
    
    setTimeout(() => setShowReward(false), 3000)
  }

  const resetForm = () => {
    setUploadedFile(null)
    setVideoUrl('')
    setSelectedTemplate('')
    setProcessingStep('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CutStorm
              </h1>
            </div>
            
            <UsageLimits dailyVideos={dailyVideos} />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-purple-500/20 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'edit', label: 'Editar', icon: Upload },
              { id: 'trending', label: 'Tempestade da Semana', icon: TrendingUp },
              { id: 'profile', label: 'Perfil', icon: User }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as Tab)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ${
                  activeTab === id
                    ? 'border-purple-400 text-purple-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'edit' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-white">
                Transforme vídeos longos em cortes virais com IA
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Upload seu vídeo ou cole um link e deixe nossa IA criar cortes perfeitos para TikTok, Instagram Reels e YouTube Shorts
              </p>
            </div>

            {processingStep === 'idle' && (
              <>
                {/* Video Upload Section */}
                <VideoUploader
                  uploadedFile={uploadedFile}
                  setUploadedFile={setUploadedFile}
                  videoUrl={videoUrl}
                  setVideoUrl={setVideoUrl}
                />

                {/* Duration Selection */}
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Duração dos Cortes</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[15, 30, 60].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration as 15 | 30 | 60)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedDuration === duration
                            ? 'border-purple-400 bg-purple-400/10 text-purple-400'
                            : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <div className="text-2xl font-bold">{duration}s</div>
                        <div className="text-sm opacity-75">
                          {duration === 15 ? 'TikTok' : duration === 30 ? 'Instagram' : 'YouTube'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Template Selection */}
                <TemplateSelection
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
                />

                {/* Generate Button */}
                <div className="text-center">
                  <button
                    onClick={handleGenerateCuts}
                    disabled={(!uploadedFile && !videoUrl) || !selectedTemplate}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-2xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center space-x-2">
                      <Zap className="w-5 h-5" />
                      <span>Gerar Cortes com IA</span>
                    </div>
                  </button>
                </div>
              </>
            )}

            {/* Processing Status */}
            {processingStep !== 'idle' && processingStep !== 'complete' && (
              <ProcessingStatus step={processingStep} />
            )}

            {/* Results */}
            {processingStep === 'complete' && (
              <ResultsDisplay
                template={selectedTemplate}
                duration={selectedDuration}
                onReset={resetForm}
              />
            )}
          </div>
        )}

        {activeTab === 'trending' && <TrendingWeek />}
        
        {activeTab === 'profile' && (
          <UserProfile
            userPoints={userPoints}
            userLevel={userLevel}
            dailyVideos={dailyVideos}
          />
        )}
      </main>

      {/* Reward System */}
      <RewardSystem show={showReward} points={10} />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  )
}