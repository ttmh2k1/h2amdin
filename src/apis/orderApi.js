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

export function getListOrderWaitForSend(req) {
  const role = localStorage
    .getItem('permission')
    .split(',')
    .includes('U_ORDER_SHIPPER' || 'R_ORDER_SHIPPER')
  const queries = combineQueriesUrl({ ...req })
  if (role) return api.GET(`${SERVICE}/api/admin/order${queries}`)
}

export function getListOrderDelivering(req) {
  const role = localStorage
    .getItem('permission')
    .split(',')
    .includes('U_ORDER_SHIPPER' || 'R_ORDER_SHIPPER')
  const queries = combineQueriesUrl({ ...req })
  if (role) return api.GET(`${SERVICE}/api/admin/order${queries}`)
}

export function getOrder(id) {
  return api.GET(`${SERVICE}/api/admin/order/${id}`)
}

export function updateOrder(id, params) {
  return api.PUT(`${SERVICE}/api/admin/order/${id}`, { newStatus: params })
}

export function listDelivery(req) {
  const role = localStorage
    .getItem('permission')
    .split(',')
    .includes('U_ORDER_SHIPPER' || 'R_ORDER_SHIPPER')
  const queries = combineQueriesUrl({ ...req })
  if (role) return api.GET(`${SERVICE}/api/admin/order${queries}`)
}

export function listDelivery1(req) {
  const role = localStorage
    .getItem('permission')
    .split(',')
    .includes('U_ORDER_SHIPPER' || 'R_ORDER_SHIPPER')
  const queries = combineQueriesUrl({ ...req })
  if (role) return api.GET(`${SERVICE}/api/admin/order${queries}`)
}
