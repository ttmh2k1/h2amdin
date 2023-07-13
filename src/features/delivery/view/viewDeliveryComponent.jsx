import './viewDeliveryComponentStyle.scss'
import { Button, Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { styled } from '@material-ui/styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrder, updateOrder } from '../../../apis/orderApi'
import { DataGrid } from '@mui/x-data-grid'
import { Divider, Typography } from 'antd'
import { FaArrowCircleLeft, FaCheck } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { formatMoney } from '../../../utils/functionHelper'

const DeliveryComponent = () => {
  const [order, setOrder] = useState()
  const { orderId } = useParams()
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
      price: formatMoney(item?.variation?.price),
      discount: item?.variation?.discount + '%',
      priceAfterDiscount: formatMoney(item?.variation?.priceAfterDiscount),
      quantity: item?.quantity,
    }
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

  const handleApprove = async () => {
    try {
      await updateOrder(orderId, 'DELIVERING')
      toast.success('Approve successful!', style)
      setTimeout(() => {
        navigate('/delivery')
      }, 2000)
    } catch (error) {
      toast.error('Approve failed!', style)
    }
  }

  return (
    <div className="viewDelivery">
      <Sidebar />
      <div className="viewDeliveryContainer">
        <Navbar />
        <div className="viewDeliveryBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/delivery">Delivery</a>/ <a href=" ">Delivery detail</a>
          </div>
          <div className="viewDeliveryForm">
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
                    <TextField disabled className="textField" id="status" value={order?.status} />
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
                    {formatMoney(order?.price)}
                  </Typography>
                  <Typography>
                    {'Customer discount: - '}
                    {formatMoney(parseFloat((order?.price * order?.discount) / 100).toFixed(0))}
                  </Typography>
                  <Typography>
                    {'Discount discount: - '}
                    {formatMoney(order?.couponDiscount)}
                  </Typography>
                  <Typography>
                    {'Ship: '}
                    {formatMoney(order?.shipPrice)}
                  </Typography>
                  <Divider style={{ width: '100%' }} />
                  <div style={{ display: 'flex' }}>
                    <Typography
                      style={{
                        fontWeight: 'bolder',
                      }}
                    >
                      {'Total price: '}
                      {formatMoney(order?.totalPrice)}
                    </Typography>
                  </div>
                </Grid>
              </div>
            </div>
          </div>
          <div className="viewDeliveryFooter">
            {order?.status !== 'DELIVERING' && (
              <Button
                className="approveButton"
                startIcon={<FaCheck />}
                onClick={(e) => handleApprove()}
              >
                Approve
              </Button>
            )}
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
    fontSize: '0.8rem',
  },
})

export default DeliveryComponent
