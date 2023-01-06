import './approveOrderStyle.scss'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { styled } from '@material-ui/styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrder, updateOrder } from '../../../apis/orderApi'
import { DataGrid } from '@mui/x-data-grid'
import { FaArrowCircleLeft, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Divider, Typography } from 'antd'
import { formatNumber } from '../../../utils/functionHelper'

const OrderComponent = () => {
  const [order, setOrder] = useState({ status: '' })
  const params = useParams()
  const orderId = params.orderId
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetOrder = async () => {
      const resp = await getOrder(orderId)
      const data = resp?.data?.data
      setOrder(data)
    }
    handleGetOrder()
  }, [orderId])

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'Product ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'productName',
      headerName: 'Product name',
      width: 450,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'variationName',
      headerName: 'Variation',
      width: 100,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'discount',
      headerName: 'Discount',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'priceAfterDiscount',
      headerName: 'Price after discount',
      width: 130,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const content = order?.orderDetails?.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.variation?.product?.id,
      productName: item?.variation?.product?.name,
      variationName: item?.variation?.name,
      price: formatNumber(item?.variation?.price),
      discount: item?.variation?.discount + '%',
      priceAfterDiscount: formatNumber(item?.variation?.priceAfterDiscount),
      quantity: item?.quantity,
    }
  })

  const style = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  }

  const handleSave = async () => {
    const status = order?.status
    try {
      await updateOrder(orderId, status)
      toast.success('Update successful!', style)
      setTimeout(() => {
        navigate('/order')
      }, 2000)
    } catch (error) {
      toast.error('Update failed!', style)
    }
  }
  return (
    <div className="approveOrder">
      <Sidebar />
      <div className="approveOrderContainer">
        <Navbar />
        <div className="approveOrderBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/order">Order</a>/ <a href=" ">Order detail</a>
          </div>
          <div className="approveOrderForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <div className="customer">
                <label className="header">Customer information</label>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="orderCode">
                      Order ID
                    </label>
                    <TextField disabled className="textField" id="orderCode" value={order?.id} />
                  </div>
                  <div className="form">
                    <label className="title" for="customerId">
                      Customer ID
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="customerId"
                      value={order?.buyer?.id}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="customerName">
                      Customer name
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="customerName"
                      value={order?.buyer?.fullname}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="phone">
                      Customer phone
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="customerName"
                      value={order?.buyer?.phone}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="customerGroup">
                      Customer group
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="customerGroup"
                      value={order?.buyer?.rank?.name}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="email">
                      Email
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="email"
                      value={order?.buyer?.email}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="receiverName">
                      Receiver name
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="receiverName"
                      value={order?.deliveryAddress?.receiverName}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="receiverPhone">
                      Receiver phone
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="receiverPhone"
                      value={order?.deliveryAddress?.receiverPhone}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="address">
                      Address detail
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="address"
                      value={order?.deliveryAddress?.addressDetail}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="address">
                      Ward
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="address"
                      value={order?.deliveryAddress?.addressWard?.name}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="address">
                      District
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="address"
                      value={order?.deliveryAddress?.addressWard?.district?.name}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="address">
                      Province
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="address"
                      value={order?.deliveryAddress?.addressWard?.district?.provinceCity?.name}
                    />
                  </div>
                </Grid>
              </div>
              <div className="product">
                <label className="header">Product information</label>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="paymentMethod">
                      Payment method
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="paymentMethod"
                      value={order?.paymentMethod}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="status">
                      Status
                    </label>
                    <Select
                      className="select"
                      id="status"
                      defaultValue={order?.status}
                      value={order?.status}
                      onChange={(e) => setOrder((state) => ({ ...state, status: e.target.value }))}
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
              <div className="detail">
                <div className="template">
                  <div className="datatable">
                    {content && (
                      <Tab
                        rows={content}
                        columns={header}
                        pageSize={5}
                        rowsPerPageOptions={[10]}
                        style={{
                          backgroundColor: '#fff',
                          fontSize: '0.8rem',
                        }}
                      />
                    )}
                  </div>
                </div>
                <Grid
                  className="text"
                  alignItems="flex-end"
                  container
                  justifyContent="flex-end"
                  direction="column"
                >
                  <Typography>
                    {'Price: '}
                    {formatNumber(order?.price)}
                  </Typography>
                  {/* <Typography>
                    {'Customer discount: - '}
                    {formatNumber(
                      order?.buyer?.rank?.discountRate *
                        order?.orderDetails
                          ?.map((item) => {
                            return item?.unitPrice * item?.quantity
                          })
                          .reduce((acc, item) => acc + item, 0),
                    )}
                  </Typography> */}
                  <Typography>
                    {'Ship: '}
                    {formatNumber(order?.shipPrice)}
                  </Typography>
                  <Divider style={{ width: '100%' }} />
                  <div style={{ display: 'flex' }}>
                    <Typography
                      style={{
                        fontWeight: 'bolder',
                      }}
                    >
                      {'Total price: '}
                      {formatNumber(order?.totalPrice)}
                    </Typography>
                  </div>
                </Grid>
              </div>
            </div>
          </div>
          <div className="approveOrderFooter">
            <Button className="saveButton" startIcon={<FaSave />} onClick={(e) => handleSave()}>
              Save
            </Button>
            <Button
              startIcon={<FaArrowCircleLeft color="#fff" size={'1rem'} />}
              className="backButton"
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
    fontSize: '0.8rem',
  },
})

const arrayStatus = [
  { name: 'Wait for payment', value: 'WAIT_FOR_PAYMENT' },
  { name: 'Wait for confirm', value: 'WAIT_FOR_CONFIRM' },
  { name: 'Wait for send', value: 'WAIT_FOR_SEND' },
  { name: 'Delivering', value: 'DELIVERING' },
  { name: 'Delivered', value: 'DELIVERED' },
  { name: 'Completed', value: 'COMPLETED' },
  //   { name: 'Cancelled', value: 'CANCELED' },
]

export default OrderComponent
