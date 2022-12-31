import './chart.scss'
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, BarChart, Bar } from 'recharts'
import { getStatistic } from '../../apis/statistic'
import { useEffect, useState } from 'react'

const Chart = () => {
  const [statistic, setStatistic] = useState()
  useEffect(() => {
    const handleGetStatisticByDate = async () => {
      const resp = await getStatistic()
      const data = resp?.data?.data
      setStatistic(data)
    }
    handleGetStatisticByDate()
  }, [])

  return (
    <div className="chart">
      <div className="title">Revenue in month</div>
      <ResponsiveContainer width="100%" aspect={3 / 1}>
        <BarChart
          width={600}
          height={100}
          data={statistic}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="100%" stopColor="#829ab0" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#829ab0" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="timeUnit" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Bar
            type="monotone"
            dataKey="income"
            stroke="#829ab0"
            fillOpacity={1}
            fill="url(#total)"
          />
          <Area type="monotone" dataKey="pv" fillOpacity={1} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
