import './userStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListUsers } from '../../apis/userApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import { FaArrowCircleLeft, FaEye } from 'react-icons/fa'
import { Button } from '@mui/material'

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
      renderCell: (params) => `${params?.row?.role?.name}`,
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
        <div className="body">
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
