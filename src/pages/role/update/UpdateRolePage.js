import React from 'react'
import { Navigate } from 'react-router-dom'
import UpdateRole from '../../../features/role/update/updateRoleComponent'

function Role() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <UpdateRole />
}

export default Role
