import React from 'react'
import { Navigate } from 'react-router-dom'
import UpdateUserComponent from '../../../features/user/update/updateUserComponent'

function User() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <UpdateUserComponent />
}

export default User
