import React from 'react'
import { Navigate } from 'react-router-dom'
import ViewVoucher from '../../../features/voucher/view/viewVoucherComponent'

function Voucher() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <ViewVoucher />
}

export default Voucher
