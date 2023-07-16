import './viewCustomerGroupStyle.scss'
import { Button, Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomerGroup } from '../../../apis/customerGroupApi'
import { FaArrowCircleLeft } from 'react-icons/fa'

const CustomerGroupComponent = () => {
  const [customerGroup, setCustomerGroup] = useState()
  const { customerGroupId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetCustomerGroup = async () => {
      try {
        const resp = await getCustomerGroup(customerGroupId)
        const data = resp?.data?.data
        setCustomerGroup(data)
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleGetCustomerGroup()
  }, [customerGroupId])

  return (
    <div className="viewCustomerGroup">
      <Sidebar />
      <div className="viewCustomerGroupContainer">
        <Navbar />
        <div className="viewCustomerGroupBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/customerGroup">Customer group</a>/{' '}
            <a href=" ">Customer group detail</a>
          </div>
          <div className="viewCustomerGroupForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItem="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="customerGroupCode">
                    Customer group code
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="customerGroupCode"
                    value={customerGroup?.id}
                  />
                </div>
                <div className="form">
                  <label className="title" for="name">
                    Customer group name
                  </label>
                  <TextField disabled className="textField" id="name" value={customerGroup?.name} />
                </div>
                <div className="form">
                  <label className="title" for="customerGroupDiscount">
                    Customer group discount
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="customerGroupDiscount"
                    value={customerGroup?.discountRate * 100 + '%'}
                  />
                </div>
              </Grid>
            </div>
          </div>
          <div className="viewCustomerGroupFooter">
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

export default CustomerGroupComponent
