import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { motion } from 'framer-motion'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const AnalyticsChart = ({ data, type = 'line', title }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e2e8f0',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 27, 75, 0.95)',
        titleColor: '#22d3ee',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        borderWidth: 1,
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(34, 211, 238, 0.1)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          color: 'rgba(34, 211, 238, 0.1)',
        },
      },
    } : {},
  }

  const renderChart = () => {
    switch (type) {
      case 'bar':
        return <Bar data={data} options={chartOptions} />
      case 'doughnut':
        return <Doughnut data={data} options={chartOptions} />
      default:
        return <Line data={data} options={chartOptions} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-navy-900/50 border border-cyan-500/20 rounded-xl p-6"
    >
      {title && (
        <h3 className="text-lg font-semibold text-cyan-400 mb-4">{title}</h3>
      )}
      <div className="h-64">
        {renderChart()}
      </div>
    </motion.div>
  )
}

export default AnalyticsChart
