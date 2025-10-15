import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Send, 
  RefreshCw, 
  Settings, 
  History, 
  Download,
  Play,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import ModelSelector from '../components/ModelSelector'
import ProgressBar from '../components/ProgressBar'
import ResultsDisplay from '../components/ResultsDisplay'
import QueryHistory from '../components/QueryHistory'
import SettingsModal from '../components/SettingsModal'
import { metricsAPI } from '../api/metrics'
import { useQueryHistory } from '../contexts/QueryHistoryContext'
import toast from 'react-hot-toast'

const DashboardPage = () => {
  const [prompt, setPrompt] = useState('')
  const [targetDomain, setTargetDomain] = useState('')
  const [selectedModels, setSelectedModels] = useState(['gpt4', 'claude'])
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [analysisId, setAnalysisId] = useState(null)
  const [settings, setSettings] = useState({
    apiUrl: 'http://127.0.0.1:8000',
    timeout: 30000,
    refreshInterval: 5000,
    dataSource: 'all',
    maxHistoryItems: 50,
    enableNotifications: true,
    autoSave: true
  })

  const { addToHistory } = useQueryHistory()

  const handleModelToggle = (modelId) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      toast.error('Please provide a prompt for analysis.')
      return
    }

    if (selectedModels.length === 0) {
      toast.error('Please select at least one AI model.')
      return
    }

    setIsLoading(true)
    setError(null)
    setResults(null)
    setProgress(0)
    setStatus('Initializing analysis...')

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + Math.random() * 20
        })
      }, 300)

      setStatus('Fetching responses from AI models...')
      
      const response = await metricsAPI.runMultiLLMAnalysis(
        prompt, 
        selectedModels, 
        targetDomain || null,
        {
          dataSource: settings.dataSource,
          timeout: settings.timeout
        }
      )
      
      clearInterval(progressInterval)
      setProgress(100)
      setStatus('Analysis completed!')
      setResults(response)
      
      // Add to history
      if (settings.autoSave) {
        addToHistory({
          prompt,
          domain: targetDomain,
          result: response
        })
      }
      
      toast.success('Multi-LLM analysis completed successfully!')
      setIsLoading(false)

    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to start analysis'
      setError({ message: errorMessage })
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    setResults(null)
    setProgress(0)
    setStatus('')
  }

  const handleReset = () => {
    setPrompt('')
    setTargetDomain('')
    setResults(null)
    setError(null)
    setProgress(0)
    setStatus('')
    setAnalysisId(null)
  }

  const handleReRunQuery = (query) => {
    setPrompt(query.prompt)
    setTargetDomain(query.domain || '')
    setResults(null)
    setError(null)
    setProgress(0)
    setStatus('')
    setAnalysisId(null)
    setShowHistory(false)
  }

  const handleSettingsSave = (newSettings) => {
    setSettings(newSettings)
    toast.success('Settings saved successfully!')
  }

  const handleExport = () => {
    if (!results) return
    
    const dataStr = JSON.stringify(results, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `analysis-${Date.now()}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
    
    toast.success('Results exported successfully!')
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Multi-LLM Analysis Dashboard
            </span>
          </h1>
          <p className="text-xl text-cyan-300 max-w-2xl mx-auto">
            Compare multiple AI models and get comprehensive analysis results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Prompt & Model Selection */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Prompt Input */}
            <div className="bg-navy-900/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-cyan-400">
                  Analysis Prompt
                </h3>
                <span className="text-sm text-gray-400">
                  {prompt.length}/1000
                </span>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your analysis question or prompt here..."
                className="w-full px-4 py-3 bg-navy-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300 min-h-[120px] resize-none"
                disabled={isLoading}
                maxLength={1000}
              />
            </div>

            {/* Target Domain Input */}
            <div className="bg-navy-900/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                Target Domain (Optional)
              </h3>
              
              <input
                type="text"
                value={targetDomain}
                onChange={(e) => setTargetDomain(e.target.value)}
                placeholder="e.g., example.com, specific domain to analyze"
                className="w-full px-4 py-3 bg-navy-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-300/70 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                disabled={isLoading}
              />
            </div>

            {/* Model Selection */}
            <div className="bg-navy-900/50 border border-cyan-500/20 rounded-xl p-6">
              <ModelSelector
                selectedModels={selectedModels}
                onModelToggle={handleModelToggle}
                disabled={isLoading}
              />
            </div>

            {/* Action Buttons */}
            <div className="bg-navy-900/50 border border-cyan-500/20 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading || !prompt.trim() || selectedModels.length === 0}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                    <span>{isLoading ? 'Running Analysis...' : 'Run Multi-LLM Analysis'}</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleExport}
                    disabled={!results}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-navy-800 hover:bg-navy-700 text-cyan-400 border border-cyan-500/30 rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    <span>Export JSON</span>
                  </motion.button>
                </div>

                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300"
                  disabled={isLoading}
                >
                  Reset All
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              progress={progress}
              status={status}
              isVisible={isLoading}
            />

            {/* Status Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/50 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold">Error</h4>
                  <p className="text-red-300 text-sm">{error.message}</p>
                  <button
                    onClick={handleRetry}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm underline"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}

            {results && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/50 border border-green-500/30 rounded-lg p-4 flex items-start space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-green-400 font-semibold">Analysis Complete</h4>
                  <p className="text-green-300 text-sm">
                    Successfully analyzed with {selectedModels.length} models
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Results Display */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <ResultsDisplay
              results={results}
              onExport={handleExport}
            />
          </motion.div>
        </div>

        {/* Quick Start Examples */}
        {!results && !error && !isLoading && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <h3 className="text-lg font-semibold text-cyan-400 mb-6 text-center">
              Quick Start Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { prompt: 'Analyze the sentiment of customer reviews for our product', domain: 'example.com' },
                { prompt: 'Compare different AI models for code generation tasks', domain: 'github.com' },
                { prompt: 'Evaluate the performance of various language models on math problems', domain: 'math.edu' },
                { prompt: 'Analyze the quality of responses from different AI assistants', domain: 'assistant.ai' },
                { prompt: 'Compare model outputs for creative writing prompts', domain: 'writing.com' },
                { prompt: 'Evaluate AI model performance on scientific questions', domain: 'science.org' }
              ].map((example, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setPrompt(example.prompt)
                    setTargetDomain(example.domain)
                  }}
                  className="p-4 rounded-lg border border-cyan-500/20 bg-navy-800/30 hover:bg-navy-800/50 transition-all duration-300 text-left"
                >
                  <p className="text-sm text-gray-300 mb-2">{example.prompt}</p>
                  <p className="text-xs text-cyan-400">{example.domain}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Modals */}
        <QueryHistory
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
          onReRunQuery={handleReRunQuery}
        />
        
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSave={handleSettingsSave}
        />
      </div>
    </div>
  )
}

export default DashboardPage

