/**
 * Business Mode Configuration
 * 业务模式配置
 */

export const MODES = {
    PAYERMAX: 'payermax',
    MERCHANT: 'merchant',
    NONPERIODIC: 'nonperiodic'
};

export const MODE_CONFIG = {
    [MODES.PAYERMAX]: {
        id: 'payermax',
        name: 'PayerMax托管（周期性订阅）',
        description: 'PayerMax管理订阅计划与扣款周期'
    },
    [MODES.MERCHANT]: {
        id: 'merchant',
        name: '商户自管（周期性订阅）',
        description: '商户自主管理订阅计划与扣款时机'
    },
    [MODES.NONPERIODIC]: {
        id: 'nonperiodic',
        name: '非周期性订阅代扣',
        description: '商户按业务需求灵活发起扣款'
    }
};

export const INTEGRATION_TYPES = {
    CASHIER: 'cashier',
    API: 'api',
    COMPONENT: 'component'
};

export const PAYMENT_METHODS = {
    CARD: 'card',
    APPLEPAY: 'applepay',
    GOOGLEPAY: 'googlepay',
    APM: 'apm'
};

export const SUBSCRIPTION_TYPES = {
    STANDARD: 'standard',
    TRIAL: 'trial',
    DISCOUNT: 'discount',
    TRIAL_DISCOUNT: 'trial-discount'
};
