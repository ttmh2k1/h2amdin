import './deliveryStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaCheck, FaEye } from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { listDelivery, listDelivery1, updateOrder } from '../../apis/orderApi'
import { toast } from 'react-toastify'
import { formatMoney } from '../../utils/functionHelper'
import { Button } from '@mui/material'
import moment from 'moment'

const DeliveryComponent = () => {
  const [listOrder, setListOrder] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })
  const navigate = useNavigate()

  useEffect(() => {
    const handleListDelivery = async () => {
      const resp = await listDelivery({
        page: listOrder?.page,
        size: listOrder?.pageSize / 2,
        sortBy: 2,
        sortDescending: true,
        status: 'WAIT_FOR_SEND',
      })
      const resp1 = await listDelivery1({
        page: listOrder?.page,
        size: listOrder?.pageSize / 2,
        sortBy: 2,
        sortDescending: true,
        status: 'DELIVERING',
      })
      const list = resp?.data
      const list1 = resp1?.data
      setListOrder({
        ...listOrder,
        loading: false,
        rows: [...list?.data, ...list1?.data],
        totalRows: list?.totalElement + list1?.totalElement,
      })
    }
    handleListDelivery()
  }, [listOrder?.page, listOrder?.pageSize])

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

  const handleApprove = async (id) => {
    const status = 'DELIVERING'
    try {
      await updateOrder(id, status)
      toast.success('Approve order successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  const handleApprove1 = async (id) => {
    const status = 'DELIVERED'
    try {
      await updateOrder(id, status)
      toast.success('Approve order successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  const header = [
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
      field: 'customerName',
      headerName: 'Customer name',
      width: 150,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.buyer?.fullname || ''}`,
    },
    {
      field: 'customerGroup',
      headerName: 'Customer group',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.buyer?.rank?.name}`,
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
      field: 'createTime',
      headerName: 'Create time',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      sort: 'desc',
      renderCell: (params) => `${moment(params?.row?.createTime).format('YYYY-MM-DD hh:mm')}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const action = [
    {
      headerName: 'Action',
      width: 100,
      align: 'left',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/delivery/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            {props?.row?.status && props?.row?.status === 'WAIT_FOR_SEND' && (
              <div className="approveButton">
                <FaCheck onClick={() => handleApprove(props.id)} />
              </div>
            )}
            {props?.row?.status && props?.row?.status === 'DELIVERING' && (
              <div className="approveButton">
                <FaCheck onClick={() => handleApprove1(props.id)} />
              </div>
            )}
          </div>
        )
      },
    },
  ]

  const updateData = (k, v) => setListOrder((prev) => ({ ...prev, [k]: v }))

  return (
    <div className="delivery">
      <Sidebar />
      <div className="deliveryContainer">
        <Navbar />
        <div className="deliveryBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/delivery">Delivery</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={listOrder?.rows}
                columns={header?.concat(action)}
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
          <div className="deliveryFooter">
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

export default DeliveryComponent
