import api, { SERVICE } from './api'

/**
 * Get list roles and view roles
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListRole() {
  return api.GET(`${SERVICE}/api/admin/role-permission`)
}

export function getRoleInfo(roleName) {
  return api.GET(`${SERVICE}/api/admin/role-permission/${roleName}`)
}

export function getListPermission() {
  return api.GET(`${SERVICE}/api/admin/role-permission/permissions`)
}

export function createRole(data) {
  return api.POST(`${SERVICE}/api/admin/role-permission`, data)
}

export function updateRole(roleName, data) {
  return api.PUT(`${SERVICE}/api/admin/role-permission/${roleName}`, data)
}
