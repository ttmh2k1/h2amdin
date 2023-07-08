import './businessReportStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getStatistic } from '../../apis/statistic'
import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@mui/material'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SystemReportComponent = () => {
  const [income, setIncome] = useState()
  const [theme, setTheme] = useState()

  const [reportByQuarter, setReportByQuarter] = useState(false)
  const [typeValue, setTypeValue] = useState('')
  const [year, setYear] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setTheme(localStorage?.getItem('theme'))
  }, [localStorage])

  const handleGetStatisc = async () => {
    try {
      const resp = await getStatistic({
        reportByQuarter: reportByQuarter,
        typeValue: typeValue,
        year: year,
      })
      const data = resp?.data?.data
      setIncome(data)
    } catch (error) {
      return error
    }
  }

  return (
    <div className="businessReport">
      <Sidebar />
      <div className="businessReportContainer">
        <Navbar />
        <div className="businessReportBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/businessReport">Business report</a>
          </div>
          <div className="revenueStatistics">
            <div className="filter">
              <div className="form">
                <div className="title">Year</div>
                <select
                  className="select"
                  id="year"
                  onChange={(e) => {
                    setYear(e?.target?.value)
                  }}
                >
                  <option value="">All</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>

              <div className="form">
                <div className="title">Type</div>
                <select
                  className="select"
                  id="type"
                  onChange={(e) => {
                    setReportByQuarter(e?.target?.value)
                  }}
                >
                  <option value="false">Month</option>
                  <option value="true">Quarter</option>
                </select>
              </div>

              <>
                <div className="form">
                  {reportByQuarter === 'true' ? (
                    <>
                      <div className="title">Quarter</div>
                      <select
                        className="select"
                        id="typeValue"
                        onChange={(e) => {
                          setTypeValue(e?.target?.value)
                        }}
                      >
                        <option value="">All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <div className="title">Month</div>
                      <select
                        className="select"
                        id="typeValue"
                        onChange={(e) => {
                          setTypeValue(e?.target?.value)
                        }}
                      >
                        <option value="">All</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </>
                  )}
                </div>

                <div className="form">
                  <button className="filterButton" onClick={() => handleGetStatisc()}>
                    Filter
                  </button>
                </div>
              </>
            </div>
            <div className="chartSystem">
              {income?.map((item) => (
                <>
                  <ResponsiveContainer width="98%" aspect={3}>
                    <LineChart
                      label="Income"
                      data={item?.data}
                      width={500}
                      height={300}
                      tension="0.1"
                      margin={{ top: 20, right: 100, left: 70, bottom: 5 }}
                    >
                      <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
                      <XAxis
                        dataKey="typeValue"
                        interval={'preserveStartEnd'}
                        stroke={theme === 'false' ? '#000' : '#fff'}
                      />
                      <YAxis stroke={theme === 'false' ? '#000' : '#fff'} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ddd',
                          color: '#000',
                          borderRadius: '0.4rem',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="income"
                        name="Income"
                        stroke={theme === 'false' ? 'red' : 'orange'}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="title" style={{ marginLeft: '1.6rem' }}>
                    Year {item?.year}
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="businessReportFooter">
            <Button
              className="backButton"
              startIcon={<FaArrowCircleLeft color="#fff" size={'1rem'} />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemReportComponent
