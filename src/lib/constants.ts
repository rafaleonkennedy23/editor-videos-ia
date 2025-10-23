// App Constants
export const APP_NAME = 'CutStorm'
export const APP_SLOGAN = 'Transforme vídeos longos em cortes virais com IA'

// File Upload Limits
export const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB
export const SUPPORTED_VIDEO_FORMATS = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
export const SUPPORTED_EXTENSIONS = ['.mp4', '.mov', '.avi']

// Usage Limits
export const FREE_DAILY_LIMIT = 2
export const PREMIUM_DAILY_LIMIT = -1 // Unlimited

// Processing Steps
export const PROCESSING_STEPS = [
  {
    id: 'analyzing',
    label: 'Analisando áudio e conteúdo...',
    description: 'IA identificando momentos interessantes',
    duration: 2000
  },
  {
    id: 'cutting',
    label: 'Criando cortes automáticos...',
    description: 'Gerando segmentos otimizados',
    duration: 2000
  },
  {
    id: 'applying',
    label: 'Aplicando legendas e efeitos...',
    description: 'Finalizando seu vídeo viral',
    duration: 2000
  }
]

// Templates
export const TEMPLATES = [
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Bordas brilhantes com legendas coloridas em destaque',
    preview: 'bg-gradient-to-r from-pink-500 to-purple-500',
    features: ['Bordas neon', 'Texto colorido', 'Efeitos de brilho'],
    premium: false
  },
  {
    id: 'blur-background',
    name: 'Fundo Blur',
    description: 'Vídeo com fundo desfocado e texto centralizado',
    preview: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    features: ['Fundo blur', 'Texto central', 'Foco no conteúdo'],
    premium: false
  },
  {
    id: 'viral-pro',
    name: 'Viral Pro',
    description: 'Transições rápidas e cortes sincronizados com batida',
    preview: 'bg-gradient-to-r from-orange-500 to-red-500',
    features: ['Cortes rápidos', 'Sincronização', 'Efeitos virais'],
    premium: true
  },
  {
    id: 'gaming-style',
    name: 'Gaming Style',
    description: 'Bordas metálicas e contador de tempo',
    preview: 'bg-gradient-to-r from-green-500 to-emerald-500',
    features: ['Bordas metálicas', 'Contador', 'Estilo gaming'],
    premium: true
  }
]

// Social Platforms
export const SOCIAL_PLATFORMS = [
  {
    name: 'TikTok',
    color: 'from-pink-500 to-red-500',
    recommendedDuration: 15,
    aspectRatio: '9:16'
  },
  {
    name: 'Instagram',
    color: 'from-purple-500 to-pink-500',
    recommendedDuration: 30,
    aspectRatio: '9:16'
  },
  {
    name: 'YouTube',
    color: 'from-red-500 to-red-600',
    recommendedDuration: 60,
    aspectRatio: '16:9'
  }
]

// Achievements
export const ACHIEVEMENTS = [
  {
    id: 'first-video',
    name: 'Primeiro Corte',
    description: 'Criou seu primeiro vídeo viral',
    rarity: 'common',
    points: 10
  },
  {
    id: 'speed-demon',
    name: 'Demônio da Velocidade',
    description: 'Processou 5 vídeos em um dia',
    rarity: 'rare',
    points: 50
  },
  {
    id: 'template-master',
    name: 'Mestre dos Templates',
    description: 'Usou todos os 4 templates',
    rarity: 'epic',
    points: 100
  },
  {
    id: 'viral-creator',
    name: 'Criador Viral',
    description: 'Criou 50 vídeos virais',
    rarity: 'legendary',
    points: 500
  }
]

// Rewards Store
export const REWARDS = [
  {
    id: 'neon-border',
    name: 'Borda Neon Exclusiva',
    type: 'template',
    cost: 100,
    description: 'Template exclusivo com bordas neon animadas'
  },
  {
    id: 'epic-transition',
    name: 'Transição Épica',
    type: 'effect',
    cost: 250,
    description: 'Efeito de transição cinematográfico'
  },
  {
    id: 'premium-sound',
    name: 'Som Premium',
    type: 'audio',
    cost: 500,
    description: 'Biblioteca de sons licenciados'
  }
]

// Level System
export const LEVEL_SYSTEM = {
  pointsPerLevel: 100,
  maxLevel: 50,
  levelRewards: {
    5: 'neon-border',
    10: 'epic-transition',
    20: 'premium-sound'
  }
}

// API Endpoints (for future implementation)
export const API_ENDPOINTS = {
  upload: '/api/upload',
  process: '/api/process',
  download: '/api/download',
  youtube: '/api/youtube',
  user: '/api/user',
  achievements: '/api/achievements'
}

// Error Messages
export const ERROR_MESSAGES = {
  fileTooBig: 'Arquivo muito grande. Máximo 500MB.',
  invalidFormat: 'Formato não suportado. Use MP4, MOV ou AVI.',
  uploadFailed: 'Falha no upload. Tente novamente.',
  processingFailed: 'Erro no processamento. Tente novamente.',
  networkError: 'Erro de conexão. Verifique sua internet.',
  dailyLimitReached: 'Limite diário atingido. Faça upgrade para Premium.',
  invalidUrl: 'URL inválida. Use um link completo (https://...)',
  videoNotFound: 'Não conseguimos baixar este vídeo. Envie o arquivo manualmente.'
}

// Success Messages
export const SUCCESS_MESSAGES = {
  uploadSuccess: 'Vídeo enviado com sucesso!',
  processingComplete: 'Corte gerado com sucesso! +10 pontos.',
  achievementUnlocked: 'Nova conquista desbloqueada!',
  levelUp: 'Parabéns! Você subiu de nível!',
  rewardUnlocked: 'Nova recompensa desbloqueada!'
}