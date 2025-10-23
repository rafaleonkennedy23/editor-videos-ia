'use client'

import { Video, Crown } from 'lucide-react'

interface UsageLimitsProps {
  dailyVideos: number
}

export default function UsageLimits({ dailyVideos }: UsageLimitsProps) {
  const maxDailyVideos = 2
  const remainingVideos = maxDailyVideos - dailyVideos

  return (
    <div className="flex items-center space-x-4">
      {/* Daily Counter */}
      <div className="flex items-center space-x-2 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-lg border border-purple-500/20">
        <Video className="w-4 h-4 text-purple-400" />
        <span className="text-sm text-white">
          {dailyVideos}/{maxDailyVideos}
        </span>
        <span className="text-xs text-gray-400">hoje</span>
      </div>

      {/* Premium Button */}
      <button className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:scale-105 transition-all duration-300 text-sm">
        <Crown className="w-4 h-4 text-white" />
        <span className="text-white font-medium">Premium</span>
      </button>

      {/* Limit Warning */}
      {remainingVideos === 0 && (
        <div className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg">
          <span className="text-red-400 text-sm font-medium">Limite atingido</span>
        </div>
      )}
    </div>
  )
}