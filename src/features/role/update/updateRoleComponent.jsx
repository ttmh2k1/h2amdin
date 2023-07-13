import { Button, Checkbox, Grid, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import './updateRoleStyle.scss'
import { FaArrowCircleLeft, FaSave } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { updateRole, getListPermission, getRoleInfo } from '../../../apis/roleApi'
import { toast } from 'react-toastify'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

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

const UpdateRole = () => {
  const [role, setRole] = useState()
  const { roleName } = useParams()
  const [listPermission, setListPermission] = useState([])
  const [permission, setPermission] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetRoleInfo = async () => {
      const resp = await getRoleInfo(roleName)
      const data = resp?.data?.data
      setRole(data)
      setPermission(data?.permissions)
    }
    handleGetRoleInfo()
  }, [roleName])

  useEffect(() => {
    const handleGetRolePermission = async () => {
      const resp = await getListPermission()
      const data = resp?.data?.data
      setListPermission(data)
    }
    handleGetRolePermission()
  }, [])

  const handleChange = (e) => {
    const {
      target: { value },
    } = e
    setPermission(typeof value === 'string' ? value?.split(',') : value)
    setRole((state) => ({
      ...state,
      permissions: e?.target?.value,
    }))
  }

  const handleSave = async () => {
    try {
      await updateRole(roleName, role)
      toast.success('Update role successful!', style)
      setTimeout(() => {
        navigate('/role')
      }, 2000)
    } catch (error) {
      toast.error('Update role unsuccessful!', style)
    }
  }

  return (
    <div className="updateRole">
      <Sidebar />
      <div className="updateRoleContainer">
        <Navbar />
        <div className="updateRoleBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/role">Role</a>/ <a href=" ">Update role</a>
          </div>
          <div className="updateRoleForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="roleName">
                    Role name
                  </label>
                  <TextField disabled className="textField" id="roleName" value={role?.roleName} />
                </div>
                <div className="form">
                  <label className="title" for="description">
                    Description
                  </label>
                  <TextField
                    className="textField"
                    id="description"
                    value={role?.description}
                    onChange={(e) =>
                      setRole((state) => ({
                        ...state,
                        description: e?.target?.value,
                      }))
                    }
                  />
                </div>
              </Grid>
              <div className="permissionForm">
                <label className="permissionTitle" for="listPermission">
                  Permission
                </label>
                <Select
                  className="select"
                  id="permission"
                  value={permission}
                  multiple
                  onChange={handleChange}
                  renderValue={(selected) => {
                    if (selected?.length === 0) {
                      return <em>Placeholder</em>
                    }
                    return selected?.join(', ')
                  }}
                  MenuProps={MenuProps}
                >
                  {listPermission?.map((item) => (
                    <MenuItem key={item?.permission} value={item?.permission}>
                      <Checkbox checked={permission?.indexOf(item?.permission) > -1} />
                      <ListItemText primary={item?.description} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="updateRoleFooter">
            <Button
              className="saveButton"
              startIcon={<FaSave color="#fff" size={'1rem'} />}
              onClick={() => handleSave()}
            >
              Save
            </Button>
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

export default UpdateRole
