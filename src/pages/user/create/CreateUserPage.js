import React from 'react'
import { Navigate } from 'react-router-dom'
import { CreateUser } from '../../../features/user/create/createUserComponent'

function User() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <CreateUser />
}

export default User
