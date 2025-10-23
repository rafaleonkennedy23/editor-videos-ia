import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format duration
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Format numbers (views, likes, etc.)
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Validate video file
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 500 * 1024 * 1024 // 500MB
  const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']

  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Formato não suportado. Use MP4, MOV ou AVI.' }
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Arquivo muito grande. Máximo 500MB.' }
  }

  return { valid: true }
}

// Validate URL
export function validateUrl(url: string): { valid: boolean; platform?: string; error?: string } {
  if (!url) return { valid: false, error: 'URL é obrigatória' }

  const urlPattern = /^https?:\/\/.+/
  if (!urlPattern.test(url)) {
    return { valid: false, error: 'URL inválida. Use um link completo (https://...)' }
  }

  // Detect platform
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return { valid: true, platform: 'youtube' }
  }
  if (url.includes('tiktok.com')) {
    return { valid: true, platform: 'tiktok' }
  }
  if (url.includes('instagram.com')) {
    return { valid: true, platform: 'instagram' }
  }

  return { valid: true, platform: 'unknown' }
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// Calculate level from points
export function calculateLevel(points: number): number {
  return Math.floor(points / 100) + 1
}

// Calculate progress to next level
export function calculateLevelProgress(points: number): number {
  return (points % 100) / 100 * 100
}

// Get rarity color
export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return 'from-gray-500 to-gray-600'
    case 'rare': return 'from-blue-500 to-blue-600'
    case 'epic': return 'from-purple-500 to-purple-600'
    case 'legendary': return 'from-yellow-500 to-orange-500'
    default: return 'from-gray-500 to-gray-600'
  }
}

// Simulate processing delay
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Generate mock video cuts
export function generateMockCuts(template: string, duration: number) {
  return Array.from({ length: 3 }, (_, i) => ({
    id: generateId(),
    cutNumber: i + 1,
    duration,
    template,
    size: Math.round(Math.random() * 10 + 5), // 5-15 MB
    quality: '1080p' as const,
    thumbnail: `bg-gradient-to-br from-gray-800 to-gray-900`
  }))
}

// Play sound effect (simulated)
export function playSound(soundType: 'success' | 'achievement' | 'level-up' | 'error'): void {
  // In a real app, you would load and play actual sound files
  try {
    const audio = new Audio()
    audio.volume = 0.3
    
    // Different sounds for different events
    switch (soundType) {
      case 'success':
        // audio.src = '/sounds/success.mp3'
        break
      case 'achievement':
        // audio.src = '/sounds/achievement.mp3'
        break
      case 'level-up':
        // audio.src = '/sounds/level-up.mp3'
        break
      case 'error':
        // audio.src = '/sounds/error.mp3'
        break
    }
    
    // audio.play().catch(() => {}) // Ignore errors if sound can't play
  } catch (error) {
    // Silently fail if audio is not supported
  }
}

// Local storage helpers
export const storage = {
  get: (key: string) => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  
  set: (key: string, value: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently fail if storage is not available
    }
  },
  
  remove: (key: string) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail if storage is not available
    }
  }
}

// Date helpers
export function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'agora'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}min atrás`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`
  return `${Math.floor(diffInSeconds / 86400)}d atrás`
}