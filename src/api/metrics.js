import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const metricsAPI = {
  // Health check endpoint
  async checkHealth() {
    try {
      const response = await api.get('/api/health')
      return response.data
    } catch (error) {
      console.error('Health check failed:', error)
      throw error
    }
  },

  // Get available domains from backend
  async getAvailableDomains() {
    try {
      const response = await api.get('/api/domains')
      return response.data
    } catch (error) {
      console.error('Failed to fetch domains:', error)
      // Fallback to default domains if API fails
      return {
        domains: [
          { id: 'ai', name: 'AI', description: 'Artificial Intelligence & Machine Learning', icon: 'brain', color: 'purple' },
          { id: 'geo', name: 'GEO', description: 'Geographic & Location Data', icon: 'globe', color: 'green' },
          { id: 'health', name: 'Health', description: 'Health & Medical Analysis', icon: 'heart', color: 'red' },
          { id: 'analysis', name: 'Analysis', description: 'General Data Analysis', icon: 'bar-chart', color: 'blue' }
        ]
      }
    }
  },

  // Submit metrics with prompt and domain
  async submitMetrics(prompt, targetDomain, options = {}) {
    try {
      const response = await api.post('/api/metrics', {
        prompt,
        target_domain: targetDomain,
        ...options
      })
      return response.data
    } catch (error) {
      console.error('Metrics submission failed:', error)
      throw error
    }
  },

  // Multi-LLM Analysis
  async runMultiLLMAnalysis(prompt, models, targetDomain = null, options = {}) {
    try {
      // Step 1: Get responses from AI models
      const aiResponse = await api.post('/api/ai/query', {
        prompt,
        models
      })
      
      // Step 2: Analyze the responses for metrics
      const analysisResponse = await api.post('/api/analysis/metrics', {
        responses: aiResponse.data.responses
      })
      
      // Step 3: Get domain analysis if target domain provided
      let domainAnalysis = null
      if (targetDomain) {
        try {
          const geoResponse = await api.post('/api/geo/score', {
            global_counts: analysisResponse.data.global_domains,
            target_domain: targetDomain,
            total_models: models.length
          })
          domainAnalysis = geoResponse.data
        } catch (geoError) {
          console.warn('Domain analysis failed:', geoError)
        }
      }
      
      // Combine all results
      return {
        analysis_id: Date.now().toString(),
        responses: aiResponse.data.responses,
        domains: {
          global_domains: analysisResponse.data.global_domains,
          citations: analysisResponse.data.citations,
          geo_analysis: domainAnalysis
        },
        metrics: analysisResponse.data.metrics,
        model_comparison: {
          rankings: analysisResponse.data.rankings,
          summary: analysisResponse.data.summary,
          top_performer: analysisResponse.data.rankings[0]?.[0] || 'N/A',
          unique_domains: Object.keys(analysisResponse.data.global_domains).length,
          total_citations: Object.values(analysisResponse.data.citations).reduce((a, b) => a + b, 0),
          avg_response_time: Object.values(analysisResponse.data.metrics).reduce((acc, model) => acc + (model.response_length || 0), 0) / models.length
        }
      }
    } catch (error) {
      console.error('Multi-LLM analysis failed:', error)
      throw error
    }
  },

  // Get analysis progress
  async getAnalysisProgress(analysisId) {
    try {
      const response = await api.get(`/api/analysis-progress/${analysisId}`)
      return response.data
    } catch (error) {
      console.error('Failed to get analysis progress:', error)
      throw error
    }
  },

  // AI endpoints
  async getAIResponse(prompt, options = {}) {
    try {
      const response = await api.post('/api/ai', { prompt, ...options })
      return response.data
    } catch (error) {
      console.error('AI request failed:', error)
      throw error
    }
  },

  // Geo endpoints
  async getGeoData(query, options = {}) {
    try {
      const response = await api.post('/api/geo', { query, ...options })
      return response.data
    } catch (error) {
      console.error('Geo request failed:', error)
      throw error
    }
  },

  // Analysis endpoints
  async getAnalysis(data) {
    try {
      const response = await api.post('/api/analysis', data)
      return response.data
    } catch (error) {
      console.error('Analysis request failed:', error)
      throw error
    }
  },

  // Get API documentation
  async getAPIDocs() {
    try {
      const response = await api.get('/docs')
      return response.data
    } catch (error) {
      console.error('Failed to fetch API docs:', error)
      throw error
    }
  },

  // Get analytics data for charts
  async getAnalytics(domain, timeRange = '7d') {
    try {
      const response = await api.get(`/api/analytics/${domain}?range=${timeRange}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // Return mock data for demo
      return {
        trends: [
          { date: '2024-01-01', value: 100 },
          { date: '2024-01-02', value: 120 },
          { date: '2024-01-03', value: 90 },
          { date: '2024-01-04', value: 150 },
          { date: '2024-01-05', value: 180 },
          { date: '2024-01-06', value: 200 },
          { date: '2024-01-07', value: 220 }
        ],
        citations: [
          { source: 'Research Paper A', count: 45 },
          { source: 'Journal B', count: 32 },
          { source: 'Conference C', count: 28 },
          { source: 'Book D', count: 15 }
        ]
      }
    }
  }
}

export default api
