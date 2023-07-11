import './customerStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListCustomer, updateCustomer } from '../../apis/customerApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaEye, FaLock, FaLockOpen, FaPen, FaUnlock } from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'

const CustomerComponent = () => {
  const navigate = useNavigate()
  const [listCustomer, setListCustomer] = useState({
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

  const handleDisable = async (id) => {
    try {
      await updateCustomer(id, 'BANNED')
      toast.success('Disable customer successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Disable customer failed!', style)
    }
  }

  const handleEnable = async (id) => {
    try {
      await updateCustomer(id, 'ACTIVE')
      toast.success('Enable customer successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Enable customer failed!', style)
    }
  }

  const action = [
    {
      headerName: 'Action',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/customer/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/customer/update/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="updateButton">
                <FaPen />
              </div>
            </Link>
            <div className="disableButton">
              {props?.row?.status === 'ACTIVE' ? (
                <FaLock onClick={() => handleDisable(props.id)} />
              ) : props?.row?.status === 'BANNED' ? (
                <FaLockOpen onClick={() => handleEnable(props.id)} />
              ) : (
                <FaUnlock onClick={() => handleDisable(props.id)} />
              )}
            </div>
          </div>
        )
      },
    },
  ]

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
      field: 'id',
      headerName: 'Customer ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 100,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'fullname',
      headerName: 'Full name',
      width: 200,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.gender === 'FEMALE' ? 'Female' : 'Male'}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 100,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) =>
        `${
          params?.row?.status === 'ACTIVE'
            ? 'Active'
            : params?.row?.status === 'BANNED'
            ? 'Banned'
            : 'Wait banned'
        }`,
    },
  ]

  const updateData = (k, v) => setListCustomer((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    getListCustomer({
      page: listCustomer.page,
      size: listCustomer.pageSize,
      sortBy: 1,
      sortDescending: true,
    }).then((resp) => {
      setListCustomer({
        ...listCustomer,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [])

  useEffect(() => {
    updateData('loading', true)
    getListCustomer({
      page: listCustomer.page,
      size: listCustomer.pageSize,
      sortBy: 1,
      sortDescending: true,
    }).then((resp) => {
      setListCustomer({
        ...listCustomer,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [listCustomer.page, listCustomer.pageSize])

  return (
    <div className="customer">
      <Sidebar />
      <div className="customerContainer">
        <Navbar />
        <div className="customerBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/customer">Customer</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={listCustomer.rows}
                columns={header.concat(action)}
                paginationMode="server"
                loading={listCustomer.loading}
                rowCount={listCustomer.totalRows}
                page={listCustomer.page - 1}
                pageSize={listCustomer.pageSize}
                rowsPerPageOptions={listCustomer.rowsPerPageOptions}
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
          <div className="customerFooter">
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

export default CustomerComponent
