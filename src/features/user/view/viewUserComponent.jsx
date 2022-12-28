import './viewUserStyle.scss'
import { Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { styled } from '@material-ui/styles'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUser } from '../../../apis/userApi'

const UserComponent = () => {
  const [user, setUser] = useState()
  const { userId } = useParams()
  useEffect(() => {
    const handleGetUser = async () => {
      const resp = await getUser(userId)
      const data = resp?.data?.data
      setUser(data)
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
                  <Item disabled className="textField" id="usercode" value={user?.id} />
                </div>
                <div className="form">
                  <label className="title" for="name">
                    Full name
                  </label>
                  <Item disabled className="textField" id="name" value={user?.fullname} />
                </div>
                <div className="form">
                  <label className="title" for="role">
                    Role
                  </label>
                  <Item disabled className="textField" id="role" value={user?.role?.name} />
                </div>
                <div className="form">
                  <label className="title" for="email">
                    Email
                  </label>
                  <Item disabled className="textField" id="email" value={user?.email} />
                </div>
                <div className="form">
                  <label className="title" for="phone">
                    Phone
                  </label>
                  <Item disabled className="textField" id="phone" value={user?.phone} />
                </div>
              </Grid>
            </div>
          </div>
          <footer isGoBack>
            <Link to="/user" style={{ textDecoration: 'none' }} />
          </footer>
        </div>
      </div>
    </div>
  )
}

const Item = styled(TextField)({
  '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled': {
    height: '0.4rem',
    fontSize: '1rem',
    WebkitTextFillColor: '#707070',
  },
})

export default UserComponent
