import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Brain, Sparkles, Cpu, Database } from 'lucide-react'

const models = [
  {
    id: 'groq',
    name: 'Groq',
    description: 'Fast inference with Groq API',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
    enabled: true
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic Claude AI model',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    enabled: true
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google\'s advanced AI model',
    icon: Sparkles,
    color: 'from-blue-500 to-purple-500',
    enabled: true
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    description: 'OpenAI\'s most capable model',
    icon: Cpu,
    color: 'from-cyan-500 to-blue-500',
    enabled: true
  },
  {
    id: 'huggingface',
    name: 'HuggingFace',
    description: 'Open source models via HuggingFace',
    icon: Database,
    color: 'from-pink-500 to-rose-500',
    enabled: true
  }
]

const ModelSelector = ({ selectedModels, onModelToggle, disabled }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4">
        Select AI Models
      </h3>
      
      <div className="space-y-3">
        {models.map((model) => {
          const Icon = model.icon
          const isSelected = selectedModels.includes(model.id)
          
          return (
            <motion.label
              key={model.id}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-cyan-500/20 bg-navy-800/30 hover:border-cyan-500/40'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onModelToggle(model.id)}
                disabled={disabled || !model.enabled}
                className="sr-only"
              />
              
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${model.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-white">{model.name}</h4>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-gray-400">{model.description}</p>
              </div>
            </motion.label>
          )
        })}
      </div>
      
      <div className="text-sm text-gray-400 mt-4">
        Selected: {selectedModels.length} of {models.length} models
      </div>
    </div>
  )
}

export default ModelSelector
