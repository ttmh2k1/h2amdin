import './userStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListUsers, updateUserStatus } from '../../apis/userApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import {
  FaArrowCircleLeft,
  FaEye,
  FaLock,
  FaLockOpen,
  FaPen,
  FaPlusCircle,
  FaUnlock,
} from 'react-icons/fa'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'

const UserComponent = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState({
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

  const actionColumn = [
    {
      headerName: 'Action',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/user/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/user/update/${props.id}`} style={{ textDecoration: 'none' }}>
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

  const userHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'User ID',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'username',
      headerName: 'User name',
      width: 150,
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
      field: 'role',
      headerName: 'User role',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.adminRole?.description}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 200,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'phone',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'status',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const updateData = (k, v) => setUsers((prev) => ({ ...prev, [k]: v }))

  const handleDisable = async (id) => {
    try {
      await updateUserStatus(id, {
        status: 'BANNED',
      })
      toast.success('Disable user successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Disable user failed!', style)
    }
  }

  const handleEnable = async (id) => {
    try {
      await updateUserStatus(id, {
        status: 'ACTIVE',
      })
      toast.success('Enable user successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Enable user failed!', style)
    }
  }

  useEffect(() => {
    getListUsers({
      page: users.page,
      size: users.pageSize,
      sortByDateDescending: true,
    }).then((resp) => {
      setUsers({
        ...users,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [])

  useEffect(() => {
    updateData('loading', true)
    getListUsers({
      page: users.page,
      size: users.pageSize,
      sortByDateDescending: true,
    }).then((resp) => {
      setUsers({
        ...users,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [users.page, users.pageSize])

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <Navbar />
        <div className="userBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/user">User</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={users.rows}
                columns={userHeader.concat(actionColumn)}
                paginationMode="server"
                loading={users.loading}
                rowCount={users.totalRows}
                page={users.page - 1}
                pageSize={users.pageSize}
                rowsPerPageOptions={users.rowsPerPageOptions}
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
          <div className="userFooter">
            <Button
              className="createButton"
              startIcon={<FaPlusCircle color="#fff" size={'1rem'} />}
              onClick={() => navigate('/user/create')}
            >
              New
            </Button>
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

export default UserComponent
