/**
 * Main Application Entry Point
 * 主应用入口
 */

import { MODES, INTEGRATION_TYPES, PAYMENT_METHODS } from './config/modes.js';
import { getStepsForMode, getBtnLabelsForMode, getHintsForMode } from './config/steps.js';
import { setText, getValue, getRadioValue, show, hide, addClass, removeClass } from './utils/dom.js';
import { formatDate, getTimestamp, getPeriodUnitText, getPaymentMethodType, getComponentList, calculateActivateAmount } from './utils/formatter.js';

/**
 * Application State
 */
class AppState {
    constructor() {
        this.currentMode = MODES.PAYERMAX;
        this.currentStep = 0;
        this.pmComponent = null;
        this.pmComponentMerchant = null;
        this.pmComponentNonPeriodic = null;
        this.merchantPaymentMethodType = 'CARD';
    }

    getCurrentIntegration() {
        return getRadioValue('integration', INTEGRATION_TYPES.CASHIER);
    }

    getCurrentPayment() {
        return getRadioValue('payment', PAYMENT_METHODS.CARD);
    }

    getSteps() {
        return getStepsForMode(this.currentMode, this.getCurrentIntegration());
    }

    getBtnLabels() {
        return getBtnLabelsForMode(this.currentMode, this.getCurrentIntegration());
    }

    getHints() {
        return getHintsForMode(this.currentMode, this.getCurrentIntegration());
    }
}

/**
 * Application Controller
 */
class App {
    constructor() {
        this.state = new AppState();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderProgress();
        this.showPanel();
        this.renderActionBar();
        this.updateDynamic();
    }

    setupEventListeners() {
        // Mode selection
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleModeChange(e));
        });

        // Integration method selection
        document.querySelectorAll('input[name="integration"]').forEach(radio => {
            radio.addEventListener('change', () => this.handleIntegrationChange());
        });

        // Payment method selection
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', () => this.handlePaymentChange());
        });

        // Subscription type selection
        document.querySelectorAll('input[name="subtype"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateDynamic());
        });

        // Merchant bind type selection
        document.querySelectorAll('input[name="m-bindtype"]').forEach(radio => {
            radio.addEventListener('change', () => this.updateMerchantBindType());
        });
    }

    handleModeChange(e) {
        const card = e.currentTarget;
        const mode = card.getAttribute('onclick').match(/'([^']+)'/)[1];
        
        // Update UI
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Update state
        this.state.currentMode = mode;
        this.state.currentStep = 0;
        
        // Clean up components
        this.cleanupComponents();
        
        // Re-render
        this.init();
    }

    handleIntegrationChange() {
        if (!this.checkAPMComponentCompatibility()) {
            return;
        }

        // If currently on merchant mode step 2, just switch code blocks
        const steps = this.state.getSteps();
        if (this.state.currentMode === MODES.MERCHANT && steps[this.state.currentStep]?.id === 'm-2') {
            this.switchMerchantCodeBlocks();
            return;
        }

        // Otherwise reset to step 0
        this.state.currentStep = 0;
        this.cleanupComponents();
        this.init();
    }

    handlePaymentChange() {
        const integration = this.state.getCurrentIntegration();
        const payment = this.state.getCurrentPayment();

        // Check APM compatibility
        if (payment === PAYMENT_METHODS.APM && integration === INTEGRATION_TYPES.COMPONENT) {
            alert('APM 支付方式暂不支持前置组件集成方式，请选择其他支付方式或集成方式');
            document.querySelector('input[name="payment"][value="card"]').checked = true;
            return;
        }

        // Update merchant payment method type
        this.state.merchantPaymentMethodType = getPaymentMethodType(payment);
        this.updateDynamic();
    }

    checkAPMComponentCompatibility() {
        const integration = this.state.getCurrentIntegration();
        const payment = this.state.getCurrentPayment();

        if (payment === PAYMENT_METHODS.APM && integration === INTEGRATION_TYPES.COMPONENT) {
            alert('APM 支付方式暂不支持前置组件集成方式');
            document.querySelector('input[name="integration"][value="cashier"]').checked = true;
            return false;
        }
        return true;
    }

    cleanupComponents() {
        if (this.state.pmComponent) {
            try {
                this.state.pmComponent.unmount();
            } catch (e) {
                console.log('Component unmount error:', e);
            }
            this.state.pmComponent = null;
        }

        if (this.state.pmComponentMerchant) {
            try {
                this.state.pmComponentMerchant.unmount();
            } catch (e) {
                console.log('Merchant component unmount error:', e);
            }
            this.state.pmComponentMerchant = null;
        }

        if (this.state.pmComponentNonPeriodic) {
            try {
                this.state.pmComponentNonPeriodic.unmount();
            } catch (e) {
                console.log('NonPeriodic component unmount error:', e);
            }
            this.state.pmComponentNonPeriodic = null;
        }
    }

    renderProgress() {
        const steps = this.state.getSteps();
        const progressHeader = document.getElementById('progress-header');
        
        console.log('Rendering progress:', { steps, currentStep: this.state.currentStep });
        
        if (!progressHeader) {
            console.error('Progress header element not found!');
            return;
        }
        
        let html = '';
        steps.forEach((step, index) => {
            const status = index < this.state.currentStep ? 'completed' : 
                          index === this.state.currentStep ? 'active' : '';
            html += `
                <div class="prog-step ${status}">
                    <div class="prog-dot">${index + 1}</div>
                    <div class="prog-info">
                        <div class="prog-label">${step.label}</div>
                        <div class="prog-title">${step.title}</div>
                    </div>
                </div>
            `;
        });
        
        progressHeader.innerHTML = html;
        console.log('Progress rendered successfully');
    }

    showPanel() {
        const steps = this.state.getSteps();
        const currentPanelId = steps[this.state.currentStep]?.id;
        
        // Hide all panels
        document.querySelectorAll('.step-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Show current panel
        const currentPanel = document.getElementById(`panel-${currentPanelId}`);
        if (currentPanel) {
            currentPanel.classList.add('active');
        }
    }

    renderActionBar() {
        const steps = this.state.getSteps();
        const btnLabels = this.state.getBtnLabels();
        const hints = this.state.getHints();
        
        const actionBar = document.querySelector('.action-bar');
        if (!actionBar) return;
        
        const isLastStep = this.state.currentStep === steps.length - 1;
        const btnClass = isLastStep ? 'btn-success' : 'btn-primary';
        const btnLabel = btnLabels[this.state.currentStep] || '下一步';
        const hint = hints[this.state.currentStep] || '';
        
        actionBar.innerHTML = `
            <div class="action-hint">
                <span class="hint-icon">💡</span>
                <span>${hint}</span>
            </div>
            <div style="display:flex;gap:0.75rem;">
                ${this.state.currentStep > 0 ? '<button class="btn btn-ghost" onclick="app.goPrev()">← 上一步</button>' : ''}
                <button class="btn ${btnClass}" onclick="app.goNext()">${btnLabel}</button>
            </div>
        `;
    }

    goNext() {
        const steps = this.state.getSteps();
        if (this.state.currentStep < steps.length - 1) {
            this.state.currentStep++;
            this.renderProgress();
            this.showPanel();
            this.renderActionBar();
            this.updateDynamic();
            
            // Handle special cases for step transitions
            this.handleStepTransition();
        }
    }

    goPrev() {
        if (this.state.currentStep > 0) {
            this.state.currentStep--;
            this.renderProgress();
            this.showPanel();
            this.renderActionBar();
        }
    }

    handleStepTransition() {
        const steps = this.state.getSteps();
        const currentStepId = steps[this.state.currentStep]?.id;
        
        // PayerMax mode - step 2 (create subscription)
        if (this.state.currentMode === MODES.PAYERMAX && currentStepId === 'pm-2') {
            const subtype = getRadioValue('subtype', 'standard');
            setTimeout(() => {
                this.switchCreateTab(subtype, true);
            }, 50);
        }
        
        // Merchant mode - step 2 (bind payment)
        if (this.state.currentMode === MODES.MERCHANT && currentStepId === 'm-2') {
            setTimeout(() => {
                this.switchMerchantCodeBlocks();
            }, 50);
        }
    }

    switchCreateTab(type, autoSwitch = false) {
        // Hide all code blocks
        document.querySelectorAll('.create-code-standard, .create-code-trial, .create-code-discount, .create-code-trial-discount').forEach(block => {
            block.style.display = 'none';
        });
        
        // Show target code block
        const targetBlock = document.querySelector(`.create-code-${type}`);
        if (targetBlock) {
            targetBlock.style.display = 'block';
        }
    }

    switchMerchantCodeBlocks() {
        const integration = this.state.getCurrentIntegration();
        const cashierBlock = document.querySelector('.m-bind-code-cashier');
        const apiBlock = document.querySelector('.m-bind-code-api');
        
        if (cashierBlock && apiBlock) {
            if (integration === INTEGRATION_TYPES.API) {
                cashierBlock.style.display = 'none';
                apiBlock.style.display = 'block';
            } else {
                cashierBlock.style.display = 'block';
                apiBlock.style.display = 'none';
            }
        }
    }

    updateMerchantBindType() {
        const bindType = getRadioValue('m-bindtype', 'zero');
        const amountInput = document.getElementById('m-amount');
        
        if (amountInput) {
            if (bindType === 'zero') {
                amountInput.value = '0';
                amountInput.readOnly = true;
                amountInput.style.background = '#E5E7EB';
            } else {
                amountInput.value = '9.99';
                amountInput.readOnly = false;
                amountInput.style.background = '#FAFBFC';
            }
        }
        
        this.updateDynamic();
    }

    updateDynamic() {
        // Get all form values
        const totalPeriods = getValue('p-totalPeriods', '12');
        const periodCount = getValue('p-periodCount', '1');
        const periodUnit = getValue('p-periodUnit', 'M');
        const amount = getValue('p-amount', '9.99');
        const currency = getValue('p-currency', 'USD');
        const startDate = getValue('p-startDate', '');
        const subtype = getRadioValue('subtype', 'standard');
        const payment = this.state.getCurrentPayment();
        
        // Merchant mode parameters
        const mAmount = getValue('m-amount', '9.99');
        const mCurrency = getValue('m-currency', 'USD');
        const mSubject = getValue('m-subject', '代扣标题');
        const mUserId = getValue('m-userId', 'test1111111');
        
        // Show/hide conditional rows
        document.getElementById('trialDaysRow').style.display = subtype === 'trial' ? 'flex' : 'none';
        document.getElementById('discountParamsRow').style.display = subtype === 'discount' ? 'block' : 'none';
        document.getElementById('trialDiscountParamsRow').style.display = subtype === 'trial-discount' ? 'block' : 'none';
        
        // Update PayerMax step 2 - subscriptionCreate
        setText('c-totalPeriods', totalPeriods);
        setText('c-periodUnit', periodUnit);
        setText('c-periodCount', periodCount);
        setText('c-amount', amount);
        setText('c-currency', currency);
        setText('c-startDate', formatDate(startDate));
        
        // Update PayerMax step 3 - orderAndPay activate
        const trialAmountCombo = getValue('p-trialAmount-combo', '0.99');
        const activateAmount = calculateActivateAmount(subtype, amount, trialAmountCombo);
        setText('a-amount', activateAmount);
        setText('a-currency', currency);
        setText('a-paymentMethodType', getPaymentMethodType(payment));
        
        // Update PayerMax step 4 - Webhook
        setText('w-amount', amount);
        setText('w-currency', currency);
        
        // Update completion summary
        setText('f-cycle', `每 ${periodCount} ${getPeriodUnitText(periodUnit)} · 共 ${totalPeriods} 期`);
        setText('f-amount', `${currency} ${amount}`);
        setText('f-startDate', startDate ? startDate.replace('T', ' ') : '—');
        
        // Update Merchant step 2 - bind orderAndPay
        setText('m-bind-amount', mAmount);
        setText('m-bind-currency', mCurrency);
        setText('m-bind-subject', mSubject);
        setText('m-bind-userId', mUserId);
        setText('m-tradeNo', getTimestamp());
        
        setText('m-bind-amount-api', mAmount);
        setText('m-bind-currency-api', mCurrency);
        setText('m-bind-subject-api', mSubject);
        setText('m-bind-userId-api', mUserId);
        setText('m-tradeNo-api', getTimestamp());
        
        setText('m-bind-paymentMethodType', this.state.merchantPaymentMethodType);
        setText('m-bind-paymentMethodType-api', this.state.merchantPaymentMethodType);
        
        // Update Merchant step 3 - deduct orderAndPay
        setText('m-dedAmount', mAmount);
        setText('m-dedCurrency', mCurrency);
        setText('m-dedTotalPeriods', totalPeriods);
        setText('m-dedTradeNo', getTimestamp());
        setText('m-dedSubNo', getTimestamp());
        setText('m-dedDeductNo', getTimestamp() + 2);
        setText('m-dedResAmt', mAmount);
        setText('m-dedResCur', mCurrency);
        setText('m-deduct-paymentMethodType', this.state.merchantPaymentMethodType);
        
        // Update component session request
        setText('s-componentList', getComponentList(payment));
        setText('s-amount', activateAmount);
        setText('s-currency', currency);
        
        setText('sm-componentList', getComponentList(payment));
        setText('sm-amount', mAmount);
        setText('sm-currency', mCurrency);
        
        // Non-periodic mode
        const npAmount = getValue('np-amount', '9.99');
        const npCurrency = getValue('np-currency', 'USD');
        setText('snp-componentList', getComponentList(payment));
        setText('snp-amount', npAmount);
        setText('snp-currency', npCurrency);
        
        // Auto-switch code blocks if needed
        const steps = this.state.getSteps();
        if (this.state.currentMode === MODES.PAYERMAX && steps[this.state.currentStep]?.id === 'pm-2') {
            this.switchCreateTab(subtype, true);
        }
        
        if (this.state.currentMode === MODES.MERCHANT && steps[this.state.currentStep]?.id === 'm-2') {
            this.switchMerchantCodeBlocks();
        }
    }

    resetAll() {
        this.state.currentStep = 0;
        this.cleanupComponents();
        this.init();
    }
}

// Initialize app when DOM is ready
let app;

function initializeApp() {
    console.log('Initializing app...');
    app = new App();
    window.app = app; // Make app globally accessible for onclick handlers
    console.log('App initialized successfully');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

export default App;
