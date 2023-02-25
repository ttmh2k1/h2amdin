import { combineQueriesUrl } from '../utils/functionHelper';
import api, { SERVICE } from './api';

/**
 * Get list customers and view customers
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListCustomer(req) {
    const queries = combineQueriesUrl({ ...req });
    return api.GET(`${SERVICE}/api/admin/user-manage/buyer${queries}`);
}

export function getCustomer(id) {
    return api.GET(`${SERVICE}/api/admin/user-manage/buyer/${id}`);
}

export function updateCustomer(id, params) {
    return api.PUT(`${SERVICE}/api/admin/user-manage/buyer/${id}`, { status: params });
}