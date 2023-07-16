import './viewUserStyle.scss'
import { Button, Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser } from '../../../apis/userApi'
import { FaArrowCircleLeft } from 'react-icons/fa'

const UserComponent = () => {
  const [user, setUser] = useState()
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const resp = await getUser(userId)
        const data = resp?.data?.data
        setUser(data)
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleGetUser()
  }, [userId])

  return (
    <div className="viewUser">
      <Sidebar />
      <div className="viewUserContainer">
        <Navbar />
        <div className="viewUserBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/user">User</a>/ <a href="">User detail</a>
          </div>
          <title title="View user information" />
          <div className="viewUserForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="usercode">
                    User code
                  </label>
                  <TextField disabled className="textField" id="usercode" value={user?.id} />
                </div>
                <div className="form">
                  <label className="title" for="username">
                    Username
                  </label>
                  <TextField disabled className="textField" id="username" value={user?.username} />
                </div>
                <div className="form">
                  <label className="title" for="name">
                    Full name
                  </label>
                  <TextField disabled className="textField" id="name" value={user?.fullname} />
                </div>
                <div className="form">
                  <label className="title" for="role">
                    Role
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="role"
                    value={user?.adminRole?.roleName}
                  />
                </div>
                <div className="form">
                  <label className="title" for="email">
                    Email
                  </label>
                  <TextField disabled className="textField" id="email" value={user?.email} />
                </div>
                <div className="form">
                  <label className="title" for="phone">
                    Phone
                  </label>
                  <TextField disabled className="textField" id="phone" value={user?.phone} />
                </div>
                <div className="form">
                  <label className="title" for="status">
                    Status
                  </label>
                  <TextField disabled className="textField" id="status" value={user?.status} />
                </div>
              </Grid>
            </div>
          </div>
          <div className="viewUserFooter">
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

export default UserComponent
