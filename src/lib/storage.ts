// Local storage keys
const STORAGE_KEYS = {
  USER_STATS: 'cutstorm_user_stats',
  DAILY_VIDEOS: 'cutstorm_daily_videos',
  ACHIEVEMENTS: 'cutstorm_achievements',
  REWARDS: 'cutstorm_rewards',
  LAST_VISIT: 'cutstorm_last_visit'
}

// User stats management
export const userStorage = {
  getStats: () => {
    if (typeof window === 'undefined') return null
    try {
      const stats = localStorage.getItem(STORAGE_KEYS.USER_STATS)
      return stats ? JSON.parse(stats) : {
        level: 1,
        points: 0,
        videosCreated: 0,
        consecutiveDays: 1,
        joinDate: new Date().toISOString()
      }
    } catch {
      return null
    }
  },

  saveStats: (stats: any) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats))
    } catch {
      // Silently fail
    }
  },

  addPoints: (points: number) => {
    const stats = userStorage.getStats()
    if (!stats) return

    stats.points += points
    stats.level = Math.floor(stats.points / 100) + 1
    userStorage.saveStats(stats)
    return stats
  }
}

// Daily videos tracking
export const dailyStorage = {
  getTodayCount: () => {
    if (typeof window === 'undefined') return 0
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_VIDEOS)
      if (!data) return 0

      const { date, count } = JSON.parse(data)
      const today = new Date().toDateString()
      
      return date === today ? count : 0
    } catch {
      return 0
    }
  },

  incrementToday: () => {
    if (typeof window === 'undefined') return 0
    try {
      const today = new Date().toDateString()
      const currentCount = dailyStorage.getTodayCount()
      const newCount = currentCount + 1

      localStorage.setItem(STORAGE_KEYS.DAILY_VIDEOS, JSON.stringify({
        date: today,
        count: newCount
      }))

      return newCount
    } catch {
      return 0
    }
  },

  canCreateVideo: () => {
    const count = dailyStorage.getTodayCount()
    return count < 2 // Free limit
  }
}

// Achievements management
export const achievementStorage = {
  getUnlocked: () => {
    if (typeof window === 'undefined') return []
    try {
      const achievements = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
      return achievements ? JSON.parse(achievements) : []
    } catch {
      return []
    }
  },

  unlock: (achievementId: string) => {
    if (typeof window === 'undefined') return false
    try {
      const unlocked = achievementStorage.getUnlocked()
      if (unlocked.includes(achievementId)) return false

      unlocked.push(achievementId)
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(unlocked))
      return true
    } catch {
      return false
    }
  },

  isUnlocked: (achievementId: string) => {
    const unlocked = achievementStorage.getUnlocked()
    return unlocked.includes(achievementId)
  }
}

// Rewards management
export const rewardStorage = {
  getUnlocked: () => {
    if (typeof window === 'undefined') return []
    try {
      const rewards = localStorage.getItem(STORAGE_KEYS.REWARDS)
      return rewards ? JSON.parse(rewards) : []
    } catch {
      return []
    }
  },

  unlock: (rewardId: string, cost: number) => {
    if (typeof window === 'undefined') return false
    try {
      const stats = userStorage.getStats()
      if (!stats || stats.points < cost) return false

      const unlocked = rewardStorage.getUnlocked()
      if (unlocked.includes(rewardId)) return false

      // Deduct points and unlock reward
      stats.points -= cost
      userStorage.saveStats(stats)

      unlocked.push(rewardId)
      localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(unlocked))
      return true
    } catch {
      return false
    }
  },

  isUnlocked: (rewardId: string) => {
    const unlocked = rewardStorage.getUnlocked()
    return unlocked.includes(rewardId)
  }
}

// Visit tracking
export const visitStorage = {
  updateLastVisit: () => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_VISIT, new Date().toISOString())
    } catch {
      // Silently fail
    }
  },

  getLastVisit: () => {
    if (typeof window === 'undefined') return null
    try {
      const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT)
      return lastVisit ? new Date(lastVisit) : null
    } catch {
      return null
    }
  },

  isConsecutiveDay: () => {
    const lastVisit = visitStorage.getLastVisit()
    if (!lastVisit) return true

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const lastVisitDate = lastVisit.toDateString()
    const yesterdayDate = yesterday.toDateString()
    const todayDate = today.toDateString()

    return lastVisitDate === yesterdayDate || lastVisitDate === todayDate
  }
}

// Clear all data (for testing/reset)
export const clearAllData = () => {
  if (typeof window === 'undefined') return
  Object.values(STORAGE_KEYS).forEach(key => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail
    }
  })
}