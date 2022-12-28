import './userStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListUsers } from '../../apis/userApi'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { FaEye } from 'react-icons/fa'

const UserComponent = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const handleGetUser = async () => {
      const resp = await getListUsers()
      const list = resp?.data?.data
      setUsers(list)
    }
    handleGetUser()
  }, [])

  const actionColumn = [
    {
      headerName: 'Action',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/user/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
          </div>
        )
      },
    },
  ]

  const userHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
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
  const userContent = users.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      username: item?.username,
      fullname: item?.fullname,
      role: item?.role.name,
      email: item?.email,
      phone: item?.phone,
      status:
        item?.status === 'ACTIVE' ? 'Active' : item?.status === 'BANNED' ? 'Banned' : 'Wait banned',
    }
  })

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <Navbar />
        <div className="body">
          <div className="title">
            <a href="/">Home</a>/ <a href="/user">User</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={userContent}
                columns={userHeader.concat(actionColumn)}
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

export default UserComponent
