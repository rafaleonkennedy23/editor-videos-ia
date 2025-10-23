'use client'

import { useState, useRef } from 'react'
import { Upload, Link, X, FileVideo, AlertCircle } from 'lucide-react'

interface VideoUploaderProps {
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
  videoUrl: string
  setVideoUrl: (url: string) => void
}

export default function VideoUploader({
  uploadedFile,
  setUploadedFile,
  videoUrl,
  setVideoUrl
}: VideoUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [urlError, setUrlError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileSelect(files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    const validTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
    const maxSize = 500 * 1024 * 1024 // 500MB

    if (!validTypes.includes(file.type)) {
      alert('Formato não suportado. Use MP4, MOV ou AVI.')
      return
    }

    if (file.size > maxSize) {
      alert('Arquivo muito grande. Máximo 500MB.')
      return
    }

    setUploadedFile(file)
    setVideoUrl('') // Clear URL when file is uploaded
  }

  const handleUrlChange = (url: string) => {
    setVideoUrl(url)
    setUrlError('')
    if (url) {
      setUploadedFile(null) // Clear file when URL is entered
      
      // Basic URL validation
      const isValidUrl = /^https?:\/\/.+/.test(url)
      if (!isValidUrl) {
        setUrlError('URL inválida. Use um link completo (https://...)')
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Enviar Vídeo</span>
        </h3>

        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
              dragActive
                ? 'border-purple-400 bg-purple-400/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileVideo className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-300 mb-2">
              Arraste seu vídeo aqui ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Formatos: MP4, MOV, AVI • Máximo: 500MB
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Selecionar Arquivo
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.mov,.avi,video/*"
              onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              className="hidden"
            />
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileVideo className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-white font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-gray-400">{formatFileSize(uploadedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={() => setUploadedFile(null)}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* URL Section */}
      <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
          <Link className="w-5 h-5" />
          <span>Ou Cole um Link</span>
        </h3>

        <div className="space-y-3">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
          />
          
          {urlError && (
            <div className="flex items-center space-x-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{urlError}</span>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Suportamos YouTube, TikTok e Instagram. Apenas vídeos públicos com licença Creative Commons ou do seu próprio canal.
          </p>
        </div>
      </div>

      {/* OR Divider */}
      {!uploadedFile && !videoUrl && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-gray-400">OU</span>
          </div>
        </div>
      )}
    </div>
  )
}