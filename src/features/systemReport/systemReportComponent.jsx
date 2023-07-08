import './systemReportStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import {
  getStatisticMonth,
  getStatisticQuarter,
  getTopRating,
  getTopSale,
  getTopSold,
  getTopView,
} from '../../apis/statistic'
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
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const SystemReportComponent = () => {
  const [statistic, setStatistic] = useState()
  const [type, setType] = useState()
  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [quarter, setQuarter] = useState()

  const navigate = useNavigate()

  const handleFilterMonth = async () => {
    try {
      const resp = await getStatisticMonth(month, year, type)
      const data = resp?.data?.data
      setStatistic(data)
    } catch (error) {
      return error
    }
  }

  const handleFilterQuarter = async () => {
    try {
      const resp = await getStatisticQuarter(quarter, year, type)
      const data = resp?.data?.data
      setStatistic(data)
    } catch (error) {
      return error
    }
  }

  const [topView, setTopView] = useState([])
  useEffect(() => {
    const handleGetTopView = async () => {
      const resp = await getTopView()
      const data = resp?.data?.data
      setTopView(data)
    }
    handleGetTopView()
  }, [])

  const [topSale, setTopSale] = useState([])
  useEffect(() => {
    const handleGetTopSale = async () => {
      const resp = await getTopSale()
      const data = resp?.data?.data
      setTopSale(data)
    }
    handleGetTopSale()
  }, [])

  const [topSold, setTopSold] = useState([])
  useEffect(() => {
    const handleGetTopSold = async () => {
      const resp = await getTopSold()
      const data = resp?.data?.data
      setTopSold(data)
    }
    handleGetTopSold()
  }, [])

  const [topRating, setTopRating] = useState([])
  useEffect(() => {
    const handleGetTopRating = async () => {
      const resp = await getTopRating()
      const data = resp?.data?.data
      setTopRating(data)
    }
    handleGetTopRating()
  }, [])

  const viewHeader = [
    {
      field: 'id',
      headerName: 'ID product',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name product',
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nvisit',
      headerName: 'View',
      width: 40,
      align: 'center',
      headerAlign: 'center',
    },
  ]
  const view = topView.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      nvisit: item?.nvisit,
    }
  })

  const saleHeader = [
    {
      field: 'id',
      headerName: 'ID product',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name product',
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'maxDiscount',
      headerName: 'Discount',
      width: 40,
      align: 'center',
      headerAlign: 'center',
    },
  ]
  const sale = topSale.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      maxDiscount: item?.maxDiscount,
    }
  })

  const soldHeader = [
    {
      field: 'id',
      headerName: 'ID product',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name product',
      width: 160,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'nsold',
      headerName: 'Quantity',
      width: 40,
      align: 'center',
      headerAlign: 'center',
    },
  ]
  const sold = topSold.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      nsold: item?.nsold,
    }
  })

  const ratingHeader = [
    {
      field: 'id',
      headerName: 'ID product',
      width: 70,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Name product',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'averageRating',
      headerName: 'Rating',
      width: 30,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'totalRatingTimes',
      headerName: 'Number review',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
  ]
  const rating = topRating.map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      averageRating: item?.averageRating,
      totalRatingTimes: item?.totalRatingTimes,
    }
  })

  return (
    <div className="systemReport">
      <Sidebar />
      <div className="systemReportContainer">
        <Navbar />
        <div className="systemReportBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/systemReport">System report</a>
          </div>
          <div className="systemStatistic">
            <div className="filter">
              <div className="form">
                <div className="title">Type</div>
                <select
                  className="select"
                  id="type"
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                >
                  <option hidden value="default"></option>
                  <option value="MONTH">Month</option>
                  <option value="QUARTER">Quarter</option>
                </select>
              </div>

              <div className="form">
                <div className="title">Year</div>
                <select
                  className="select"
                  id="year"
                  onChange={(e) => {
                    setYear(e.target.value)
                  }}
                >
                  <option hidden value="default"></option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </select>
              </div>

              {type && type === 'MONTH' ? (
                <>
                  <div className="form">
                    <div className="title">Month</div>
                    <select
                      className="select"
                      id="month"
                      onChange={(e) => {
                        setMonth(e.target.value)
                      }}
                    >
                      <option hidden value="default"></option>
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
                  </div>

                  <div className="form">
                    <button
                      className="filterButton"
                      onClick={() => handleFilterMonth(month, year, type)}
                    >
                      Filter
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="form">
                    <div className="title">Quarter</div>
                    <select
                      className="select"
                      id="quarter"
                      onChange={(e) => {
                        setQuarter(e.target.value)
                      }}
                    >
                      <option hidden value="default"></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div className="form">
                    <button
                      className="filterButton"
                      onClick={() => handleFilterQuarter(quarter, year, type)}
                    >
                      Filter
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="chartSystem">
              <ResponsiveContainer width="100%" aspect={3}>
                <LineChart
                  data={statistic}
                  width={500}
                  height={300}
                  margin={{ top: 20, right: 100, left: 20, bottom: 5 }}
                >
                  <CartesianGrid
                    stroke={localStorage.getItem('theme') ? '#ddd' : '#fff'}
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="timeUnit"
                    interval={'preserveStartEnd'}
                    stroke={localStorage.getItem('theme') === 'false' ? '#000' : '#fff'}
                  />
                  <YAxis stroke={localStorage.getItem('theme') === 'false' ? '#000' : '#fff'} />
                  <Tooltip contentStyle={{ backgroundColor: '#bcccdc', borderRadius: '0.4rem' }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="nbuyer"
                    name="New customer"
                    stroke={localStorage.getItem('theme') === 'false' ? 'red' : '#bb2525'}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="nproduct"
                    name="New product"
                    stroke={localStorage.getItem('theme') === 'false' ? 'green' : '#25bb32'}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="norder"
                    name="New order"
                    stroke={localStorage.getItem('theme') === 'false' ? 'blue' : '#8bcbf9'}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="productReport">
            <div className="productBg">
              <div className="title">Top view products</div>
              <div className="list">
                {' '}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {viewHeader.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.width,
                                padding: '0.4rem',
                              }}
                            >
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {view.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.id}</Link>
                            </TableCell>
                            <TableCell
                              align="justify"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              {row.nvisit}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
            <div className="productBg">
              <div className="title">Top sale products</div>
              <div className="list">
                {' '}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {saleHeader.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.width,
                                padding: '0.4rem',
                              }}
                            >
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sale.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.id}</Link>
                            </TableCell>
                            <TableCell
                              align="justify"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              {row.maxDiscount}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
            <div className="productBg">
              <div className="title">Top sold products</div>
              <div className="list">
                {' '}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {soldHeader.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.width,
                                padding: '0.4rem',
                              }}
                            >
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sold.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.id}</Link>
                            </TableCell>
                            <TableCell
                              align="justify"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              {row.nsold}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
            <div className="productBg">
              <div className="title">Top rating products</div>
              <div className="list">
                {' '}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          {ratingHeader.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.width,
                                padding: '0.4rem',
                              }}
                            >
                              {column.headerName}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rating.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.id}</Link>
                            </TableCell>
                            <TableCell
                              align="justify"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              <Link to={`/product/view/${row.id}`}>{row.name}</Link>
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              {row.averageRating}
                            </TableCell>
                            <TableCell
                              align="right"
                              style={{ height: '2.4rem', padding: '0.4rem' }}
                            >
                              {row.totalRatingTimes}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div>
          </div>
          <div className="systemReportFooter">
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
