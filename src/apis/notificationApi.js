import { combineQueriesUrl } from '../utils/functionHelper';
import api, { SERVICE } from './api';

/**
 * Get list logs and view logs
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getNotification(req) {
    const queries = combineQueriesUrl({ ...req });
    return api.GET(`${SERVICE}/api/admin/notification${queries}`);
}