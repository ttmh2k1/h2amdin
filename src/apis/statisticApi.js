import { combineQueriesUrl } from '../utils/functionHelper'
import api, { SERVICE, apiDownload } from './api'

/**
 * Get statistic and view statistic
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getStatistic(req) {
  const queries = combineQueriesUrl({ ...req })
  return api.GET(`${SERVICE}/api/admin/statistic${queries}`)
}

export function getStatisticMoment() {
  return api.GET(`${SERVICE}/api/admin/statistic?month=7&year=2023&type=MONTH`)
}

export function getStatisticExport(req) {
  const queries = combineQueriesUrl({ ...req })
  return apiDownload.get(`${SERVICE}/api/admin/statistic/export${queries}`, {
    responseType: 'blob',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  })
}

export function getTopView() {
  return api.GET(`${SERVICE}/api/product/most-viewed`)
}

export function getTopSale() {
  return api.GET(`${SERVICE}/api/product/top-sale`)
}

export function getTopSold() {
  return api.GET(`${SERVICE}/api/product/most-sold`)
}

export function getTopRating() {
  return api.GET(`${SERVICE}/api/product/high-rating`)
}
