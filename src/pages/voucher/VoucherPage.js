import React from 'react'
import { Navigate } from 'react-router-dom'
import VoucherComponent from '../../features/voucher/voucherComponent'

function Voucher() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <VoucherComponent />
}

export default Voucher
