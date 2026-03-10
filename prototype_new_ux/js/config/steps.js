/**
 * Step Configuration for Different Modes
 * 不同业务模式的步骤配置
 */

import { MODES, INTEGRATION_TYPES } from './modes.js';

/**
 * Get steps configuration for a specific mode and integration type
 * @param {string} mode - Business mode
 * @param {string} integration - Integration type
 * @returns {Array} Steps configuration
 */
export function getStepsForMode(mode, integration) {
    if (mode === MODES.PAYERMAX) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                { id: 'pm-1', label: 'Step 1', title: '配置订阅参数' },
                { id: 'pm-2', label: 'Step 2', title: '创建订阅计划' },
                { id: 'pm-3-component', label: 'Step 3', title: '加载前置组件' },
                { id: 'pm-4', label: 'Step 4', title: '完成订阅激活' }
            ];
        } else {
            return [
                { id: 'pm-1', label: 'Step 1', title: '配置订阅参数' },
                { id: 'pm-2', label: 'Step 2', title: '创建订阅计划' },
                { id: 'pm-3', label: 'Step 3', title: '激活订阅' },
                { id: 'pm-4', label: 'Step 4', title: '完成订阅激活' }
            ];
        }
    } else if (mode === MODES.MERCHANT) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                { id: 'm-1', label: 'Step 1', title: '配置绑定参数' },
                { id: 'm-2-component', label: 'Step 2', title: '加载前置组件' },
                { id: 'm-3', label: 'Step 3', title: '后续发起扣款' }
            ];
        } else {
            return [
                { id: 'm-1', label: 'Step 1', title: '配置绑定参数' },
                { id: 'm-2', label: 'Step 2', title: '首次绑定支付方式' },
                { id: 'm-3', label: 'Step 3', title: '后续发起扣款' }
            ];
        }
    } else if (mode === MODES.NONPERIODIC) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                { id: 'np-1', label: 'Step 1', title: '收集用户业务数据' },
                { id: 'np-2-component', label: 'Step 2', title: '加载前置组件' },
                { id: 'np-3', label: 'Step 3', title: '后续发起扣款' }
            ];
        } else {
            return [
                { id: 'np-1', label: 'Step 1', title: '收集用户业务数据' },
                { id: 'np-2', label: 'Step 2', title: '首次绑定支付方式' },
                { id: 'np-3', label: 'Step 3', title: '后续发起扣款' }
            ];
        }
    }
    return [];
}

/**
 * Get button labels for a specific mode and integration type
 * @param {string} mode - Business mode
 * @param {string} integration - Integration type
 * @returns {Array} Button labels
 */
export function getBtnLabelsForMode(mode, integration) {
    if (mode === MODES.PAYERMAX) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return ['下一步：创建订阅计划', '下一步：加载前置组件', '下一步：完成激活', '完成'];
        } else {
            return ['下一步：创建订阅计划', '下一步：激活订阅', '下一步：完成激活', '完成'];
        }
    } else if (mode === MODES.MERCHANT) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return ['下一步：加载前置组件', '下一步：后续扣款', '完成'];
        } else {
            return ['下一步：首次绑定', '下一步：后续扣款', '完成'];
        }
    } else if (mode === MODES.NONPERIODIC) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return ['下一步：加载前置组件', '下一步：后续扣款', '完成'];
        } else {
            return ['下一步：首次绑定', '下一步：后续扣款', '完成'];
        }
    }
    return [];
}

/**
 * Get hint messages for a specific mode and integration type
 * @param {string} mode - Business mode
 * @param {string} integration - Integration type
 * @returns {Array} Hint messages
 */
export function getHintsForMode(mode, integration) {
    if (mode === MODES.PAYERMAX) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                '💡 配置订阅计划的基本参数',
                '💡 调用 subscriptionCreate API 创建订阅计划',
                '💡 使用前置组件完成支付方式绑定',
                '✅ 订阅激活成功，PayerMax 将按周期自动扣款'
            ];
        } else {
            return [
                '💡 配置订阅计划的基本参数',
                '💡 调用 subscriptionCreate API 创建订阅计划',
                '💡 调用 orderAndPay API 激活订阅',
                '✅ 订阅激活成功，PayerMax 将按周期自动扣款'
            ];
        }
    } else if (mode === MODES.MERCHANT) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                '💡 配置首次绑定的订单参数',
                '💡 使用前置组件完成支付方式绑定',
                '💡 商户自主决定扣款时机和金额'
            ];
        } else {
            return [
                '💡 配置首次绑定的订单参数',
                '💡 调用 orderAndPay API 完成首次绑定',
                '💡 商户自主决定扣款时机和金额'
            ];
        }
    } else if (mode === MODES.NONPERIODIC) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                '💡 收集本次绑定/支付的订单参数',
                '💡 使用前置组件完成支付方式绑定',
                '💡 商户按业务需求灵活发起扣款'
            ];
        } else {
            return [
                '💡 收集本次绑定/支付的订单参数',
                '💡 调用 orderAndPay API 完成首次绑定',
                '💡 商户按业务需求灵活发起扣款'
            ];
        }
    }
    return [];
}
