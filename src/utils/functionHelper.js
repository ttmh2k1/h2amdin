/* ------------------------------------ / ----------------------------------- */
/**
 * Combine object queries to string
 * @param {Object} queries
 * @returns {string}
 */
export function combineQueriesUrl(queries = {}) {
    const arrQueryKeys = Object.keys(queries);
    let result = arrQueryKeys.length > 0 ? '?' : '';
    for (const i in arrQueryKeys) {
        if (
            queries[arrQueryKeys[i]] !== null
            || queries[arrQueryKeys[i]] !== undefined
        ) {
            if (Number.parseInt(i) !== 0) {
                result += '&';
            }
            result += `${arrQueryKeys[i]}=${encodeURIComponent(
                queries[arrQueryKeys[i]]
            )}`;
        }
    }
    return result;
}

/* ------------------------------------ / ----------------------------------- */
/**
 * Check page available
 * @param {number} page
 * @param {number} limit
 * @param {number} total
 * @typedef ResultGetAvailiblePage
 * @property {number} page
 * @property {boolean}  isAvailable
 * @returns {ResultGetAvailiblePage}
 */
export function getAvailablePage(page, limit, total) {
    if (total === 0) {
        return {
            page: 1,
            isAvailable: true
        };
    }
    const totalPerLimit = Math.floor(total / limit);
    const availablePage = total % limit > 0 ? totalPerLimit + 1 : totalPerLimit;
    const result = {
        page: Math.abs(page > availablePage ? availablePage : page),
        isAvailable: !(page > availablePage || page <= 0)
    };
    return result;
}

export function formatMoney(num) {
    if (!num) return num;
    // return `${num.toLocaleString('en-UK').split('.')[0]}`;
    // console.log(num);
    // console.log(num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function formatNumber(num) {
    if (!num) return num;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}