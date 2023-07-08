import './updateCustomerGroupStyle.scss'
import { Button, Grid, TextField } from '@mui/material'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getCustomerGroup, updateCustomerGroup } from '../../../apis/customerGroupApi'
import { FaArrowCircleLeft, FaSave } from 'react-icons/fa'
import { toast } from 'react-toastify'

const CustomerGroupComponent = () => {
  const [customerGroup, setCustomerGroup] = useState()
  const params = useParams()
  const customerGroupId = params.customerGroupId
  const navigate = useNavigate()

  const style = {
    position: 'bottom-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  }

  useEffect(() => {
    const handleGetCustomerGroup = async () => {
      const resp = await getCustomerGroup(customerGroupId)
      const data = resp?.data?.data
      setCustomerGroup(data)
    }
    handleGetCustomerGroup()
  }, [])

  const handleSave = async () => {
    const discountRate = customerGroup?.discountRate
    try {
      await updateCustomerGroup(customerGroupId, discountRate * 100)
      toast.success('Update successful!', style)
      setTimeout(() => {
        navigate('/customerGroup')
      }, 2000)
    } catch (error) {
      toast.error('Update failed!', style)
    }
  }

  return (
    <div className="updateCustomerGroup">
      <Sidebar />
      <div className="updateCustomerGroupContainer">
        <Navbar />
        <div className="updateCustomerGroupBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/customerGroup">Customer group</a>/{' '}
            <a href=" ">Update customer group</a>
          </div>
          <div className="updateCustomerGroupForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
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
                    isrequired
                    className="textField"
                    id="customerGroupDiscount"
                    type="number"
                    value={customerGroup?.discountRate * 100}
                    onChange={(e) =>
                      setCustomerGroup((state) => ({
                        ...state,
                        discountRate: e.target.value / 100,
                      }))
                    }
                  />
                </div>
              </Grid>
            </div>
          </div>
          <div className="updateCustomerGroupFooter">
            <Button
              className="saveButton"
              startIcon={<FaSave color="#fff" size={'1rem'} />}
              onClick={() => handleSave()}
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

export default CustomerGroupComponent
