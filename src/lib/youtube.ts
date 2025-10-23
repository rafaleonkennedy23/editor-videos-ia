// YouTube API integration for video downloads
// This would require YOUTUBE_API_KEY environment variable

interface YouTubeVideoInfo {
  id: string
  title: string
  duration: number
  thumbnail: string
  license: string
  channelId: string
  channelTitle: string
}

export class YouTubeService {
  private apiKey: string
  private baseUrl = 'https://www.googleapis.com/youtube/v3'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  // Extract video ID from YouTube URL
  extractVideoId(url: string): string | null {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }

    return null
  }

  // Get video information
  async getVideoInfo(videoId: string): Promise<YouTubeVideoInfo | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/videos?id=${videoId}&key=${this.apiKey}&part=snippet,contentDetails,status`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch video info')
      }

      const data = await response.json()
      
      if (!data.items || data.items.length === 0) {
        return null
      }

      const video = data.items[0]
      const snippet = video.snippet
      const contentDetails = video.contentDetails
      const status = video.status

      // Parse duration (PT4M13S format)
      const duration = this.parseDuration(contentDetails.duration)

      return {
        id: videoId,
        title: snippet.title,
        duration,
        thumbnail: snippet.thumbnails.high.url,
        license: status.license || 'youtube',
        channelId: snippet.channelId,
        channelTitle: snippet.channelTitle
      }
    } catch (error) {
      console.error('Error fetching video info:', error)
      return null
    }
  }

  // Check if video can be downloaded (Creative Commons or user's own channel)
  async canDownloadVideo(videoId: string, userChannelId?: string): Promise<boolean> {
    const videoInfo = await this.getVideoInfo(videoId)
    if (!videoInfo) return false

    // Allow if Creative Commons license
    if (videoInfo.license === 'creativeCommon') {
      return true
    }

    // Allow if user owns the channel
    if (userChannelId && videoInfo.channelId === userChannelId) {
      return true
    }

    return false
  }

  // Parse YouTube duration format (PT4M13S) to seconds
  private parseDuration(duration: string): number {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
    if (!match) return 0

    const hours = parseInt(match[1] || '0', 10)
    const minutes = parseInt(match[2] || '0', 10)
    const seconds = parseInt(match[3] || '0', 10)

    return hours * 3600 + minutes * 60 + seconds
  }

  // Validate URL and extract info
  async validateAndExtractInfo(url: string): Promise<{
    valid: boolean
    videoInfo?: YouTubeVideoInfo
    error?: string
  }> {
    const videoId = this.extractVideoId(url)
    
    if (!videoId) {
      return {
        valid: false,
        error: 'URL do YouTube inválida'
      }
    }

    const videoInfo = await this.getVideoInfo(videoId)
    
    if (!videoInfo) {
      return {
        valid: false,
        error: 'Vídeo não encontrado ou privado'
      }
    }

    // Check if video is too long (max 10 minutes for processing)
    if (videoInfo.duration > 600) {
      return {
        valid: false,
        error: 'Vídeo muito longo. Máximo 10 minutos.'
      }
    }

    return {
      valid: true,
      videoInfo
    }
  }
}

// Create YouTube service instance (would be initialized with API key)
export const createYouTubeService = (apiKey?: string) => {
  if (!apiKey) {
    console.warn('YouTube API key not provided')
    return null
  }
  return new YouTubeService(apiKey)
}

// Mock service for development/demo
export const mockYouTubeService = {
  async validateAndExtractInfo(url: string) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    
    if (!videoId) {
      return {
        valid: false,
        error: 'URL do YouTube inválida'
      }
    }

    // Mock video info
    return {
      valid: true,
      videoInfo: {
        id: videoId,
        title: 'Vídeo de Exemplo do YouTube',
        duration: 180, // 3 minutes
        thumbnail: 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg',
        license: 'creativeCommon',
        channelId: 'mock-channel-id',
        channelTitle: 'Canal de Exemplo'
      }
    }
  },

  async canDownloadVideo() {
    return Math.random() > 0.3 // 70% chance of success for demo
  }
}