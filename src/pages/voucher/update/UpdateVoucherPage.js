import React from 'react'
import { Navigate } from 'react-router-dom'
import UpdateVoucher from '../../../features/voucher/update/updateVoucherComponent'

function Voucher() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <UpdateVoucher />
}

export default Voucher
