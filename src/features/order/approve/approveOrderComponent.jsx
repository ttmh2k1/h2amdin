import './approveOrderStyle.scss'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import ContentBox from '../../../components/ContentBox'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { styled } from '@material-ui/styles'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrder, updateOrder } from '../../../apis/orderApi'
import { DataGrid } from '@mui/x-data-grid'
import { FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Divider, Typography } from 'antd'
import { formatNumber } from '../../../utils/functionHelper'

const OrderComponent = () => {
  const [order, setOrder] = useState()
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
      headerName: 'Attribute ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'productName',
      headerName: 'Product name',
      width: 400,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'variationName',
      headerName: 'Attribute',
      width: 150,
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
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'unitPrice',
      headerName: 'Promotion price',
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
      id: item?.productVariation?.id,
      productName: item?.productVariation?.product?.name,
      variationName: item?.productVariation?.variationName,
      price: formatNumber(item?.productVariation?.price),
      discount: item?.productVariation?.discount + '%',
      unitPrice: formatNumber(item?.unitPrice),
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
    <div className="approve">
      <Sidebar />
      <div className="approveContainer">
        <Navbar />
        <div className="body">
          <ContentBox.Container className="approveForm">
            <ContentBox.Title title="Approve order" />
            <ContentBox.Body>
              <div style={{ width: '100%', padding: '0.4rem' }}>
                <label className="header">Customer information</label>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="orderCode">
                      Order ID
                    </label>
                    <Item disabled className="textField" id="orderCode" value={order?.id} />
                  </div>
                  <div className="form">
                    <label className="title" for="customerId">
                      Customer ID
                    </label>
                    <Item disabled className="textField" id="customerId" value={order?.buyer?.id} />
                  </div>
                  <div className="form">
                    <label className="title" for="customerName">
                      Customer name
                    </label>
                    <Item
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
                    <Item
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
                    <Item
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
                    <Item disabled className="textField" id="email" value={order?.buyer?.email} />
                  </div>
                  <div className="form">
                    <label className="title" for="receiverName">
                      Receiver name
                    </label>
                    <Item
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
                    <Item
                      disabled
                      className="textField"
                      id="receiverPhone"
                      value={order?.deliveryAddress?.receiverPhone}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="address">
                      Address
                    </label>
                    <Item
                      disabled
                      className="textField"
                      id="address"
                      value={order?.deliveryAddress?.addressDetail}
                    />
                  </div>
                  <div className="form">
                    <Item
                      disabled
                      className="address"
                      id="address"
                      value={order?.deliveryAddress?.addressWard?.name}
                    />
                  </div>
                  <div className="form">
                    <Item
                      disabled
                      className="address"
                      id="address"
                      value={order?.deliveryAddress?.addressWard?.district?.name}
                    />
                  </div>
                  <div className="form">
                    <Item
                      disabled
                      className="address"
                      id="address"
                      value={order?.deliveryAddress?.addressWard?.district?.provinceCity?.name}
                    />
                  </div>
                </Grid>
                <label className="header">Product information</label>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="paymentMethod">
                      Payment method
                    </label>
                    <Item
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
                    <ItemSelect
                      className="select"
                      id="status"
                      value={order?.status}
                      onChange={(e) => setOrder((state) => ({ ...state, status: e.target.value }))}
                    >
                      {arrayStatus?.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </ItemSelect>
                  </div>
                </Grid>
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
                          fontSize: '1rem',
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
                    {formatNumber(
                      order?.orderDetails
                        ?.map((item) => {
                          return item?.unitPrice * item?.quantity
                        })
                        .reduce((acc, item) => acc + item, 0),
                    )}
                  </Typography>
                  <Typography>
                    {'Customer discount: - '}
                    {formatNumber(
                      order?.buyer?.rank?.discountRate *
                        order?.orderDetails
                          ?.map((item) => {
                            return item?.unitPrice * item?.quantity
                          })
                          .reduce((acc, item) => acc + item, 0),
                    )}
                  </Typography>
                  <Typography>{'Ship: 30,000'}</Typography>
                  <Divider style={{ width: '100%' }} />
                  <div style={{ display: 'flex' }}>
                    <Typography
                      style={{
                        fontWeight: 'bolder',
                      }}
                    >
                      {'Total amount order: '}
                      {formatNumber(order?.payPrice)}
                    </Typography>
                  </div>
                </Grid>
              </div>
            </ContentBox.Body>
            <ContentBox.Footer isGoBack>
              <Button className="saveButton" startIcon={<FaSave />} onClick={(e) => handleSave()}>
                Save
              </Button>
              <Link to="/order" style={{ textDecoration: 'none' }} />
            </ContentBox.Footer>
          </ContentBox.Container>
        </div>
      </div>
    </div>
  )
}

const Item = styled(TextField)({
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
    height: '0.4rem',
    fontSize: '1rem',
    WebkitTextFillColor: '#717171',
    backgroundColor: '#f0f0f0',
  },
})

const ItemSelect = styled(Select)({
  '& .MuiSelect-outlined': {
    padding: '0.8rem',
    fontSize: '1rem',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

const Tab = styled(DataGrid)({
  '& .css-levciy-MuiTablePagination-displayedRows': {
    fontSize: '1rem',
  },
})

const arrayStatus = [
  { name: 'Wait for payment', value: 'WAIT_FOR_PAYMENT' },
  { name: 'Wait for confirm', value: 'WAIT_FOR_CONFIRM' },
  { name: 'Wait for send', value: 'WAIT_FOR_SEND' },
  { name: 'Delivering', value: 'DELIVERING' },
  { name: 'Delivered', value: 'DELIVERED' },
  { name: 'Completed', value: 'COMPLETED' },
  //   { name: 'Cancelled', value: 'CANCELLED' },
]

export default OrderComponent
