import { combineQueriesUrl } from '../utils/functionHelper';
import api, { SERVICE } from './api';

/**
 * Get list warehouse and view warehouse
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListWarehouse(req) {
    const queries = combineQueriesUrl({ ...req });
    return api.GET(`${SERVICE}/api/admin/inventory-manage${queries}`);
}

export function importWarehouse(params) {
    return api.POST(`${SERVICE}/api/admin/inventory-manage`, params);
}