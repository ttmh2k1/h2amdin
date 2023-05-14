import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { statisticToday } from '../../apis/home'
import './widget.scss'

const Widget = ({ type, data, title, icon, isMoney, link }) => {
  const [statistic, setStatistic] = useState()
  useEffect(() => {
    const handleGetStatisticToday = async () => {
      const resp = await statisticToday()
      const data = resp?.data?.data
      setStatistic(data)
    }
    handleGetStatisticToday()
  }, [])

  return (
    <div className="widget">
      <div className="model">
        <span className="title">
          {icon}
          {title}
        </span>
        <span className="counter">
          {data}
          {isMoney && 'VND'}
        </span>
        <span className="link">
          <Link to={link} style={{ textDecoration: 'none' }}>
            View detail
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Widget
