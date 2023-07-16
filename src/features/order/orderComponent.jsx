import './orderStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleDown, FaArrowCircleLeft, FaCheck, FaEye, FaRegTimesCircle } from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import {
  getListOrder,
  getListOrderDelivering,
  getListOrderWaitForSend,
  updateOrder,
} from '../../apis/orderApi'
import { toast } from 'react-toastify'
import { formatMoney } from '../../utils/functionHelper'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  TextField,
  Grid,
  Select,
  Typography,
} from '@mui/material'
import moment from 'moment'

const OrderComponent = () => {
  const navigate = useNavigate()
  const [idBuyer, setIdBuyer] = useState('')
  const [status, setStatus] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const [listOrder, setListOrder] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

  const style = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  }

  const handleCancel = async (id) => {
    try {
      await updateOrder(id, 'CANCELED')
      toast.success('Cancel order successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  const actionColumn = [
    {
      headerName: 'Action',
      width: 120,
      align: 'left',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/order/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            {localStorage.getItem('role') !== 'SHIPPER' && (
              <>
                {props?.row?.status &&
                (props?.row?.status === 'COMPLETED' || props?.row?.status === 'CANCELLED') ? (
                  <></>
                ) : (
                  <Link to={`/order/approve/${props.id}`} style={{ textDecoration: 'none' }}>
                    <div className="approveButton">
                      <FaCheck />
                    </div>
                  </Link>
                )}

                {props?.row?.status &&
                  (props?.row?.status === 'WAIT_FOR_PAYMENT' ||
                    props?.row?.status === 'WAIT_FOR_CONFIRM' ||
                    props?.row?.status === 'WAIT_FOR_SEND') && (
                    <div className="denyButton">
                      <FaRegTimesCircle onClick={() => handleCancel(props.id)} />
                    </div>
                  )}
              </>
            )}
          </div>
        )
      },
    },
  ]

  const orderHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index?.row?.id) + 1,
    },
    {
      field: 'id',
      headerName: 'Order ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'customerID',
      headerName: 'Customer ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.buyer?.id}`,
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 100,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.buyer?.username}`,
    },
    {
      field: 'totalPrice',
      headerName: 'Price',
      width: 100,
      align: 'right',
      headerAlign: 'center',
      renderCell: (params) => `${formatMoney(params?.row?.totalPrice)}`,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment method',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) =>
        `${params?.row?.paymentMethod}` === 'OFFLINE_CASH_ON_DELIVERY'
          ? 'COD'
          : `${params?.row?.paymentMethod}` === 'ONLINE_PAYMENT_PAYPAL'
          ? 'PAYPAL'
          : 'MOMO',
    },
    {
      field: 'createTime',
      headerName: 'Create time',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${moment(params?.row?.createTime).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'note',
      headerName: 'Note',
      width: 120,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.note}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const updateData = (k, v) => setListOrder((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    if (
      localStorage.getItem('permission').split(',').includes('R_ORDER_SHIPPER') ||
      localStorage.getItem('permission').split(',').includes('U_ORDER_SHIPPER')
    ) {
      const handleListOrder = async () => {
        const resp = await getListOrderWaitForSend({ status: 'WAIT_FOR_SEND' })
        const resp1 = await getListOrderDelivering({ status: 'DELIVERING' })
        const list = resp?.data
        const list1 = resp1?.data
        setListOrder({
          ...listOrder,
          loading: false,
          rows: [...list?.data, ...list1?.data],
          totalRows: list?.totalElement + list1?.totalElement,
          pageSize: list?.pageSize / 2 + list1?.pageSize / 2,
        })
      }
      handleListOrder()
    } else {
      getListOrder({
        page: listOrder?.page,
        size: listOrder?.pageSize,
        sortBy: 1,
        sortDescending: true,
        idBuyer: idBuyer,
        status: status,
        paymentMethod: paymentMethod,
      }).then((resp) => {
        setListOrder({
          ...listOrder,
          loading: false,
          rows: resp?.data?.data,
          totalRows: resp?.data?.totalElement,
        })
      })
    }
  }, [idBuyer, status, paymentMethod])

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="orderBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/order">Order</a>
          </div>

          <div className="search">
            <Accordion style={{ borderRadius: '0.4vw' }}>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                style={{ margin: '0' }}
                id="panel1a-header"
              >
                <Typography style={{ padding: '0' }}>Search</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <Typography>
                  <div style={{ width: '100%' }}>
                    <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                      <div className="form">
                        <label className="title" for="idBuyer">
                          Customer ID
                        </label>
                        <TextField
                          className="textField"
                          id="idBuyer"
                          onChange={(e) => {
                            setIdBuyer(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="paymentMethod">
                          Payment method
                        </label>
                        <Select
                          className="select"
                          id="paymentMethod"
                          onChange={(e) => {
                            setPaymentMethod(e?.target?.value)
                          }}
                        >
                          {arrayPaymentMethod?.map((item, index) => (
                            <MenuItem key={index} value={item?.value}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="form">
                        <label className="title" for="status">
                          Status
                        </label>
                        <Select
                          className="select"
                          id="status"
                          onChange={(e) => {
                            setStatus(e?.target?.value)
                          }}
                        >
                          {arrayStatus?.map((item, index) => (
                            <MenuItem key={index} value={item?.value}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                    </Grid>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="template">
            <div className="datatable">
              <Tab
                rows={listOrder?.rows}
                columns={orderHeader?.concat(actionColumn)}
                paginationMode="server"
                loading={listOrder?.loading}
                rowCount={listOrder?.totalRows}
                page={listOrder?.page - 1}
                pageSize={listOrder?.pageSize}
                rowsPerPageOptions={listOrder?.rowsPerPageOptions}
                onPageChange={(page) => {
                  updateData('page', page + 1)
                }}
                onPageSizeChange={(pageSize) => {
                  updateData('page', 1)
                  updateData('pageSize', pageSize)
                }}
                getRowId={(row) => row.id}
                style={{
                  backgroundColor: '#fff',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div className="orderFooter">
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

const Tab = styled(DataGrid)({
  '& .css-levciy-MuiTablePagination-displayedRows': {
    fontSize: '1rem',
  },
})

const arrayStatus = [
  { name: 'Wait for payment', value: 'WAIT_FOR_PAYMENT' },
  { name: 'Wait for  confirm', value: 'WAIT_FOR_CONFIRM' },
  { name: 'Wait for send', value: 'WAIT_FOR_SEND' },
  { name: 'Delivering', value: 'DELIVERING' },
  { name: 'Delivered', value: 'DELIVERED' },
  { name: 'Completed', value: 'COMPLETED' },
  { name: 'Canceled', value: 'CANCELED' },
]

const arrayPaymentMethod = [
  { name: 'COD', value: 'OFFLINE_CASH_ON_DELIVERY' },
  { name: 'MOMO', value: 'ONLINE_PAYMENT_MOMO' },
  { name: 'PAYPAL', value: 'ONLINE_PAYMENT_PAYPAL' },
]

export default OrderComponent
