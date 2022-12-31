import './viewCustomerStyle.scss'
import { Button, Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomer } from '../../../apis/customerApi'
import { FaArrowCircleLeft } from 'react-icons/fa'

const CustomerComponent = () => {
  const [customer, setCustomer] = useState()
  const { customerId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetCustomer = async () => {
      const resp = await getCustomer(customerId)
      const data = resp?.data?.data
      setCustomer(data)
    }
    handleGetCustomer()
  }, [customerId])

  return (
    <div className="viewCustomer">
      <Sidebar />
      <div className="viewCustomerContainer">
        <Navbar />
        <div className="viewCustomerBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/customer">Customer</a>/ <a href=" ">Product detail</a>
          </div>
          <div className="viewCustomerForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="customerCode">
                    Customer ID
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="customerCode"
                    value={customer?.id}
                  />
                </div>
                <div className="form">
                  <label className="title" for="fullname">
                    Customer name
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="fullname"
                    value={customer?.fullname}
                  />
                </div>
                <div className="form">
                  <label className="title" for="username">
                    Username
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="username"
                    value={customer?.username}
                  />
                </div>
                <div className="form">
                  <label className="title" for="customerGroup">
                    Customer group
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="customerGroup"
                    value={customer?.rank?.name}
                  />
                </div>
                <div className="form">
                  <label className="title" for="email">
                    Email
                  </label>
                  <TextField disabled className="textField" id="email" value={customer?.email} />
                </div>
                <div className="form">
                  <label className="title" for="phone">
                    Phone
                  </label>
                  <TextField disabled className="textField" id="phone" value={customer?.phone} />
                </div>
                <div className="form">
                  <label className="title" for="gender">
                    Gender
                  </label>
                  <TextField disabled className="textField" id="role" value={customer?.gender} />
                </div>
                <div className="form">
                  <label className="title" for="dob">
                    Date of birth
                  </label>
                  <TextField disabled className="textField" id="dob" value={customer?.dob} />
                </div>
                <div className="form">
                  <label className="title" for="address">
                    Address detail
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="address"
                    value={customer?.defaultAddress?.addressDetail}
                  />
                </div>
                <div className="form">
                  <label className="title" for="address">
                    Ward
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="address"
                    value={customer?.defaultAddress?.addressWard?.name}
                  />
                </div>
                <div className="form">
                  <label className="title" for="address">
                    District
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="address"
                    value={customer?.defaultAddress?.addressWard?.district?.name}
                  />
                </div>
                <div className="form">
                  <label className="title" for="address">
                    Province
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="address"
                    value={customer?.defaultAddress?.addressWard?.district?.provinceCity?.name}
                  />
                </div>
                <div className="form">
                  <label className="title" for="status">
                    Status
                  </label>
                  <TextField disabled className="textField" id="status" value={customer?.status} />
                </div>
              </Grid>
            </div>
          </div>
          <div className="viewCustomerFooter">
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

export default CustomerComponent
