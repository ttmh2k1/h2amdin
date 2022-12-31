import './homeStyle.scss'
import React, { useEffect, useState } from 'react'
import { statisticToday } from '../../apis/home'
import Sidebar from '../../components/sidebar/Sidebar'
import { FaBox, FaChartPie, FaReceipt, FaUser } from 'react-icons/fa'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import Widget from '../../components/widget/Widget'

const HomeComponent = () => {
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
    <div className="homePage">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="homeBody">
          <div className="widgets">
            <Widget
              title={'REVENUE'}
              data={statistic?.income ? statistic?.income : 0}
              icon={
                <FaChartPie
                  className="icon"
                  style={{ backgroundColor: 'darkslateblue', color: 'white' }}
                />
              }
              isMoney={true}
              link={'/systemReport'}
            />
            <Widget
              title={'NEW CUSTOMERS'}
              data={statistic?.newBuyer ? statistic?.newBuyer : 0}
              icon={
                <FaUser className="icon" style={{ backgroundColor: 'darkred', color: 'white' }} />
              }
              isMoney={false}
              link={'/customer'}
            />
            <Widget
              title={'NEW PRODUCTS'}
              data={statistic?.newProduct ? statistic?.newProduct : 0}
              icon={
                <FaReceipt
                  className="icon"
                  style={{ backgroundColor: 'darksalmon', color: 'white' }}
                />
              }
              isMoney={false}
              link={'/product'}
            />
            <Widget
              title={'NEW ORDERS'}
              data={statistic?.newOrder ? statistic?.newOrder : 0}
              icon={
                <FaBox className="icon" style={{ backgroundColor: 'darkcyan', color: 'white' }} />
              }
              isMoney={false}
              link={'/order'}
            />
          </div>
          <div className="charts">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomeComponent
