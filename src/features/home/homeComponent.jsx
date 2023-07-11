import './homeStyle.scss'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import Widget from '../../components/widget/Widget'
import { formatMoney } from '../../utils/functionHelper'
import { statisticToday } from '../../apis/home'
import { FaBox, FaChartPie, FaReceipt, FaUser } from 'react-icons/fa'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { getTopRating, getTopSale, getTopSold, getTopView } from '../../apis/statisticApi'

const HomeComponent = () => {
  const [statistic, setStatistic] = useState()
  const [topView, setTopView] = useState([])
  const [topSale, setTopSale] = useState([])
  const [topSold, setTopSold] = useState([])
  const [topRating, setTopRating] = useState([])

  useEffect(() => {
    if (
      localStorage
        .getItem('permission')
        .split(',')
        .includes('R_STATISTIC' || 'ALL_ADMIN_PERMISSIONS')
    ) {
      const handleGetStatisticToday = async () => {
        const resp = await statisticToday()
        const data = resp?.data?.data
        setStatistic(data)
      }
      handleGetStatisticToday()
    }
  }, [])

  useEffect(() => {
    const handleGetTopView = async () => {
      const resp = await getTopView()
      const data = resp?.data?.data
      setTopView(data)
    }
    handleGetTopView()
  }, [])

  useEffect(() => {
    const handleGetTopSale = async () => {
      const resp = await getTopSale()
      const data = resp?.data?.data
      setTopSale(data)
    }
    handleGetTopSale()
  }, [])

  useEffect(() => {
    const handleGetTopSold = async () => {
      const resp = await getTopSold()
      const data = resp?.data?.data
      setTopSold(data)
    }
    handleGetTopSold()
  }, [])

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
      averageRating: item?.averageRating.toFixed(2),
      totalRatingTimes: item?.totalRatingTimes,
    }
  })

  return (
    <div className="homePage">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {localStorage.getItem('permission').includes('ALL_ADMIN_PERMISSIONS') ||
        localStorage?.getItem('permission').split(',').includes('R_STATISTIC') ? (
          <div className="homeBody">
            <div className="widgets">
              <Widget
                title={'REVENUE'}
                data={statistic?.income ? formatMoney(statistic?.income) : 0}
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
        ) : (
          <div className="homeBody">
            <div className="productReport">
              <div className="productBg">
                <div className="title">Top view products</div>
                <div className="list">
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
                                {row.id}
                              </TableCell>
                              <TableCell
                                align="justify"
                                style={{ height: '2.4rem', padding: '0.4rem' }}
                              >
                                {row.name}
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
                                {row.id}
                              </TableCell>
                              <TableCell
                                align="justify"
                                style={{ height: '2.4rem', padding: '0.4rem' }}
                              >
                                {row.name}
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
                                {row.id}
                              </TableCell>
                              <TableCell
                                align="justify"
                                style={{ height: '2.4rem', padding: '0.4rem' }}
                              >
                                {row.name}
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
                                {row.id}
                              </TableCell>
                              <TableCell
                                align="justify"
                                style={{ height: '2.4rem', padding: '0.4rem' }}
                              >
                                {row.name}
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
          </div>
        )}
      </div>
    </div>
  )
}
export default HomeComponent
