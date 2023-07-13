import { Button, Checkbox, Grid, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import './createRoleStyle.scss'
import { FaArrowCircleLeft, FaPlusSquare } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { createRole, getListPermission } from '../../../apis/roleApi'
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

export const CreateRole = () => {
  const [listPermission, setListPermission] = useState([])
  const [permission, setPermission] = useState([])
  const [roleName, setRoleName] = useState([])
  const [description, setDescription] = useState([])
  const navigate = useNavigate()

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
    setPermission(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSave = async () => {
    try {
      await createRole({ roleName: roleName, permissions: permission, description: description })
      toast.success('Create new role successful!', style)
      setTimeout(() => {
        navigate('/role')
      }, 2000)
    } catch (error) {
      toast.error('Create new role unsuccessful!', style)
    }
  }
  return (
    <div className="createRole">
      <Sidebar />
      <div className="createRoleContainer">
        <Navbar />
        <div className="createRoleBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/role">Role</a>/ <a href=" ">Create role</a>
          </div>
          <div className="createRoleForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="roleName">
                    Role name
                  </label>
                  <TextField
                    className="textField"
                    id="roleName"
                    value={listPermission?.roleName}
                    onChange={(e) => setRoleName(e?.target?.value)}
                  />
                </div>
                <div className="form">
                  <label className="title" for="description">
                    Description
                  </label>
                  <TextField
                    className="textField"
                    id="description"
                    value={listPermission?.description}
                    onChange={(e) => setDescription(e?.target?.value)}
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
                    if (selected.length === 0) {
                      return <em>Placeholder</em>
                    }
                    return selected.join(', ')
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
          <div className="createRoleFooter">
            <Button
              className="createButton"
              startIcon={<FaPlusSquare />}
              onClick={(e) => handleSave()}
            >
              Create
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
