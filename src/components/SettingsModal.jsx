import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, RotateCcw } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const { isDark, toggleTheme } = useTheme()
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    onSave(localSettings)
    onClose()
  }

  const handleReset = () => {
    setLocalSettings({
      apiUrl: 'http://127.0.0.1:8000',
      timeout: 30000,
      refreshInterval: 5000,
      dataSource: 'all',
      maxHistoryItems: 50,
      enableNotifications: true,
      autoSave: true
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-navy-900 border border-cyan-500/20 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-cyan-400">Settings</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Theme Toggle */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Theme
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    isDark
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {isDark ? 'Dark' : 'Light'}
                </button>
              </div>
            </div>

            {/* API Configuration */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                API URL
              </label>
              <input
                type="url"
                value={localSettings.apiUrl}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, apiUrl: e.target.value }))}
                className="w-full px-3 py-2 bg-navy-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Timeout */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Request Timeout (ms)
              </label>
              <input
                type="number"
                value={localSettings.timeout}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-navy-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Data Source */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Data Source
              </label>
              <select
                value={localSettings.dataSource}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, dataSource: e.target.value }))}
                className="w-full px-3 py-2 bg-navy-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              >
                <option value="all">All Sources</option>
                <option value="research">Research Papers</option>
                <option value="news">News Articles</option>
                <option value="journals">Academic Journals</option>
              </select>
            </div>

            {/* Refresh Interval */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Auto Refresh Interval (ms)
              </label>
              <input
                type="number"
                value={localSettings.refreshInterval}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, refreshInterval: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-navy-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Max History Items */}
            <div>
              <label className="block text-sm font-medium text-cyan-300 mb-2">
                Max History Items
              </label>
              <input
                type="number"
                value={localSettings.maxHistoryItems}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, maxHistoryItems: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 bg-navy-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            {/* Toggle Options */}
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localSettings.enableNotifications}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, enableNotifications: e.target.checked }))}
                  className="w-4 h-4 text-cyan-500 bg-navy-800 border-cyan-500/30 rounded focus:ring-cyan-500/50"
                />
                <span className="text-cyan-300">Enable Notifications</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={localSettings.autoSave}
                  onChange={(e) => setLocalSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                  className="w-4 h-4 text-cyan-500 bg-navy-800 border-cyan-500/30 rounded focus:ring-cyan-500/50"
                />
                <span className="text-cyan-300">Auto Save Queries</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SettingsModal
