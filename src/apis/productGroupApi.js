import api, { SERVICE } from './api';

/**
 * Get list product group and view product group
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListProductGroup() {
    return api.GET(`${SERVICE}/api/admin/product/category`);
}

export function getProductGroup(id) {
    return api.GET(`${SERVICE}/api/admin/product/category/${id}`);
}

export function updateProductGroup(id, params) {
    return api.PUT(`${SERVICE}/api/admin/product/category/${id}`, params)
}