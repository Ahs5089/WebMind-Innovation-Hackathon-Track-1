import { motion } from 'framer-motion'

const ProgressBar = ({ progress, status, isVisible }) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full bg-navy-800/50 rounded-lg p-4 border border-cyan-500/20"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-cyan-400">Analysis Progress</span>
        <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full bg-navy-700 rounded-full h-2 mb-2">
        <motion.div
          className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <span className="text-sm text-gray-300">{status}</span>
      </div>
    </motion.div>
  )
}

export default ProgressBar
