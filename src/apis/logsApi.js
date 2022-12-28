import api, { SERVICE } from './api';

/**
 * Get list logs and view logs
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getLogs() {
    return api.GET(`${SERVICE}/api/admin/log?size=1000`);
}