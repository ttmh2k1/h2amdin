import { combineQueriesUrl } from '../utils/functionHelper';
import api, { SERVICE } from './api';

/**
 * Get list products and view products
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getListProduct(req) {
    const queries = combineQueriesUrl({ ...req });
    return api.GET(`${SERVICE}/api/admin/product-manage?size=500${queries}`);
}

export function getListProductParent(req) {
    const queries = combineQueriesUrl({ ...req });
    return api.GET(`${SERVICE}/api/admin/product/category${queries}`);
}

export function getListCategory(id) {
    return api.GET(`${SERVICE}/api/admin/product/category/${id}`);
}

export function getProduct(id) {
    return api.GET(`${SERVICE}/api/admin/product-manage/${id}`);
}

export function createProduct(data) {
    return api.POST(`${SERVICE}/api/admin/product-manage`, data, {
        "Content-Type": "multipart/form-data",
    });
}

export function updateProduct(id, params) {
    return api.PUT(`${SERVICE}/api/admin/product-manage/${id}`, params, {
        "Content-Type": "multipart/form-data",
    },);
}

export function updateStatusProduct(id, params) {
    return api.PUT(`${SERVICE}/api/admin/product-manage/${id}`, { isHidden: params }, {
        "Content-Type": "multipart/form-data",
    },);
}

export function deleteProduct(id) {
    return api.DELETE(`${SERVICE}/api/admin/product-manage/${id}`)
}