import { Button, Grid, TextField } from '@mui/material'
import './viewVoucherStyle.scss'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { useEffect, useState } from 'react'
import { getVoucher } from '../../../apis/voucherApi'
import moment from 'moment'

const VoucherComponent = () => {
  const [voucher, setVoucher] = useState()
  const { voucherId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleGetVoucher = async () => {
      try {
        const resp = await getVoucher(voucherId)
        const data = resp?.data?.data
        setVoucher(data)
      } catch (error) {
        if (error?.response?.status === 403) {
          navigate('/error')
        }
      }
    }
    handleGetVoucher()
  }, [voucherId])

  return (
    <div className="viewVoucher">
      <Sidebar />
      <div className="viewVoucherContainer">
        <Navbar />
        <div className="viewVoucherBody">
          <div className="title">
            <a href="/">Home</a>/ <a href="/voucher">Voucher</a>/ <a href=" ">Voucher detail</a>
          </div>
          <div className="viewVoucherForm">
            <div style={{ width: '100%', padding: '0.4rem' }}>
              <div className="detail">
                <label className="levelHeader">{voucher?.code}</label>
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
                    <TextField disabled className="textField" id="code" value={voucher?.code} />
                  </div>
                  <div className="form">
                    <label className="title" for="discountType">
                      Discount type
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      name="discountType"
                      id="discountType"
                      value={voucher?.discountType}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="description">
                      Description
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="description"
                      value={voucher?.description}
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
                    <TextField
                      disabled
                      className="textField"
                      id="validFrom"
                      value={moment(voucher?.validFrom).format('YYYY-MM-DD hh:mm')}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="validTo">
                      End date
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="validTo"
                      value={moment(voucher?.validTo).format('YYYY-MM-DD hh:mm')}
                    />
                  </div>
                  <div className="form">
                    <label className="title" for="usedLimit">
                      Limit
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="usedLimit"
                      value={voucher?.usedLimit}
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
                    <label className="title" for="isActive">
                      Status
                    </label>
                    <TextField
                      disabled
                      className="textField"
                      id="isActive"
                      value={voucher?.isActive ? 'Available' : 'Unavailable'}
                    />
                  </div>
                </Grid>
              </div>
            </div>
          </div>
          <div className="viewVoucherFooter">
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
export default VoucherComponent
