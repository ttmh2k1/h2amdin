import './orderStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaCheck, FaEye, FaRegTimesCircle } from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { getListOrder, updateOrder } from '../../apis/orderApi'
import { toast } from 'react-toastify'
import { formatNumber } from '../../utils/functionHelper'

const OrderComponent = () => {
  const [listOrder, setListOrder] = useState([])
  useEffect(() => {
    const handleListOrder = async () => {
      const resp = await getListOrder()
      const list = resp?.data?.data
      setListOrder(list)
    }
    handleListOrder()
  }, [])

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
      await updateOrder(id, 'CANCELLED')
      toast.success('Cancel successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Cancel failed!', style)
    }
  }

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
    },
    {
      field: 'customerName',
      headerName: 'Customer name',
      width: 150,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'customerGroup',
      headerName: 'Customer group',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'payPrice',
      headerName: 'Price',
      width: 100,
      align: 'right',
      headerAlign: 'center',
    },
    {
      field: 'createTime',
      headerName: 'Create time',
      width: 200,
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

  const content = listOrder.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      customerID: item?.buyer?.id,
      customerName: item?.buyer?.fullname,
      customerGroup: item?.buyer?.rank?.name,
      payPrice: formatNumber(item?.payPrice),
      createTime: item?.createTime,
      status: item?.status,
    }
  })

  const action = [
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

  return (
    <div className="order">
      <Sidebar />
      <div className="orderContainer">
        <Navbar />
        <div className="body">
          <div className="title">
            <a href="/">Home</a>/ <a href="/order">Order</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={content}
                columns={header.concat(action)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                style={{
                  backgroundColor: '#fff',
                  fontSize: '0.8rem',
                }}
              />
            </div>
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
