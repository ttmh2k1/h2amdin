import { combineQueriesUrl } from '../utils/functionHelper';
import api, { SERVICE } from './api';

/**
 * Get list customer group and view customer group
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListCustomerGroup(req) {
    const queries = combineQueriesUrl({ ...req });
    return api.GET(`${SERVICE}/api/admin/buyer-rank${queries}`);
}

export function getCustomerGroup(id) {
    return api.GET(`${SERVICE}/api/admin/buyer-rank/${id}`);
}

export function updateCustomerGroup(id, params) {
    return api.PUT(`${SERVICE}/api/admin/buyer-rank/${id}`, { discountRate: params });
}