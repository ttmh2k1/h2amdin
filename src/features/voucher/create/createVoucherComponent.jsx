import { useNavigate } from 'react-router-dom'
import './createVoucherStyle.scss'
import { FaArrowCircleLeft, FaPlusSquare } from 'react-icons/fa'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { Grid, Button, MenuItem, Select, TextField } from '@mui/material'
import moment from 'moment'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { createVoucher } from '../../../apis/voucherApi'

export const CreateVoucher = () => {
  const [voucher, setVoucher] = useState([])
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
    setVoucher((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    try {
      await createVoucher(voucher)
      toast.success('Create voucher successful!', style)
      setTimeout(() => {
        navigate('/voucher')
      }, 2000)
    } catch (error) {
      toast.error(error?.response?.data?.message, style)
    }
  }

  return (
    <>
      <div className="createVoucher">
        <Sidebar />
        <div className="createVoucherContainer">
          <Navbar />
          <div className="createVoucherBody">
            <div className="title">
              <a href="/">Home</a>/ <a href="/voucher">Voucher</a>/ <a href=" ">Create voucher</a>
            </div>
            <div className="createVoucherForm">
              <div style={{ width: '100%', padding: '0.4rem' }}>
                <div className="createVoucher">
                  <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                    <div className="form">
                      <label className="title" for="code">
                        Voucher code
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="code"
                        onChange={(e) => onChange('code', e.target.value)}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="discountType">
                        Discount type
                      </label>
                      <Select
                        isrequired
                        className="select"
                        name="discountType"
                        id="discountType"
                        onChange={(e) => onChange('discountType', e.target.value)}
                      >
                        {arrayDiscountType?.map((item, index) => (
                          <MenuItem key={index} value={item?.value}>
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="form">
                      <label className="title" for="description">
                        Description
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="description"
                        onChange={(e) => onChange('description', e.target.value)}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="discountAmount">
                        Discount value
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="discountAmount"
                        type="number"
                        onChange={(e) => onChange('discountAmount', e.target.value)}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="minOrderAmount">
                        Minimum order value
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="minOrderAmount"
                        type="number"
                        onChange={(e) => onChange('minOrderAmount', e.target.value)}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="maxDiscount">
                        Maximum discount value
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="maxDiscount"
                        type="number"
                        onChange={(e) => onChange('maxDiscount', e.target.value)}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="validFrom">
                        Start date
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="validFrom"
                        type="datetime-local"
                        onChange={(e) => onChange('validFrom', moment(e?.target?.value).format())}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="validTo">
                        End date
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="validTo"
                        type="datetime-local"
                        onChange={(e) => onChange('validTo', moment(e?.target?.value).format())}
                      />
                    </div>
                    <div className="form">
                      <label className="title" for="limit">
                        Limit
                      </label>
                      <TextField
                        isrequired
                        className="textField"
                        id="limit"
                        type="number"
                        onChange={(e) => onChange('limit', e.target.value)}
                      />
                    </div>
                  </Grid>
                </div>
              </div>
            </div>
            <div className="createVoucherFooter">
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

const arrayDiscountType = [
  { name: 'Amount', value: 'AMOUNT' },
  { name: 'Percent', value: 'PERCENT' },
]
