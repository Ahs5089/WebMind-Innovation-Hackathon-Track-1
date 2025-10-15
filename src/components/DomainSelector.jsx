import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Globe, Heart, BarChart3, Loader2, RefreshCw } from 'lucide-react'
import { metricsAPI } from '../api/metrics'
import toast from 'react-hot-toast'

const iconMap = {
  brain: Brain,
  globe: Globe,
  heart: Heart,
  'bar-chart': BarChart3,
}

const colorMap = {
  purple: 'from-purple-500 to-pink-500',
  green: 'from-green-500 to-teal-500',
  red: 'from-red-500 to-orange-500',
  blue: 'from-blue-500 to-cyan-500',
}

const DomainSelector = ({ selectedDomain, onDomainSelect }) => {
  const [domains, setDomains] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchDomains = async () => {
    try {
      setLoading(true)
      const response = await metricsAPI.getAvailableDomains()
      setDomains(response.domains || [])
    } catch (error) {
      console.error('Failed to fetch domains:', error)
      toast.error('Failed to load domains')
      // Fallback to default domains
      setDomains([
        { id: 'ai', name: 'AI', description: 'Artificial Intelligence & Machine Learning', icon: 'brain', color: 'purple' },
        { id: 'geo', name: 'GEO', description: 'Geographic & Location Data', icon: 'globe', color: 'green' },
        { id: 'health', name: 'Health', description: 'Health & Medical Analysis', icon: 'heart', color: 'red' },
        { id: 'analysis', name: 'Analysis', description: 'General Data Analysis', icon: 'bar-chart', color: 'blue' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchDomains()
    setRefreshing(false)
    toast.success('Domains refreshed')
  }

  useEffect(() => {
    fetchDomains()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">
          Select Analysis Domain
        </h3>
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-cyan-400">
          Select Analysis Domain
        </h3>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {domains.map((domain) => {
          const Icon = iconMap[domain.icon] || Brain
          const isSelected = selectedDomain === domain.id
          const colorClass = colorMap[domain.color] || 'from-blue-500 to-cyan-500'
          
          return (
            <motion.div
              key={domain.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onDomainSelect(domain.id)}
              className={`domain-card ${isSelected ? 'selected' : ''}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${colorClass} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{domain.name}</h4>
                  <p className="text-sm text-gray-400">{domain.description}</p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default DomainSelector
