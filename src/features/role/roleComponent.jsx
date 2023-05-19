import './roleStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useEffect, useState } from 'react'
import { getRoles } from '../../apis/roleApi'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { FaArrowCircleLeft } from 'react-icons/fa'

const RoleComponent = () => {
  const [roles, setRoles] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetRole = async () => {
      const resp = await getRoles()
      const data = resp?.data?.data
      setRoles(data)
    }
    handleGetRole()
  }, [])

  const roleHeader = [
    {
      field: 'id',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'name',
      headerName: 'Role name',
      width: 400,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'permissions',
      headerName: 'Permissions',
      width: 650,
      align: 'center',
      headerAlign: 'center',
    },
  ]

  const roleContent = [
    {
      id: 1,
      name: roles?.name,
      permissions: roles?.permissions,
    },
  ]

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
                rows={roleContent}
                columns={roleHeader}
                pageSize={5}
                rowsPerPageOptions={[5]}
                style={{
                  backgroundColor: '#fff',
                  fontSize: '0.8rem',
                }}
              />
            </div>
          </div>
          <div className="roleFooter">
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
