import api, { SERVICE } from './api';

/**
 * Get list roles and view roles
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getRoles() {
    return api.GET(`${SERVICE}/api/admin/sale-admin-permission`);
}