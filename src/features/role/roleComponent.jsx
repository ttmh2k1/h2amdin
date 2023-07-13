import './roleStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { getListRole } from '../../apis/roleApi'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { FaArrowCircleLeft, FaEye, FaPen, FaPlusCircle } from 'react-icons/fa'

const RoleComponent = () => {
  const navigate = useNavigate()
  const [roles, setRoles] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

  useEffect(() => {
    updateData('loading', true)
    getListRole({
      page: roles.page,
      size: roles.pageSize,
      sortBy: 1,
      sortDescending: true,
    }).then((resp) => {
      setRoles({
        ...roles,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [roles?.page, roles?.pageSize])

  const actionColumn = [
    {
      headerName: 'Action',
      width: 120,
      align: 'left',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/role/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            {props.id !== 'ADMIN' && (
              <Link to={`/role/update/${props.id}`} style={{ textDecoration: 'none' }}>
                <div className="updateButton">
                  <FaPen />
                </div>
              </Link>
            )}
          </div>
        )
      },
    },
  ]

  const roleHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index?.row?.roleName) + 1,
    },
    {
      field: 'roleName',
      headerName: 'Role name',
      width: 400,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 550,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const updateData = (k, v) => setRoles((prev) => ({ ...prev, [k]: v }))

  return (
    <div className="role">
      <Sidebar />
      <div className="roleContainer">
        <Navbar />
        <div className="roleBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/role">Role</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={roles.rows}
                columns={roleHeader.concat(actionColumn)}
                paginationMode="server"
                rowCount={roles.totalRows}
                page={roles.page - 1}
                pageSize={roles.pageSize}
                rowsPerPageOptions={roles.rowsPerPageOptions}
                onPageChange={(page) => {
                  updateData('page', page + 1)
                }}
                onPageSizeChange={(pageSize) => {
                  updateData('page', 1)
                  updateData('pageSize', pageSize)
                }}
                getRowId={(row) => row?.roleName}
                style={{
                  backgroundColor: '#fff',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div className="roleFooter">
            <Button
              className="createButton"
              startIcon={<FaPlusCircle color="#fff" size={'1rem'} />}
              onClick={() => navigate('/role/create')}
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

export default RoleComponent
