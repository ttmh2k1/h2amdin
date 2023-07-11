import { useNavigate } from 'react-router-dom'
import './createUserStyle.scss'
import { FaArrowCircleLeft, FaPlusSquare } from 'react-icons/fa'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { Grid, Button, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { createUser } from '../../../apis/userApi'
import { getListRole } from '../../../apis/roleApi'

export const CreateUser = () => {
  const [role, setRole] = useState([])
  const [user, setUser] = useState([])
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

  const onChange = (name, value) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

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
      await createUser(user)
      toast.success('Create user successful!', style)
      setTimeout(() => {
        navigate('/user')
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  return (
    <>
      <div className="createUser">
        <Sidebar />
        <div className="createUserContainer">
          <Navbar />
          <div className="createUserBody">
            <div className="title">
              <a href="/">Home</a>/ <a href="/user">User</a>/ <a href=" ">Create user</a>
            </div>
            <div className="createUserForm">
              <div style={{ width: '100%', padding: '0.4rem' }}>
                <div className="createUser">
                  <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                    <div className="form">
                      <label className="title" for="username">
                        Username
                      </label>
                      <TextField
                        className="textField"
                        id="username"
                        value={user?.username}
                        onChange={(e) => onChange('username', e.target.value)}
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
                        onChange={(e) => onChange('fullname', e.target.value)}
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
                        value={user?.adminRoleName}
                        onChange={(e) => onChange('fullname', e.target.value)}
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
                  </Grid>
                </div>
              </div>
            </div>
            <div className="createUserFooter">
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
    </>
  )
}
