import './customerStyle.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { getListCustomer } from '../../apis/customerApi'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft, FaEye, FaLock, FaPen, FaTrashAlt } from 'react-icons/fa'
import { DataGrid } from '@mui/x-data-grid'
import styled from 'styled-components'
import { Button } from '@mui/material'

const CustomerComponent = () => {
  const [listCustomer, setListCustomer] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleListCustomer = async () => {
      const resp = await getListCustomer()
      const list = resp?.data?.data
      setListCustomer(list)
    }
    handleListCustomer()
  }, [])

  const header = [
    {
      field: 'stt',
      headerName: 'No',
      width: 80,
      align: 'center',
      headerAlign: 'center',
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
      width: 100,
      align: 'center',
      headerAlign: 'center',
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
    },
  ]

  const content = listCustomer.map((item, index) => {
    return {
      stt: index + 1,
      id: item?.id,
      username: item?.username,
      fullname: item?.fullname,
      gender: item?.gender,
      email: item?.email,
      phone: item?.phone,
      status: item?.status,
    }
  })

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
            {/* <div className="disableButton">
              <FaLock />
            </div>
            <div className="deleteButton">
              <FaTrashAlt />
            </div> */}
          </div>
        )
      },
    },
  ]

  return (
    <div className="customer">
      <Sidebar />
      <div className="customerContainer">
        <Navbar />
        <div className="customerBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/customer">Customer</a>
          </div>
          <div className="template">
            <div className="datatable">
              <Tab
                rows={content}
                columns={header.concat(action)}
                pageSize={10}
                rowsPerPageOptions={[10]}
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

export default CustomerComponent
