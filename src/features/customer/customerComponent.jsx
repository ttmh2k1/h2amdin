import './customerStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListCustomer, updateCustomer } from '../../apis/customerApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaAngleDown,
  FaArrowCircleLeft,
  FaEye,
  FaLock,
  FaLockOpen,
  FaPen,
  FaUnlock,
} from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
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

const CustomerComponent = () => {
  const navigate = useNavigate()
  const [searchFullname, setSearchFullname] = useState('')
  const [searchUsername, setSearchUsername] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [searchPhone, setSearchPhone] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [status, setStatus] = useState('')

  const [listCustomer, setListCustomer] = useState({
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

  const handleDisable = async (id) => {
    try {
      await updateCustomer(id, 'BANNED')
      toast.success('Disable customer successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Disable customer failed!', style)
    }
  }

  const handleEnable = async (id) => {
    try {
      await updateCustomer(id, 'ACTIVE')
      toast.success('Enable customer successful!', style)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      toast.error('Enable customer failed!', style)
    }
  }

  const action = [
    {
      headerName: 'Action',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (props) => {
        return (
          <div className="cellAction">
            <Link to={`/customer/view/${props.id}`} style={{ textDecoration: 'none' }}>
              <div className="viewButton">
                <FaEye />
              </div>
            </Link>
            <Link to={`/customer/update/${props.id}`} style={{ textDecoration: 'none' }}>
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

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: 'id',
      headerName: 'Customer ID',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'username',
      headerName: 'Username',
      width: 100,
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
      field: 'gender',
      headerName: 'Gender',
      width: 80,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => `${params?.row?.gender === 'FEMALE' ? 'Female' : 'Male'}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 100,
      align: 'left',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) =>
        `${
          params?.row?.status === 'ACTIVE'
            ? 'Active'
            : params?.row?.status === 'BANNED'
            ? 'Banned'
            : 'Wait banned'
        }`,
    },
  ]

  const updateData = (k, v) => setListCustomer((prev) => ({ ...prev, [k]: v }))

  useEffect(() => {
    updateData('loading', true)
    getListCustomer({
      page: listCustomer?.page,
      size: listCustomer?.pageSize,
      sortBy: 1,
      sortDescending: true,
      searchFullname: searchFullname ? searchFullname : '',
      searchUsername: searchUsername ? searchUsername : '',
      searchEmail: searchEmail ? searchEmail : '',
      searchPhone: searchPhone ? searchPhone : '',
      dob: dob ? dob : '',
      gender: gender ? gender : '',
      status: status ? status : '',
    }).then((resp) => {
      setListCustomer({
        ...listCustomer,
        loading: false,
        rows: resp?.data?.data,
        totalRows: resp?.data?.totalElement,
      })
    })
  }, [
    listCustomer?.page,
    listCustomer?.pageSize,
    searchFullname,
    searchUsername,
    searchEmail,
    searchPhone,
    dob,
    gender,
    status,
  ])

  return (
    <div className="customer">
      <Sidebar />
      <div className="customerContainer">
        <Navbar />
        <div className="customerBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/customer">Customer</a>
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
                        <label className="title" for="searchUsername">
                          Username
                        </label>
                        <TextField
                          className="textField"
                          id="searchUsername"
                          onChange={(e) => {
                            setSearchUsername(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="searchFullname">
                          Full name
                        </label>
                        <TextField
                          className="textField"
                          id="searchFullname"
                          onChange={(e) => {
                            setSearchFullname(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="gender">
                          Gender
                        </label>
                        <Select
                          className="select"
                          id="gender"
                          onChange={(e) => {
                            setGender(e?.target?.value)
                          }}
                        >
                          {arrayGender?.map((item, index) => (
                            <MenuItem key={index} value={item?.value}>
                              {item?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                      <div className="form">
                        <label className="title" for="searchEmail">
                          Email
                        </label>
                        <TextField
                          className="textField"
                          id="searchEmail"
                          onChange={(e) => {
                            setSearchEmail(e?.target?.value)
                          }}
                        />
                      </div>
                      <div className="form">
                        <label className="title" for="searchPhone">
                          Phone
                        </label>
                        <TextField
                          className="textField"
                          id="searchPhone"
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
                rows={listCustomer.rows}
                columns={header.concat(action)}
                paginationMode="server"
                loading={listCustomer.loading}
                rowCount={listCustomer.totalRows}
                page={listCustomer.page - 1}
                pageSize={listCustomer.pageSize}
                rowsPerPageOptions={listCustomer.rowsPerPageOptions}
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
          <div className="customerFooter">
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
]

const arrayGender = [
  { name: 'Male', value: 'MALE' },
  { name: 'Female', value: 'FEMALE' },
  { name: 'Other', value: 'OTHER' },
]

export default CustomerComponent
