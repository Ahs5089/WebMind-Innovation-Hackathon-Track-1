import { motion } from 'framer-motion'
import { History, Trash2, Play, Clock } from 'lucide-react'
import { useQueryHistory } from '../contexts/QueryHistoryContext'

const QueryHistory = ({ isOpen, onClose, onReRunQuery }) => {
  const { history, removeFromHistory, clearHistory } = useQueryHistory()

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-0 h-full w-80 bg-navy-900 border-l border-cyan-500/20 z-40 overflow-y-auto"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-cyan-400 flex items-center space-x-2">
            <History className="w-5 h-5" />
            <span>Query History</span>
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={clearHistory}
              className="text-red-400 hover:text-red-300 transition-colors"
              title="Clear All"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-8">
            <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No queries yet</p>
            <p className="text-sm text-gray-500">Your analysis history will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((query) => (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-navy-800/50 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                        {query.domain?.toUpperCase() || 'GENERAL'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(query.timestamp).toLocaleTimeString()}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {query.prompt}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromHistory(query.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors ml-2"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                
                <button
                  onClick={() => onReRunQuery(query)}
                  className="w-full mt-3 px-3 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <Play className="w-3 h-3" />
                  <span>Re-run Query</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default QueryHistory
