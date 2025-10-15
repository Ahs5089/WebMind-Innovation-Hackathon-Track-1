import { motion } from 'framer-motion'
import { Brain, Zap, Shield, Users, Code, BarChart3 } from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Integration',
      description: 'Powered by cutting-edge artificial intelligence algorithms for intelligent data processing and analysis.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Lightning-fast analysis with real-time processing capabilities for instant insights and results.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with robust data protection and reliable infrastructure.',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Users,
      title: 'User-Friendly Interface',
      description: 'Intuitive design with smooth animations and modern UI for the best user experience.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'RESTful API architecture with comprehensive documentation for easy integration.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: BarChart3,
      title: 'Multi-Domain Analysis',
      description: 'Support for AI, GEO, Health, and general analysis domains with specialized algorithms.',
      color: 'from-red-500 to-pink-500'
    }
  ]

  const stats = [
    { label: 'Analysis Domains', value: '4+' },
    { label: 'API Endpoints', value: '10+' },
    { label: 'Response Time', value: '< 2s' },
    { label: 'Uptime', value: '99.9%' }
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              About AI Dashboard
            </span>
          </h1>
          <p className="text-xl text-cyan-300 max-w-3xl mx-auto leading-relaxed">
            A powerful, modern platform that transforms data into actionable insights through 
            advanced AI analysis across multiple domains.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="card text-center"
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>



        {/* Key Benefits */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="card"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Why Choose IntelliSense AI?
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400">Multi-Model Comparison</h3>
              <p className="text-gray-300">
                Compare results from multiple AI models including GPT-4, Claude, Gemini, and more to get the best insights.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400">Real-time Analytics</h3>
              <p className="text-gray-300">
                Get comprehensive analytics with charts, metrics, and performance comparisons in real-time.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400">Export & Integration</h3>
              <p className="text-gray-300">
                Export results in JSON format and integrate with your existing workflows seamlessly.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400">Query History</h3>
              <p className="text-gray-300">
                Save and revisit your previous analyses with our built-in query history feature.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
