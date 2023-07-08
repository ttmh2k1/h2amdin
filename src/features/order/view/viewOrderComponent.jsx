import './viewOrderStyle.scss'
import { Button, Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { styled } from '@material-ui/styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrder } from '../../../apis/orderApi'
import { DataGrid } from '@mui/x-data-grid'
import { Divider, Typography } from 'antd'
import { formatMoney } from '../../../utils/functionHelper'
import { FaArrowCircleLeft } from 'react-icons/fa'

const OrderComponent = () => {
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
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'productID',
      headerName: 'Product ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'id',
      headerName: 'Variation ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'productName',
      headerName: 'Product name',
      flex: 1,
      width: 250,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'variationName',
      headerName: 'Variation',
      flex: 1,
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
      stt: index,
      productID: item?.variation?.product?.id,
      id: item?.variation?.id,
      productName: item?.variation?.product?.name,
      variationName: item?.variation?.name,
      price: formatMoney(item?.variation?.price),
      discount: item?.variation?.discount + '%',
      priceAfterDiscount: formatMoney(item?.unitPrice),
      quantity: item?.quantity,
    }
  })

  return (
    <div className="viewOrder">
      <Sidebar />
      <div className="viewOrderContainer">
        <Navbar />
        <div className="viewOrderBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/order">Order</a>/ <a href=" ">Order detail</a>
          </div>
          <div className="viewOrderForm">
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
                  {/* <Typography>
                    {'Customer discount: - '}
                    {formatMoney(
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
          <div className="viewOrderFooter">
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

export default OrderComponent
