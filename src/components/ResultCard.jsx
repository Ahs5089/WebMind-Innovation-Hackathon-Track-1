import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const ResultCard = ({ result, error, onRetry }) => {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card border-red-500/30 bg-red-900/10"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-red-400 mb-2">
              Error Processing Request
            </h3>
            <p className="text-red-300 mb-4">
              {error.message || 'An unexpected error occurred. Please try again.'}
            </p>
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  if (!result) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="card border-cyan-500/30 bg-cyan-900/10"
    >
      <div className="flex items-start space-x-3 mb-4">
        <CheckCircle className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <h3 className="text-lg font-semibold text-cyan-400">
          Analysis Complete
        </h3>
      </div>

      <div className="space-y-4">
        {/* Result Content */}
        <div className="bg-navy-800/50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-cyan-300 mb-2">Result:</h4>
          <div className="text-white whitespace-pre-wrap">
            {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
          </div>
        </div>

        {/* Metadata */}
        {result.timestamp && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Info className="w-4 h-4" />
            <span>Processed at: {new Date(result.timestamp).toLocaleString()}</span>
          </div>
        )}

        {result.domain && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Info className="w-4 h-4" />
            <span>Domain: {result.domain}</span>
          </div>
        )}
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-cyan-600/5 rounded-xl blur-xl -z-10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}

export default ResultCard
