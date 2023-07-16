import './updateVoucherStyle.scss'
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'
import { FaArrowCircleLeft, FaSave } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { getVoucher, updateVoucher } from '../../../apis/voucherApi'
import moment from 'moment'
import { toast } from 'react-toastify'

const VoucherComponent = () => {
  const [voucher, setVoucher] = useState()
  const { voucherId } = useParams()
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

  useEffect(() => {
    const handleGetVoucher = async () => {
      const resp = await getVoucher(voucherId)
      const data = resp?.data?.data
      setVoucher(data)
    }
    handleGetVoucher()
  }, [voucherId])

  const handleSave = async () => {
    try {
      await updateVoucher(voucherId, voucher)
      toast.success('Update voucher successful!', style)
      setTimeout(() => {
        navigate('/voucher')
      }, 2000)
    } catch (error) {
      if (error?.response?.data?.data) {
        if (error?.response?.data?.data?.description) {
          toast.error('Description ' + error?.response?.data?.data?.description, style)
        } else if (error?.response?.data?.data?.discountAmount) {
          toast.error('Discount value ' + error?.response?.data?.data?.discountAmount, style)
        } else if (error?.response?.data?.data?.discountType) {
          toast.error('Discount type ' + error?.response?.data?.data?.discountType, style)
        } else if (error?.response?.data?.data?.limit) {
          toast.error('Limit ' + error?.response?.data?.data?.limit, style)
        } else if (error?.response?.data?.data?.maxDiscount) {
          toast.error('Maximum discount value ' + error?.response?.data?.data?.maxDiscount, style)
        } else if (error?.response?.data?.data?.minOrderAmount) {
          toast.error('Minimum order value ' + error?.response?.data?.data?.minOrderAmount, style)
        } else if (error?.response?.data?.data?.validFrom) {
          toast.error('Start date ' + error?.response?.data?.data?.validFrom, style)
        } else if (error?.response?.data?.data?.validTo) {
          toast.error('End date ' + error?.response?.data?.data?.validTo, style)
        }
      } else toast.error(error?.response?.data?.message, style)
    }
  }

  return (
    <div className="updateVoucher">
      <Sidebar />
      <div className="updateVoucherContainer">
        <Navbar />
        <div className="updateVoucherBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/voucher">Voucher</a>/ <a href=" ">Update voucher</a>
          </div>
          <div className="updateVoucherForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <div className="detail">
                <label className="levelHeader">{voucher?.code}</label>
              </div>
              <Grid container spacing={0} alignItems="flex-start" alignContent="space-around">
                <div className="form">
                  <label className="title" for="id">
                    Voucher ID
                  </label>
                  <TextField disabled className="textField" id="id" value={voucher?.id} />
                </div>
                <div className="form">
                  <label className="title" for="code">
                    Voucher code
                  </label>
                  <TextField
                    isrequired
                    className="textField"
                    id="code"
                    value={voucher?.code}
                    onChange={(e) => setVoucher((state) => ({ ...state, code: e?.target?.value }))}
                  />
                </div>
                <div className="form">
                  <label className="title" for="discountType">
                    Discount type
                  </label>
                  {moment(voucher?.validFrom).format() > moment().format() ? (
                    <Select
                      isrequired
                      className="select"
                      name="discountType"
                      id="discountType"
                      value={voucher?.discountType === 'AMOUNT' ? 'AMOUNT' : 'PERCENT'}
                      onChange={(e) =>
                        setVoucher((state) => ({ ...state, discountType: e?.target?.value }))
                      }
                    >
                      {arrayDiscountType?.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <TextField
                      isrequired
                      disabled
                      className="textField"
                      name="discountType"
                      id="discountType"
                      value={voucher?.discountType}
                    />
                  )}
                </div>
                <div className="form">
                  <label className="title" for="description">
                    Description
                  </label>

                  <TextField
                    disabled={moment(voucher?.validTo).format() > moment().format()}
                    className="textField"
                    id="description"
                    value={voucher?.description}
                    onChange={(e) =>
                      setVoucher((state) => ({ ...state, description: e?.target?.value }))
                    }
                  />
                </div>
                <div className="form">
                  <label className="title" for="discountAmount">
                    Discount value
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="discountAmount"
                    value={voucher?.discountAmount}
                  />
                </div>
                <div className="form">
                  <label className="title" for="minOrderAmount">
                    Minimum order value
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="minOrderAmount"
                    value={voucher?.minOrderAmount}
                  />
                </div>
                <div className="form">
                  <label className="title" for="maxDiscount">
                    Maximum discount value
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="maxDiscount"
                    value={voucher?.maxDiscount}
                  />
                </div>
                <div className="form">
                  <label className="title" for="validFrom">
                    Start date
                  </label>
                  {moment(voucher?.validFrom).format() > moment().format() ? (
                    <TextField
                      isrequired
                      className="textField"
                      id="validFrom"
                      type="datetime-local"
                      onChange={(e) =>
                        setVoucher((state) => ({
                          ...state,
                          validFrom: moment(e?.target?.value).format(),
                        }))
                      }
                    />
                  ) : (
                    <TextField
                      disabled
                      className="textField"
                      id="validFrom"
                      value={moment(voucher?.validFrom).format('YYYY-MM-DD hh:mm')}
                    />
                  )}
                </div>
                <div className="form">
                  <label className="title" for="validTo">
                    End date
                  </label>
                  {moment(voucher?.validTo).format() < moment().format() ? (
                    <TextField
                      disabled
                      className="textField"
                      id="validTo"
                      value={moment(voucher?.validTo).format('YYYY-MM-DD hh:mm')}
                    />
                  ) : (
                    <TextField
                      isrequired
                      className="textField"
                      id="validTo"
                      type="datetime-local"
                      onChange={(e) =>
                        setVoucher((state) => ({
                          ...state,
                          validTo: moment(e?.target?.value).format(),
                        }))
                      }
                    />
                  )}
                </div>
                <div className="form">
                  <label className="title" for="usedLimit">
                    Limit
                  </label>
                  <TextField
                    isrequired
                    className="textField"
                    id="usedLimit"
                    value={voucher?.limit ? voucher?.limit : voucher?.usedLimit}
                    type="number"
                    onChange={(e) =>
                      setVoucher((state) => ({
                        ...state,
                        limit: e?.target?.value,
                      }))
                    }
                  />
                </div>
                <div className="form">
                  <label className="title" for="usedTimes">
                    Number of times used
                  </label>
                  <TextField
                    disabled
                    className="textField"
                    id="usedTimes"
                    value={voucher?.usedTimes}
                  />
                </div>
                <div className="form">
                  <label className="title" for="status">
                    Status
                  </label>
                  {moment(voucher?.validTo).format() < moment().format() ? (
                    <TextField
                      disabled
                      className="textField"
                      id="isActive"
                      value={voucher?.isActive ? 'Available' : 'Unavailable'}
                    />
                  ) : (
                    <Select
                      className="select"
                      name="status"
                      id="status"
                      defaultValue={voucher?.isActive ? true : false}
                      value={voucher?.isActive}
                      onChange={(e) =>
                        setVoucher((state) => ({
                          ...state,
                          isActive: e?.target?.value,
                        }))
                      }
                    >
                      {arrayStatus?.map((item, index) => (
                        <MenuItem key={index} value={item?.value}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
              </Grid>
            </div>
          </div>
          <div className="updateVoucherFooter">
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

const arrayStatus = [
  { name: 'Active', value: 'true' },
  { name: 'Unavailable', value: 'false' },
]

const arrayDiscountType = [
  { name: 'Amount', value: 'AMOUNT' },
  { name: 'Percent', value: 'PERCENT' },
]

export default VoucherComponent
