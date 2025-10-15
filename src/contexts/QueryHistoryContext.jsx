import { createContext, useContext, useState, useEffect } from 'react'

const QueryHistoryContext = createContext()

export const useQueryHistory = () => {
  const context = useContext(QueryHistoryContext)
  if (!context) {
    throw new Error('useQueryHistory must be used within a QueryHistoryProvider')
  }
  return context
}

export const QueryHistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('queryHistory')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('queryHistory', JSON.stringify(history))
  }, [history])

  const addToHistory = (query) => {
    const newQuery = {
      id: Date.now(),
      prompt: query.prompt,
      domain: query.domain,
      timestamp: new Date().toISOString(),
      result: query.result
    }
    
    setHistory(prev => [newQuery, ...prev.slice(0, 49)]) // Keep last 50 queries
  }

  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id))
  }

  const clearHistory = () => {
    setHistory([])
  }

  const reRunQuery = (query) => {
    return {
      prompt: query.prompt,
      domain: query.domain
    }
  }

  return (
    <QueryHistoryContext.Provider value={{
      history,
      addToHistory,
      removeFromHistory,
      clearHistory,
      reRunQuery
    }}>
      {children}
    </QueryHistoryContext.Provider>
  )
}
