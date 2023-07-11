import { combineQueriesUrl } from '../utils/functionHelper'
import api, { SERVICE } from './api'

/**
 * Get list users and view users
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListUsers(req) {
  const queries = combineQueriesUrl({ ...req })
  return api.GET(`${SERVICE}/api/admin/user-manage${queries}`)
}

export function getUser(id) {
  return api.GET(`${SERVICE}/api/admin/user-manage/${id}`)
}

export function updateUserStatus(id, param) {
  return api.PUT(`${SERVICE}/api/admin/user-manage/status/${id}`, param)
}

export function updateUser(id, param) {
  return api.PUT(`${SERVICE}/api/admin/user-manage/status/${id}`, param)
}

export function createUser(param) {
  return api.POST(`${SERVICE}/api/admin/user-manage`, param)
}
