'use client'

import { TrendingUp, Play, Eye, Heart, Share2, Clock } from 'lucide-react'

const trendingVideos = [
  {
    id: 1,
    title: "Como fazer pizza em 60 segundos",
    creator: "@chefrapido",
    views: "2.3M",
    likes: "145K",
    duration: "0:58",
    thumbnail: "bg-gradient-to-br from-orange-400 to-red-500",
    category: "Culinária",
    trending: "#1"
  },
  {
    id: 2,
    title: "Dança viral do momento",
    creator: "@dancequeen",
    views: "1.8M",
    likes: "89K",
    duration: "0:15",
    thumbnail: "bg-gradient-to-br from-pink-400 to-purple-500",
    category: "Dança",
    trending: "#2"
  },
  {
    id: 3,
    title: "Truque de mágica impossível",
    creator: "@magicmaster",
    views: "1.5M",
    likes: "67K",
    duration: "0:30",
    thumbnail: "bg-gradient-to-br from-blue-400 to-cyan-500",
    category: "Entretenimento",
    trending: "#3"
  },
  {
    id: 4,
    title: "Transformação de quarto em 24h",
    creator: "@homedecor",
    views: "1.2M",
    likes: "78K",
    duration: "0:45",
    thumbnail: "bg-gradient-to-br from-green-400 to-emerald-500",
    category: "Casa & Decoração",
    trending: "#4"
  },
  {
    id: 5,
    title: "Exercício que queima 500 calorias",
    creator: "@fitnessguru",
    views: "980K",
    likes: "45K",
    duration: "0:60",
    thumbnail: "bg-gradient-to-br from-yellow-400 to-orange-500",
    category: "Fitness",
    trending: "#5"
  },
  {
    id: 6,
    title: "Receita de brownie de 2 ingredientes",
    creator: "@docinhofacil",
    views: "856K",
    likes: "34K",
    duration: "0:40",
    thumbnail: "bg-gradient-to-br from-amber-400 to-brown-500",
    category: "Culinária",
    trending: "#6"
  },
  {
    id: 7,
    title: "Penteado em 30 segundos",
    creator: "@belezarapida",
    views: "743K",
    likes: "28K",
    duration: "0:30",
    thumbnail: "bg-gradient-to-br from-rose-400 to-pink-500",
    category: "Beleza",
    trending: "#7"
  },
  {
    id: 8,
    title: "Hack de produtividade que mudou minha vida",
    creator: "@produtivo",
    views: "692K",
    likes: "41K",
    duration: "0:55",
    thumbnail: "bg-gradient-to-br from-indigo-400 to-purple-500",
    category: "Produtividade",
    trending: "#8"
  }
]

const categories = ["Todos", "Culinária", "Dança", "Entretenimento", "Casa & Decoração", "Fitness", "Beleza", "Produtividade"]

export default function TrendingWeek() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Tempestade da Semana</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Descubra os vídeos mais virais e tendências que estão dominando as redes sociais. 
          Inspire-se e crie conteúdo baseado no que está em alta!
        </p>
      </div>

      {/* Demo Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
        <p className="text-amber-400 font-medium">
          📺 Feed em modo demonstração - Conecte sua conta para ver tendências reais
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              category === "Todos"
                ? "bg-purple-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Trending Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingVideos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer bg-black/20 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105"
          >
            {/* Thumbnail */}
            <div className={`aspect-[9/16] ${video.thumbnail} relative flex items-center justify-center`}>
              {/* Trending Badge */}
              <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                {video.trending}
              </div>
              
              {/* Duration */}
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {video.duration}
              </div>

              {/* Play Button */}
              <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>

            {/* Video Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-xs mt-1">{video.creator}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span>{video.likes}</span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-gray-800 rounded text-xs">
                  {video.category}
                </span>
              </div>

              {/* Action Button */}
              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                <Share2 className="w-4 h-4" />
                <span>Usar como Inspiração</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Stats */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Estatísticas da Semana</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">847M</div>
            <div className="text-sm text-gray-400">Visualizações Totais</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">23.5M</div>
            <div className="text-sm text-gray-400">Curtidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">156K</div>
            <div className="text-sm text-gray-400">Novos Criadores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">89</div>
            <div className="text-sm text-gray-400">Tendências Ativas</div>
          </div>
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4">Hashtags em Alta</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "#pizzarapida", "#dançaviral", "#magictrick", "#homedecor", 
            "#fitness2024", "#brownie2ingredientes", "#penteadorapido", "#produtividade"
          ].map((hashtag) => (
            <span
              key={hashtag}
              className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30 hover:border-purple-400/50 cursor-pointer transition-colors"
            >
              {hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}