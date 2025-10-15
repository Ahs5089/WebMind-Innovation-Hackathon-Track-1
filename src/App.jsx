import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { QueryHistoryProvider } from './contexts/QueryHistoryContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import QueryHistory from './components/QueryHistory' // Reintroducing QueryHistory component
import SettingsModal from './components/SettingsModal' // Assuming a modal for settings

function App() {
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  return (
    <ThemeProvider>
      <QueryHistoryProvider>
        <div className="min-h-screen bg-navy-950 dark:bg-navy-950 light:bg-gray-50">
          <Navbar
            onSettingsOpen={() => setShowSettings(true)}
            onHistoryOpen={() => setShowHistory(true)}
          />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          {showHistory && <QueryHistory onClose={() => setShowHistory(false)} />} {/* QueryHistory modal */}
          {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />} {/* Settings modal */}
          <Footer />
          <Toast />
        </div>
      </QueryHistoryProvider>
    </ThemeProvider>
  )
}

export default App