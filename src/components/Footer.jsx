import { motion } from 'framer-motion'
import { Brain, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: [
      { name: 'Features', href: '/#features' },
      { name: 'API Documentation', href: '/docs', external: true },
      { name: 'Pricing', href: '/#pricing' },
      { name: 'Changelog', href: '/#changelog' }
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/#blog' },
      { name: 'Careers', href: '/#careers' },
      { name: 'Contact', href: '/#contact' }
    ],
    Resources: [
      { name: 'Documentation', href: '/docs', external: true },
      { name: 'Help Center', href: '/#help' },
      { name: 'Community', href: '/#community' },
      { name: 'Status', href: '/#status' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/#privacy' },
      { name: 'Terms of Service', href: '/#terms' },
      { name: 'Cookie Policy', href: '/#cookies' },
      { name: 'GDPR', href: '/#gdpr' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com', external: true },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', external: true },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', external: true },
    { name: 'Email', icon: Mail, href: 'mailto:contact@intellisense.ai', external: true }
  ]

  return (
    <footer className="bg-navy-900 border-t border-cyan-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  IntelliSense AI
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Advanced AI-powered analysis platform for intelligent data processing across multiple domains. 
                Transform your data into actionable insights with cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target={social.external ? '_blank' : '_self'}
                      rel={social.external ? 'noopener noreferrer' : ''}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-navy-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-cyan-400">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-1 group"
                    >
                      <span>{link.name}</span>
                      {link.external && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-cyan-500/10 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} IntelliSense AI Platform. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </span>
              <span>•</span>
              <span>API v1.0</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
