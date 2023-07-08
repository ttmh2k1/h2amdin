import { combineQueriesUrl } from '../utils/functionHelper'
import api, { SERVICE } from './api'

/**
 * Get list voucher and view voucher
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListVoucher(req) {
  const queries = combineQueriesUrl({ ...req })
  return api.GET(`${SERVICE}/api/admin/coupon-code${queries}`)
}

export function getVoucher(id) {
  return api.GET(`${SERVICE}/api/admin/coupon-code/${id}`)
}

export function createVoucher(data) {
  return api.POST(`${SERVICE}/api/admin/coupon-code`, data)
}

export function updateVoucher(id, code, limit) {
  return api.PUT(`${SERVICE}/api/admin/coupon-code/${id}`, { code: code, limit: limit })
}

export function deleteVoucher(id) {
  return api.DELETE(`${SERVICE}/api/admin/coupon-code/${id}`)
}
