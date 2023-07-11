import React from 'react'
import { Navigate } from 'react-router-dom'
import { CreateRole } from '../../../features/role/create/createRoleComponent'

function Role() {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />
  }
  return <CreateRole />
}

export default Role
