import './updateUserStyle.scss'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getListRole } from '../../../apis/roleApi'
import { getUser, updateUser } from '../../../apis/userApi'
import { FaArrowCircleLeft, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'

const UserComponent = () => {
  const [user, setUser] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [role, setRole] = useState([])
  const { userId } = useParams()
  const navigate = useNavigate()

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

  useEffect(() => {
    const handleGetUser = async () => {
      const resp = await getUser(userId)
      const data = resp?.data?.data
      setUser({
        fullname: data?.fullname,
        email: data?.email,
        phone: data?.phone,
        adminRoleName: data?.adminRole?.roleName,
        status: data?.status,
      })
      setUserInfo(data)
    }
    handleGetUser()
  }, [userId])

  useEffect(() => {
    const handleGetRole = async () => {
      const resp = await getListRole()
      const data = resp?.data?.data
      setRole(data)
    }
    handleGetRole()
  }, [])

  const handleSave = async () => {
    try {
      await updateUser(userId, user)
      toast.success('Update user information successful!', style)
      setTimeout(() => {
        navigate('/user')
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  return (
    <div className="updateUser">
      <Sidebar />
      <div className="updateUserContainer">
        <Navbar />
        <div className="updateUserBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/user">User</a>/ <a href=" ">Update user</a>
          </div>
          <title title="Update user information" />
          <div className="updateUserForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="usercode">
                    User code
                  </label>
                  <TextField disabled className="textField" id="usercode" value={userInfo?.id} />
                </div>
                <div className="form">
                  <label className="title" for="username">
                    Username
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="username"
                    value={userInfo?.username}
                  />
                </div>
                <div className="form">
                  <label className="title" for="name">
                    Full name
                  </label>
                  <TextField
                    className="textField"
                    id="name"
                    value={user?.fullname}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        fullname: e?.target?.value,
                      }))
                    }
                  />
                </div>
                <div className="form">
                  <label className="title" for="roleName">
                    Role name
                  </label>
                  <Select
                    className="select"
                    name="roleName"
                    id="roleName"
                    value={user?.adminRoleName || null}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        adminRoleName: e?.target?.value,
                      }))
                    }
                  >
                    {role?.map((item, index) => (
                      <MenuItem key={index} value={item?.roleName}>
                        {item?.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="form">
                  <label className="title" for="email">
                    Email
                  </label>
                  <TextField
                    className="textField"
                    id="email"
                    type="email"
                    value={user?.email}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        email: e?.target?.value,
                      }))
                    }
                  />
                </div>
                <div className="form">
                  <label className="title" for="phone">
                    Phone
                  </label>
                  <TextField
                    className="textField"
                    id="phone"
                    value={user?.phone}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        phone: e?.target?.value,
                      }))
                    }
                  />
                </div>
                <div className="form">
                  <label className="title" for="status">
                    Status
                  </label>
                  <Select
                    className="select"
                    name="status"
                    id="status"
                    value={user?.status || null}
                    onChange={(e) =>
                      setUser((state) => ({
                        ...state,
                        status: e?.target?.value,
                      }))
                    }
                  >
                    {arrayStatus?.map((item, index) => (
                      <MenuItem key={index} value={item?.value}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
            </div>
          </div>
          <div className="updateUserFooter">
            <Button
              className="saveButton"
              startIcon={<FaSave color="#fff" size={'1rem'} />}
              onClick={(e) => handleSave()}
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

const arrayStatus = [
  { name: 'Active', value: 'ACTIVE' },
  { name: 'Banned', value: 'BANNED' },
]

export default UserComponent
