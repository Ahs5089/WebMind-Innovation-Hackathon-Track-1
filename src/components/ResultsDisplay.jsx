import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Globe, 
  TrendingUp, 
  Table, 
  Download,
  Award,
  Target,
  FileText,
  Clock
} from 'lucide-react'
import AnalyticsChart from './AnalyticsChart'

const ResultsDisplay = ({ results, onExport }) => {
  const [activeTab, setActiveTab] = useState('responses')

  const tabs = [
    { id: 'responses', label: 'Responses', icon: FileText },
    { id: 'domains', label: 'Domains', icon: Globe },
    { id: 'comparison', label: 'Model Comparison', icon: TrendingUp },
    { id: 'metrics', label: 'Metrics', icon: Table }
  ]

  const prepareDomainChartData = (results) => {
    if (!results?.domains?.global_domains) return null

    const domainData = Object.entries(results.domains.global_domains).map(([domain, count]) => ({
      domain,
      count
    }))

    return {
      labels: domainData.map(item => item.domain),
      datasets: [{
        data: domainData.map(item => item.count),
        backgroundColor: [
          '#22d3ee',
          '#06b6d4',
          '#0891b2',
          '#0e7490',
          '#155e75'
        ],
        borderWidth: 0
      }]
    }
  }

  const prepareModelComparisonData = (results) => {
    if (!results?.metrics) return null

    const models = Object.keys(results.metrics)
    const metrics = ['response_length', 'domain_count', 'unique_domains', 'visibility_score']

    return {
      labels: models,
      datasets: metrics.map((metric, index) => ({
        label: metric.replace('_', ' ').toUpperCase(),
        data: models.map(model => results.metrics[model][metric] || 0),
        backgroundColor: [
          'rgba(34, 211, 238, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(8, 145, 178, 0.8)',
          'rgba(14, 116, 144, 0.8)'
        ][index],
        borderColor: [
          '#22d3ee',
          '#06b6d4',
          '#0891b2',
          '#0e7490'
        ][index],
        borderWidth: 1
      }))
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'responses':
        return (
          <div className="space-y-4">
            {results?.responses ? Object.entries(results.responses).map(([model, response]) => (
              <div key={model} className="bg-navy-800/50 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-cyan-400 capitalize">{model}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{results.metrics?.[model]?.response_length || 0} chars</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{response}</p>
                {results.metrics?.[model]?.visibility_score && (
                  <div className="mt-3 flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Visibility Score:</span>
                    <div className="flex-1 bg-navy-700 rounded-full h-2">
                      <div 
                        className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${results.metrics[model].visibility_score}%` }}
                      />
                    </div>
                    <span className="text-sm text-cyan-400">{results.metrics[model].visibility_score}%</span>
                  </div>
                )}
              </div>
            )) : (
              <div className="text-center py-8 text-gray-400">
                No responses available
              </div>
            )}
          </div>
        )

      case 'domains':
        return (
          <div className="space-y-4">
            {results?.domains ? (
              <>
                <AnalyticsChart
                  data={prepareDomainChartData(results)}
                  type="bar"
                  title="Domain Distribution"
                />
                {results.domains.citations && (
                  <div className="bg-navy-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="font-semibold text-cyan-400 mb-3">Citation Sources</h4>
                    <div className="space-y-2">
                      {Object.entries(results.domains.citations).map(([source, count]) => (
                        <div key={source} className="flex justify-between items-center">
                          <span className="text-gray-300">{source}</span>
                          <span className="text-cyan-400 font-semibold">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {results.domains.geo_analysis && (
                  <div className="bg-navy-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="font-semibold text-cyan-400 mb-3">Geographic Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Target Domain:</span>
                        <span className="text-cyan-400">{results.domains.geo_analysis.target_domain}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Geo Score:</span>
                        <span className="text-cyan-400">{results.domains.geo_analysis.geo_score}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No domain data available
              </div>
            )}
          </div>
        )

      case 'comparison':
        return (
          <div className="space-y-4">
            {results?.model_comparison ? (
              <>
                <AnalyticsChart
                  data={prepareModelComparisonData(results)}
                  type="bar"
                  title="Model Performance Comparison"
                />
                <div className="bg-navy-800/50 rounded-lg p-4 border border-cyan-500/20">
                  <h4 className="font-semibold text-cyan-400 mb-3">Model Rankings</h4>
                  <div className="space-y-2">
                    {results.model_comparison.rankings?.map(([model, score], index) => (
                      <div key={model} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-bold">#{index + 1}</span>
                          <span className="text-gray-300 capitalize">{model}</span>
                        </div>
                        <span className="text-cyan-400 font-semibold">{score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No comparison data available
              </div>
            )}
          </div>
        )

      case 'metrics':
        return (
          <div className="space-y-4">
            {results?.metrics ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cyan-500/20">
                      <th className="text-left py-2 text-cyan-400">Model</th>
                      <th className="text-left py-2 text-cyan-400">Response Length</th>
                      <th className="text-left py-2 text-cyan-400">Domain Count</th>
                      <th className="text-left py-2 text-cyan-400">Unique Domains</th>
                      <th className="text-left py-2 text-cyan-400">Visibility Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(results.metrics).map(([model, metrics]) => (
                      <tr key={model} className="border-b border-cyan-500/10">
                        <td className="py-2 text-cyan-400 capitalize font-semibold">{model}</td>
                        <td className="py-2 text-gray-300">{metrics.response_length}</td>
                        <td className="py-2 text-gray-300">{metrics.domain_count}</td>
                        <td className="py-2 text-gray-300">{metrics.unique_domains}</td>
                        <td className="py-2 text-cyan-400 font-semibold">{metrics.visibility_score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No metrics available
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  if (!results) {
    return (
      <div className="bg-navy-900/50 border border-cyan-500/20 rounded-xl p-8 text-center">
        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-400 mb-2">No Results Yet</h3>
        <p className="text-gray-500">Run an analysis to see results here</p>
      </div>
    )
  }

  return (
    <div className="bg-navy-900/50 border border-cyan-500/20 rounded-xl">
      {/* Summary Card */}
      <div className="p-6 border-b border-cyan-500/20">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Analysis Summary</h3>
        <p className="text-gray-300 leading-relaxed">
          {results.model_comparison?.summary || 'Analysis completed successfully. Review the detailed results below.'}
        </p>
      </div>

      {/* Top Metrics Cards */}
      <div className="p-6 border-b border-cyan-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-navy-800/50 rounded-lg p-4 text-center">
            <Award className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{results.model_comparison?.top_performer || 'N/A'}</div>
            <div className="text-sm text-gray-400">Top Performer</div>
          </div>
          <div className="bg-navy-800/50 rounded-lg p-4 text-center">
            <Target className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{results.model_comparison?.unique_domains || 0}</div>
            <div className="text-sm text-gray-400">Unique Domains</div>
          </div>
          <div className="bg-navy-800/50 rounded-lg p-4 text-center">
            <FileText className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{results.model_comparison?.total_citations || 0}</div>
            <div className="text-sm text-gray-400">Total Citations</div>
          </div>
          <div className="bg-navy-800/50 rounded-lg p-4 text-center">
            <Clock className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{Math.round(results.model_comparison?.avg_response_time || 0)}</div>
            <div className="text-sm text-gray-400">Avg Response</div>
          </div>
        </div>
      </div>

      {/* Tabbed Panel */}
      <div className="p-6">
        <div className="flex space-x-1 mb-6 bg-navy-800/50 rounded-lg p-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-white'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-navy-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>

        {/* Export Button */}
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExport}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default ResultsDisplay
