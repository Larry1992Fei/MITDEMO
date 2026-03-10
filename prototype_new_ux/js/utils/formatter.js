/**
 * Data Formatting Utility Functions
 * 数据格式化工具函数
 */

/**
 * Format date to ISO string with timezone
 * @param {string} dateStr - Date string from input
 * @returns {string} Formatted date string
 */
export function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toISOString().replace('Z', '+08:00');
    } catch (e) {
        return '—';
    }
}

/**
 * Get current timestamp
 * @returns {number} Current timestamp
 */
export function getTimestamp() {
    return Date.now();
}

/**
 * Map period unit to Chinese
 * @param {string} unit - Period unit (D/W/M/Y)
 * @returns {string} Chinese unit
 */
export function getPeriodUnitText(unit) {
    const unitMap = {
        'D': '日',
        'W': '周',
        'M': '月',
        'Y': '年'
    };
    return unitMap[unit] || unit;
}

/**
 * Map payment method to PayerMax format
 * @param {string} payment - Payment method
 * @returns {string} PayerMax payment method type
 */
export function getPaymentMethodType(payment) {
    const paymentMethodTypeMap = {
        'card': 'CARD',
        'applepay': 'APPLEPAY',
        'googlepay': 'GOOGLEPAY',
        'apm': 'ONE_TOUCH'
    };
    return paymentMethodTypeMap[payment] || 'CARD';
}

/**
 * Get component list based on payment method
 * @param {string} payment - Payment method
 * @returns {string} Component list string
 */
export function getComponentList(payment) {
    if (payment === 'card') {
        return '"CARD", "APPLEPAY", "GOOGLEPAY"';
    } else if (payment === 'applepay') {
        return '"APPLEPAY"';
    } else if (payment === 'googlepay') {
        return '"GOOGLEPAY"';
    }
    return '"CARD"';
}

/**
 * Calculate activate amount based on subscription type
 * @param {string} subtype - Subscription type
 * @param {string} amount - Regular amount
 * @param {string} trialAmount - Trial amount
 * @returns {string} Activate amount
 */
export function calculateActivateAmount(subtype, amount, trialAmount) {
    if (subtype === 'trial') {
        return '0'; // Free trial
    } else if (subtype === 'trial-discount') {
        return trialAmount || '0.99';
    }
    return amount;
}
