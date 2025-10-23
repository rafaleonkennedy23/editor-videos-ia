export interface VideoFile {
  file: File
  url: string
  duration: number
  size: number
}

export interface VideoUrl {
  url: string
  platform: 'youtube' | 'tiktok' | 'instagram'
  title?: string
  duration?: number
}

export interface Template {
  id: string
  name: string
  description: string
  preview: string
  features: string[]
  premium?: boolean
}

export interface ProcessingStep {
  id: string
  label: string
  description: string
  progress: number
  status: 'pending' | 'active' | 'completed' | 'error'
}

export interface GeneratedCut {
  id: string
  duration: number
  template: string
  url: string
  thumbnail: string
  size: number
  quality: '720p' | '1080p' | '4K'
}

export interface UserStats {
  level: number
  points: number
  videosCreated: number
  dailyVideos: number
  consecutiveDays: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface Reward {
  id: string
  name: string
  type: 'template' | 'effect' | 'audio' | 'feature'
  cost: number
  unlocked: boolean
  description: string
}

export interface TrendingVideo {
  id: string
  title: string
  creator: string
  views: string
  likes: string
  duration: string
  category: string
  trending: string
  thumbnail: string
}

export type TabType = 'edit' | 'trending' | 'profile'
export type ProcessingStepType = 'idle' | 'analyzing' | 'cutting' | 'applying' | 'complete'
export type DurationType = 15 | 30 | 60