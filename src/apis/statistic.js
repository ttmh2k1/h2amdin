import api, { SERVICE } from './api';

/**
 * Get statistic and view statistic
 * @param {*} req
 * @returns {Promise<import('axios').AxiosResponse<any>>}
 */
export function getStatistic() {
    return api.GET(`${SERVICE}/api/admin/statistic?month=1&year=2023&type=MONTH`);
}

export function getStatisticMonth(month, year, type) {
    return api.GET(`${SERVICE}/api/admin/statistic?month=${month}&year=${year}&type=${type}`);
}

export function getStatisticQuarter(quarter, year, type) {
    return api.GET(`${SERVICE}/api/admin/statistic?quarter=${quarter}&year=${year}&type=${type}`);
}