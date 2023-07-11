import { Button, Grid, TextField, TextareaAutosize } from '@mui/material'
import './viewRoleStyle.scss'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { getRoleInfo } from '../../../apis/roleApi'

const RoleComponent = () => {
  const [role, setRole] = useState()
  const { roleName } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetRoleInfo = async () => {
      const resp = await getRoleInfo(roleName)
      const data = resp?.data?.data
      setRole(data)
    }
    handleGetRoleInfo()
  }, [roleName])

  return (
    <div className="viewRole">
      <Sidebar />
      <div className="viewRoleContainer">
        <Navbar />
        <div className="viewRoleBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/role">Role</a>/ <a href=" ">Role detail</a>
          </div>
          <div className="viewRoleForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <div className="detail">
                <label className="levelHeader">{role?.roleName}</label>
                <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                  <div className="form">
                    <label className="title" for="roleName">
                      Role name
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="roleName"
                      value={role?.roleName}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="description">
                      Description
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="description"
                      value={role?.description}
                    />
                  </div>
                </Grid>
              </div>
              <div className="permissionForm">
                <label className="permissionTitle" for="permissions">
                  Permission
                </label>
                <TextareaAutosize
                  disabled
                  className="permission"
                  id="permission"
                  value={role?.permissions}
                />
              </div>
            </div>
          </div>
          <div className="viewRoleFooter">
            <Button
              startIcon={<FaArrowCircleLeft color="#fff" size={'1rem'} />}
              className="backButton"
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
export default RoleComponent
