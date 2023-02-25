import './orderStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaCheck, FaEye, FaRegTimesCircle } from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { getListOrder, updateOrder } from '../../apis/orderApi'
import { toast } from 'react-toastify'
import { formatNumber } from '../../utils/functionHelper'
import { Button } from '@mui/material'

const OrderComponent = () => {
  const navigate = useNavigate()
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
    autoClose: 1000,
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
      toast.success('Cancel successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error(error, style)
    }
  }

  const actionColumn = [
    {
      headerName: 'Action',
      width: 150,
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
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'Order ID',
      width: 80,
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
      field: 'customerName',
      headerName: 'Customer name',
      width: 200,
      align: 'left',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.buyer?.fullname}`,
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
      renderCell: (params) => `${formatNumber(params?.row?.totalPrice)}`,
    },
    {
      field: 'createTime',
      headerName: 'Create time',
      width: 180,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const updateData = (k, v) => setListOrder((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    getListOrder({
      page: listOrder.page,
      size: listOrder.pageSize,
      sortBy: 1,
      sortDescending: true,
    }).then((resp) => {
      setListOrder({
        ...listOrder,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [])

  useEffect(() => {
    updateData('loading', true)
    getListOrder({
      page: listOrder.page,
      size: listOrder.pageSize,
      sortBy: 1,
      sortDescending: true,
    }).then((resp) => {
      setListOrder({
        ...listOrder,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [listOrder.page, listOrder.pageSize])

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="orderBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/order">Order</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={listOrder.rows}
                columns={orderHeader.concat(actionColumn)}
                paginationMode="server"
                loading={listOrder.loading}
                rowCount={listOrder.totalRows}
                page={listOrder.page - 1}
                pageSize={listOrder.pageSize}
                rowsPerPageOptions={listOrder.rowsPerPageOptions}
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

export default OrderComponent
