import api, { SERVICE } from './api';

/**
 * Get list logs and view logs
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function statisticToday() {
    return api.GET(`${SERVICE}/api/admin/statistic/today`);
}