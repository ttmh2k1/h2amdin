import React from 'react'
import { Navigate } from 'react-router-dom'
import { CreateVoucher } from '../../../features/voucher/create/createVoucherComponent'

function Voucher() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <CreateVoucher />
}

export default Voucher
