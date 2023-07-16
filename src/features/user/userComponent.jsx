import './userStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListUsers, updateUserStatus } from '../../apis/userApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DataGrid } from '@mui/x-data-grid'
import {
  FaArrowCircleLeft,
  FaEye,
  FaLock,
  FaLockOpen,
  FaPen,
  FaPlusCircle,
  FaUnlock,
  FaAngleDown,
} from 'react-icons/fa'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import { toast } from 'react-toastify'

const UserComponent = () => {
  const navigate = useNavigate()
  const [searchFullname, setSearchFullname] = useState('')
  const [searchUsername, setSearchUsername] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState({
    loading: true,
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [10, 20, 50],
    pageSize: 10,
    page: 1,
  })

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

  const actionColumn = [
    {
      headerName: 'Action',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/user/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/user/update/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="updateButton">
                <FaPen />
              </div>
            </Link>
            <div className="disableButton">
              {props?.row?.status === 'ACTIVE' ? (
                <FaLock onClick={() => handleDisable(props.id)} />
              ) : props?.row?.status === 'BANNED' ? (
                <FaLockOpen onClick={() => handleEnable(props.id)} />
              ) : (
                <FaUnlock onClick={() => handleDisable(props.id)} />
              )}
            </div>
          </div>
        )
      },
    },
  ]

  const userHeader = [
    {
      field: 'stt',
      headerName: 'No',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'User ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'username',
      headerName: 'User name',
      width: 120,
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
      renderCell: (params) => `${params?.row?.adminRole?.description}`,
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

  const handleDisable = async (id) => {
    try {
      await updateUserStatus(id, {
        status: 'BANNED',
      })
      toast.success('Disable user successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Disable user failed!', style)
    }
  }

  const handleEnable = async (id) => {
    try {
      await updateUserStatus(id, {
        status: 'ACTIVE',
      })
      toast.success('Enable user successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Enable user failed!', style)
    }
  }

  useEffect(() => {
    const handleGetListUsers = async () => {
      updateData('loading', true)
      try {
        await getListUsers({
          page: users?.page,
          size: users?.pageSize,
          sortDescending: true,
          searchFullname: searchFullname ? searchFullname : ' ',
          searchUsername: searchUsername ? searchUsername : '',
          searchEmail: searchEmail ? searchEmail : '',
          searchPhone: searchPhone ? searchPhone : '',
          status: status ? status : '',
        }).then((resp) => {
          setUsers({
            ...users,
            loading: false,
            rows: resp?.data?.data,
            totalRows: resp?.data?.totalElement,
          })
        })
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleGetListUsers()
  }, [
    users?.page,
    users?.pageSize,
    searchFullname,
    searchUsername,
    searchEmail,
    searchPhone,
    status,
  ])

  return (
    <div className="user">
      <Sidebar />
      <div className="userContainer">
        <Navbar />
        <div className="userBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/user">User</a>
          </div>
          <div className="search">
            <Accordion style={{ borderRadius: '0.4vw' }}>
              <AccordionSummary
                expandIcon={<FaAngleDown />}
                style={{ margin: '0' }}
                id="panel1a-header"
              >
                <Typography style={{ padding: '0' }}>Search</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ padding: 0 }}>
                <Typography>
                  <div style={{ width: '100%' }}>
                    <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                      <div className="form">
                        <label className="title" for="fullname">
                          Fullname
                        </label>
                        <TextField
                          className="textField"
                          id="fullname"
                          onChange={(e) => {
                            setSearchFullname(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="username">
                          Username
                        </label>
                        <TextField
                          className="textField"
                          id="username"
                          onChange={(e) => {
                            setSearchUsername(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="email">
                          Email
                        </label>
                        <TextField
                          className="textField"
                          id="email"
                          onChange={(e) => {
                            setSearchEmail(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="phone">
                          Phone
                        </label>
                        <TextField
                          className="textField"
                          id="phone"
                          onChange={(e) => {
                            setSearchPhone(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="status">
                          Status
                        </label>
                        <Select
                          className="select"
                          id="status"
                          onChange={(e) => {
                            setStatus(e?.target?.value)
                          }}
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
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="template">
            <div className="datatable">
              <Tab
                rows={users?.rows}
                columns={userHeader?.concat(actionColumn)}
                paginationMode="server"
                loading={users?.loading}
                rowCount={users?.totalRows}
                page={users?.page - 1}
                pageSize={users?.pageSize}
                rowsPerPageOptions={users?.rowsPerPageOptions}
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
              className="createButton"
              startIcon={<FaPlusCircle color="#fff" size={'1rem'} />}
              onClick={() => navigate('/user/create')}
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

const arrayStatus = [
  { name: 'Active', value: 'ACTIVE' },
  { name: 'Banned', value: 'BANNED' },
  { name: 'Wait banned', value: 'WAIT_BANNED' },
]

export default UserComponent
