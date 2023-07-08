import { combineQueriesUrl } from '../utils/functionHelper'
import api, { SERVICE } from './api'

/**
 * Get list order and view order
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListOrder(req) {
  const queries = combineQueriesUrl({ ...req })
  return api.GET(`${SERVICE}/api/admin/order${queries}`)
}

export function getOrder(id) {
  return api.GET(`${SERVICE}/api/admin/order/${id}`)
}

export function updateOrder(id, params) {
  return api.PUT(`${SERVICE}/api/admin/order/${id}`, params)
}

export function listDelivery(req) {
  const queries = combineQueriesUrl({ ...req })
  return api.GET(`${SERVICE}/api/admin/order?status=WAIT_FOR_SEND&${queries}`)
}

export function listDelivery1(req) {
  const queries = combineQueriesUrl({ ...req })
  return api.GET(`${SERVICE}/api/admin/order?status=DELIVERING${queries}`)
}
