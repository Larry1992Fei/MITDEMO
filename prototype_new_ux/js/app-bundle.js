/**
 * Bundled Application - All modules combined for direct file access
 * 合并版应用 - 所有模块合并，支持直接文件访问
 */

// ==================== CONFIG: MODES ====================
const MODES = {
    PAYERMAX: 'payermax',
    MERCHANT: 'merchant',
    NONPERIODIC: 'nonperiodic'
};

const MODE_CONFIG = {
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

const INTEGRATION_TYPES = {
    CASHIER: 'cashier',
    API: 'api',
    COMPONENT: 'component'
};

const PAYMENT_METHODS = {
    CARD: 'card',
    APPLEPAY: 'applepay',
    GOOGLEPAY: 'googlepay',
    APM: 'apm'
};

const SUBSCRIPTION_TYPES = {
    STANDARD: 'standard',
    TRIAL: 'trial',
    DISCOUNT: 'discount',
    TRIAL_DISCOUNT: 'trial-discount'
};

// ==================== CONFIG: STEPS ====================
function getStepsForMode(mode, integration) {
    if (mode === MODES.PAYERMAX) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                { id: 'pm-1', label: 'Step 1', title: '配置订阅参数' },
                { id: 'pm-2', label: 'Step 2', title: '创建订阅计划' },
                { id: 'pm-3-component', label: 'Step 3', title: '加载前置组件' },
                { id: 'pm-4-bind', label: 'Step 4', title: '后端支付方式绑定' },
                { id: 'pm-5', label: 'Step 5', title: '完成订阅激活' }
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
                { id: 'm-3-bind', label: 'Step 3', title: '后端支付方式绑定' },
                { id: 'm-3', label: 'Step 4', title: '后续发起扣款' }
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
                { id: 'np-3-bind', label: 'Step 3', title: '后端支付方式绑定' },
                { id: 'np-4', label: 'Step 4', title: '后续发起扣款' }
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

function getBtnLabelsForMode(mode, integration) {
    if (mode === MODES.PAYERMAX) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return ['下一步：创建订阅计划', '下一步：加载前置组件', '下一步：后端支付绑定', '下一步：完成激活', '完成'];
        } else {
            return ['下一步：创建订阅计划', '下一步：激活订阅', '下一步：完成激活', '完成'];
        }
    } else if (mode === MODES.MERCHANT) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return ['下一步：加载前置组件', '下一步：完成支付绑定', '下一步：后续扣款', '完成'];
        } else {
            return ['下一步：首次绑定', '下一步：后续扣款', '完成'];
        }
    } else if (mode === MODES.NONPERIODIC) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return ['下一步：加载前置组件', '下一步：完成支付绑定', '下一步：后续扣款', '完成'];
        } else {
            return ['下一步：首次绑定', '下一步：后续扣款', '完成'];
        }
    }
    return [];
}

function getHintsForMode(mode, integration) {
    if (mode === MODES.PAYERMAX) {
        if (integration === INTEGRATION_TYPES.COMPONENT) {
            return [
                '💡 配置订阅计划的基本参数',
                '💡 调用 subscriptionCreate API 创建订阅计划',
                '💡 使用前置组件完成支付方式绑定',
                '💡 调用 orderAndPay API 完成后端支付绑定',
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
                '💡 使用前置组件获取 paymentToken',
                '💡 调用 orderAndPay API 完成支付绑定',
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
                '💡 使用前置组件获取 paymentToken',
                '💡 调用 orderAndPay API 完成支付绑定',
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

// ==================== UTILS: DOM ====================
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

function getValue(id, defaultValue = '') {
    const el = document.getElementById(id);
    return el ? el.value : defaultValue;
}

function getRadioValue(name, defaultValue = '') {
    const radio = document.querySelector(`input[name="${name}"]:checked`);
    return radio ? radio.value : defaultValue;
}

// ==================== UTILS: FORMATTER ====================
function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toISOString().replace('Z', '+08:00');
    } catch (e) {
        return '—';
    }
}

function getTimestamp() {
    return Date.now();
}

function getPeriodUnitText(unit) {
    const unitMap = {
        'D': '日',
        'W': '周',
        'M': '月',
        'Y': '年'
    };
    return unitMap[unit] || unit;
}

function getPaymentMethodType(payment) {
    const paymentMethodTypeMap = {
        'card': 'CARD',
        'applepay': 'APPLEPAY',
        'googlepay': 'GOOGLEPAY',
        'apm': 'ONE_TOUCH'
    };
    return paymentMethodTypeMap[payment] || 'CARD';
}

function getComponentList(payment) {
    if (payment === 'card') {
        return '"CARD", "APPLEPAY", "GOOGLEPAY"';
    } else if (payment === 'applepay') {
        return '"APPLEPAY"';
    } else if (payment === 'googlepay') {
        return '"GOOGLEPAY"';
    }
    return '"CARD"';
}

function calculateActivateAmount(subtype, amount, trialAmount) {
    if (subtype === 'trial') {
        return '0';
    } else if (subtype === 'trial-discount') {
        return trialAmount || '0.99';
    }
    return amount;
}

// ==================== APPLICATION ====================
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

class App {
    constructor() {
        this.state = new AppState();
        console.log('App constructor called');
        this.init();
    }

    init() {
        console.log('App init called');
        this.setupEventListeners();
        this.renderProgress();
        this.renderParamFlowBar();
        this.showPanel();
        this.renderActionBar();
        this.updateDynamic();
        this.renderParamCards();
        this.highlightCodeParams();
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
        const merchantBindTypeRadios = document.querySelectorAll('input[name="m-bindtype"]');
        if (merchantBindTypeRadios.length > 0) {
            merchantBindTypeRadios.forEach(radio => {
                radio.addEventListener('change', () => this.updateMerchantBindType());
            });
        }
    }

    handleModeChange(e) {
        const card = e.currentTarget;
        const modeCards = document.querySelectorAll('.mode-card');
        
        // Find which mode was clicked
        let mode = MODES.PAYERMAX;
        modeCards.forEach((c, index) => {
            if (c === card) {
                if (index === 0) mode = MODES.PAYERMAX;
                else if (index === 1) mode = MODES.MERCHANT;
                else if (index === 2) mode = MODES.NONPERIODIC;
            }
        });
        
        // Update UI
        modeCards.forEach(c => c.classList.remove('active'));
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
        
        // Switch PayerMax component code blocks if on the right step
        const steps = this.state.getSteps();
        if (this.state.currentMode === MODES.PAYERMAX && steps[this.state.currentStep]?.id === 'pm-4-bind') {
            this.switchPayerMaxComponentCodeBlocks();
        }
        
        // Switch NonPeriodic component code blocks if on the right step
        if (this.state.currentMode === MODES.NONPERIODIC && steps[this.state.currentStep]?.id === 'np-3-bind') {
            this.switchNonPeriodicComponentCodeBlocks();
        }
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
        
        // Handle special panel display logic
        if (currentPanelId === 'pm-4-bind') {
            // Ensure code blocks are properly displayed for PayerMax component step
            setTimeout(() => {
                this.switchPayerMaxComponentCodeBlocks();
            }, 100);
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
                ${this.state.currentStep > 0 ? '<button class="btn btn-ghost" onclick="window.app.goPrev()">← 上一步</button>' : ''}
                <button class="btn ${btnClass}" onclick="window.app.goNext()">${btnLabel}</button>
            </div>
        `;
    }

    goNext() {
        const steps = this.state.getSteps();
        if (this.state.currentStep < steps.length - 1) {
            // 显示参数传递动画
            const currentStepData = this.getCurrentStepParamData();
            if (currentStepData.output && currentStepData.output.length > 0) {
                const paramName = currentStepData.output[0].key;
                this.showStepConnector(this.state.currentStep, this.state.currentStep + 1, paramName);
            }
            
            this.state.currentStep++;
            this.renderProgress();
            this.renderParamFlowBar();
            this.showPanel();
            this.renderActionBar();
            this.updateDynamic();
            
            // 延迟渲染参数卡片和高亮，让步骤切换动画先完成
            setTimeout(() => {
                this.renderParamCards();
                this.highlightCodeParams();
            }, 100);
            
            // Handle special cases for step transitions
            this.handleStepTransition();
        }
    }

    goPrev() {
        if (this.state.currentStep > 0) {
            this.state.currentStep--;
            this.renderProgress();
            this.renderParamFlowBar();
            this.showPanel();
            this.renderActionBar();
            this.renderParamCards();
            this.highlightCodeParams();
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
        
        // PayerMax mode - step 4-bind (component activation)
        if (this.state.currentMode === MODES.PAYERMAX && currentStepId === 'pm-4-bind') {
            setTimeout(() => {
                this.switchPayerMaxComponentCodeBlocks();
            }, 50);
        }
        
        // NonPeriodic mode - step 3-bind (component activation)
        if (this.state.currentMode === MODES.NONPERIODIC && currentStepId === 'np-3-bind') {
            setTimeout(() => {
                this.switchNonPeriodicComponentCodeBlocks();
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

    switchPayerMaxComponentCodeBlocks() {
        const payment = this.state.getCurrentPayment();
        console.log('switchPayerMaxComponentCodeBlocks called, payment:', payment);
        
        const cardBlock = document.getElementById('pm-component-card-request');
        const applePayBlock = document.getElementById('pm-component-applepay-request');
        const googlePayBlock = document.getElementById('pm-component-googlepay-request');
        
        console.log('Blocks found:', {
            cardBlock: !!cardBlock,
            applePayBlock: !!applePayBlock,
            googlePayBlock: !!googlePayBlock
        });
        
        // Hide all blocks first
        if (cardBlock) {
            cardBlock.style.display = 'none';
            console.log('Hidden CARD block');
        }
        if (applePayBlock) {
            applePayBlock.style.display = 'none';
            console.log('Hidden ApplePay block');
        }
        if (googlePayBlock) {
            googlePayBlock.style.display = 'none';
            console.log('Hidden GooglePay block');
        }
        
        // Show the appropriate block based on payment method
        if (payment === 'applepay' && applePayBlock) {
            console.log('Showing ApplePay block');
            applePayBlock.style.display = 'block';
        } else if (payment === 'googlepay' && googlePayBlock) {
            console.log('Showing GooglePay block');
            googlePayBlock.style.display = 'block';
        } else if (cardBlock) {
            console.log('Showing CARD block (default)');
            cardBlock.style.display = 'block';
        } else {
            console.error('No code block found to display!');
        }
    }

    switchNonPeriodicComponentCodeBlocks() {
        const payment = this.state.getCurrentPayment();
        console.log('switchNonPeriodicComponentCodeBlocks called, payment:', payment);
        
        const cardBlock = document.getElementById('np-component-card-request');
        const applePayBlock = document.getElementById('np-component-applepay-request');
        const googlePayBlock = document.getElementById('np-component-googlepay-request');
        
        console.log('NonPeriodic blocks found:', {
            cardBlock: !!cardBlock,
            applePayBlock: !!applePayBlock,
            googlePayBlock: !!googlePayBlock
        });
        
        // Hide all blocks first
        if (cardBlock) {
            cardBlock.style.display = 'none';
            console.log('Hidden NonPeriodic CARD block');
        }
        if (applePayBlock) {
            applePayBlock.style.display = 'none';
            console.log('Hidden NonPeriodic ApplePay block');
        }
        if (googlePayBlock) {
            googlePayBlock.style.display = 'none';
            console.log('Hidden NonPeriodic GooglePay block');
        }
        
        // Show the appropriate block based on payment method
        if (payment === 'applepay' && applePayBlock) {
            console.log('Showing NonPeriodic ApplePay block');
            applePayBlock.style.display = 'block';
        } else if (payment === 'googlepay' && googlePayBlock) {
            console.log('Showing NonPeriodic GooglePay block');
            googlePayBlock.style.display = 'block';
        } else if (cardBlock) {
            console.log('Showing NonPeriodic CARD block (default)');
            cardBlock.style.display = 'block';
        } else {
            console.error('No NonPeriodic code block found to display!');
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
        let startDate = getValue('p-startDate', '');
        const subtype = getRadioValue('subtype', 'standard');
        const payment = this.state.getCurrentPayment();
        
        // Auto-calculate start date if empty
        if (!startDate) {
            const now = new Date();
            if (subtype === 'trial') {
                // N天试用：当前时间 + 试用天数
                const trialDays = parseInt(getValue('p-trialDays', '7'));
                now.setDate(now.getDate() + trialDays);
            } else {
                // 其他模式（包括N天试用+前N期优惠）：当前时间 + 2小时
                now.setHours(now.getHours() + 2);
            }
            
            // Format to datetime-local format (YYYY-MM-DDTHH:MM)
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            startDate = `${year}-${month}-${day}T${hours}:${minutes}`;
            
            // Update the input field
            const startDateInput = document.getElementById('p-startDate');
            if (startDateInput) {
                startDateInput.value = startDate;
            }
        }
        
        // Merchant mode parameters
        const mAmount = getValue('m-amount', '9.99');
        const mCurrency = getValue('m-currency', 'USD');
        const mSubject = getValue('m-subject', '代扣标题');
        const mUserId = getValue('m-userId', 'test1111111');
        
        // Show/hide conditional rows
        const trialDaysRow = document.getElementById('trialDaysRow');
        const discountParamsRow = document.getElementById('discountParamsRow');
        const trialDiscountParamsRow = document.getElementById('trialDiscountParamsRow');
        
        if (trialDaysRow) trialDaysRow.style.display = subtype === 'trial' ? 'flex' : 'none';
        if (discountParamsRow) discountParamsRow.style.display = subtype === 'discount' ? 'block' : 'none';
        if (trialDiscountParamsRow) trialDiscountParamsRow.style.display = subtype === 'trial-discount' ? 'block' : 'none';
        
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
        
        // Update PayerMax step 4 - Component bind orderAndPay
        setText('pm-comp-amount', activateAmount);
        setText('pm-comp-currency', currency);
        
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
        
        // Update Merchant step 3-bind - component bind orderAndPay
        setText('m-component-tradeNo', getTimestamp());
        setText('m-component-subject', mSubject);
        setText('m-component-amount', mAmount);
        setText('m-component-currency', mCurrency);
        setText('m-component-userId', mUserId);
        
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
        
        // Update NonPeriodic step 3-bind - component bind orderAndPay
        setText('np-comp-amount', npAmount);
        setText('np-comp-currency', npCurrency);
        
        // Update NonPeriodic step 3-bind - Webhook
        setText('np-w-amount', npAmount);
        setText('np-w-currency', npCurrency);
        setText('np-w-tokenId', getTimestamp());
        
        // Update NonPeriodic step 3 (non-component) - deduct parameters
        setText('np-ded-tradeNo-noncomp', getTimestamp());
        setText('np-ded-subject-noncomp', getValue('np-subject', '代扣标题'));
        setText('np-ded-amount-noncomp', npAmount);
        setText('np-ded-currency-noncomp', npCurrency);
        setText('np-ded-userId-noncomp', getValue('np-userId', 'test1111111'));
        
        // Update NonPeriodic step 4 (component) - deduct parameters
        setText('np-ded-tradeNo', getTimestamp());
        setText('np-ded-subject', getValue('np-subject', '代扣标题'));
        setText('np-ded-amount', npAmount);
        setText('np-ded-currency', npCurrency);
        setText('np-ded-userId', getValue('np-userId', 'test1111111'));
        
        // Auto-switch code blocks if needed
        const steps = this.state.getSteps();
        if (this.state.currentMode === MODES.PAYERMAX && steps[this.state.currentStep]?.id === 'pm-2') {
            this.switchCreateTab(subtype, true);
        }
        
        if (this.state.currentMode === MODES.MERCHANT && steps[this.state.currentStep]?.id === 'm-2') {
            this.switchMerchantCodeBlocks();
        }
        
        if (this.state.currentMode === MODES.PAYERMAX && steps[this.state.currentStep]?.id === 'pm-4-bind') {
            this.switchPayerMaxComponentCodeBlocks();
        }
        
        if (this.state.currentMode === MODES.NONPERIODIC && steps[this.state.currentStep]?.id === 'np-3-bind') {
            this.switchNonPeriodicComponentCodeBlocks();
        }
        
        // 更新参数卡片
        this.renderParamCards();
        this.highlightCodeParams();
    }

    resetAll() {
        this.state.currentStep = 0;
        this.cleanupComponents();
        this.init();
    }

    // ==================== PARAMETER GUIDANCE METHODS ====================
    
    renderParamFlowBar() {
        const steps = this.state.getSteps();
        const flowBar = document.getElementById('param-flow-bar');
        
        if (!flowBar) return;
        
        const paramFlowData = this.getParamFlowData();
        
        let html = '<div class="param-flow-steps">';
        steps.forEach((step, index) => {
            const status = index < this.state.currentStep ? 'completed' : 
                          index === this.state.currentStep ? 'active' : '';
            const paramInfo = paramFlowData[index] || {};
            
            html += `
                <div class="param-flow-step ${status}">
                    <div class="param-flow-dot">${index + 1}</div>
                    <div class="param-flow-label">
                        ${step.title}
                        ${paramInfo.output ? `<br><small>${paramInfo.output}</small>` : ''}
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        flowBar.innerHTML = html;
    }
    
    getParamFlowData() {
        const mode = this.state.currentMode;
        const integration = this.state.getCurrentIntegration();
        
        if (mode === MODES.PAYERMAX && integration === INTEGRATION_TYPES.COMPONENT) {
            return {
                0: { output: '订阅参数' },
                1: { output: 'subscriptionNo' },
                2: { output: 'paymentToken' },
                3: { output: 'paymentTokenID' },
                4: { output: '激活完成' }
            };
        } else if (mode === MODES.PAYERMAX) {
            return {
                0: { output: '订阅参数' },
                1: { output: 'subscriptionNo' },
                2: { output: 'paymentTokenID' },
                3: { output: '激活完成' }
            };
        } else if (mode === MODES.MERCHANT && integration === INTEGRATION_TYPES.COMPONENT) {
            return {
                0: { output: '绑定参数' },
                1: { output: 'paymentToken' },
                2: { output: 'paymentTokenID' },
                3: { output: '扣款完成' }
            };
        }
        
        return {};
    }
    
    renderParamCards() {
        const container = document.getElementById('param-cards-container');
        if (!container) return;
        
        const currentStepData = this.getCurrentStepParamData();
        
        let html = '';
        
        // 输入参数卡片
        if (currentStepData.input && currentStepData.input.length > 0) {
            html += this.createParamCard('input', '输入参数', '📥', currentStepData.input);
        }
        
        // 输出参数卡片
        if (currentStepData.output && currentStepData.output.length > 0) {
            html += this.createParamCard('output', '输出参数', '📤', currentStepData.output);
        }
        
        container.innerHTML = html;
    }
    
    createParamCard(type, title, icon, params) {
        const statusClass = type === 'input' ? 'ready' : 'pending';
        const statusText = type === 'input' ? '✓' : '⏳';
        
        let paramsHtml = '';
        params.forEach(param => {
            const value = this.getParamValue(param.key) || param.defaultValue || '—';
            paramsHtml += `
                <div class="param-item">
                    <span class="param-key">${param.key}:</span>
                    <span class="param-value ${param.highlight ? 'highlight' : ''}">${value}</span>
                </div>
            `;
        });
        
        return `
            <div class="param-card ${type}">
                <div class="param-card-header">
                    <span class="param-icon">${icon}</span>
                    <span class="param-title">${title}</span>
                    <span class="param-status ${statusClass}">${statusText}</span>
                </div>
                <div class="param-card-body">
                    ${paramsHtml}
                </div>
            </div>
        `;
    }
    
    getCurrentStepParamData() {
        const steps = this.state.getSteps();
        const currentStepId = steps[this.state.currentStep]?.id;
        const mode = this.state.currentMode;
        const integration = this.state.getCurrentIntegration();
        
        // PayerMax + Component 模式
        if (mode === MODES.PAYERMAX && integration === INTEGRATION_TYPES.COMPONENT) {
            switch (currentStepId) {
                case 'pm-1':
                    return {
                        output: [
                            { key: 'totalPeriods', highlight: true },
                            { key: 'amount', highlight: true },
                            { key: 'currency', highlight: true },
                            { key: 'periodUnit', highlight: true }
                        ]
                    };
                case 'pm-2':
                    return {
                        input: [
                            { key: 'totalPeriods' },
                            { key: 'amount' },
                            { key: 'currency' },
                            { key: 'periodUnit' }
                        ],
                        output: [
                            { key: 'subscriptionNo', defaultValue: 'SUB2026XXXxxxxxx2112', highlight: true }
                        ]
                    };
                case 'pm-3-component':
                    return {
                        input: [
                            { key: 'subscriptionNo', defaultValue: 'SUB2026XXXxxxxxx2112' }
                        ],
                        output: [
                            { key: 'paymentToken', defaultValue: 'CPT4f200d278f3a454b...', highlight: true },
                            { key: 'sessionKey', defaultValue: 'bdsf8982348974hhf...', highlight: true }
                        ]
                    };
                case 'pm-4-bind':
                    return {
                        input: [
                            { key: 'paymentToken', defaultValue: 'CPT4f200d278f3a454b...' },
                            { key: 'sessionKey', defaultValue: 'bdsf8982348974hhf...' },
                            { key: 'subscriptionNo', defaultValue: 'SUB2026XXXxxxxxx2112' }
                        ],
                        output: [
                            { key: 'paymentTokenID', defaultValue: 'PTI_20260310_001', highlight: true }
                        ]
                    };
                case 'pm-5':
                    return {
                        input: [
                            { key: 'paymentTokenID', defaultValue: 'PTI_20260310_001' }
                        ]
                    };
            }
        }
        
        return { input: [], output: [] };
    }
    
    getParamValue(key) {
        switch (key) {
            case 'totalPeriods':
                return getValue('p-totalPeriods', '12');
            case 'amount':
                return getValue('p-amount', '9.99');
            case 'currency':
                return getValue('p-currency', 'USD');
            case 'periodUnit':
                return getValue('p-periodUnit', 'M');
            default:
                return null;
        }
    }
    
    showStepConnector(fromStep, toStep, paramName) {
        const connector = document.getElementById('step-connector');
        const connectorLine = document.getElementById('connector-line');
        const connectorText = document.getElementById('connector-text');
        
        if (!connector) return;
        
        connector.style.display = 'flex';
        connectorLine.classList.add('active');
        connectorText.textContent = paramName;
        
        // 3秒后隐藏
        setTimeout(() => {
            connector.style.display = 'none';
            connectorLine.classList.remove('active');
        }, 3000);
    }
    
    highlightCodeParams() {
        // 在代码块中高亮显示来自上一步的参数
        const steps = this.state.getSteps();
        const currentStepId = steps[this.state.currentStep]?.id;
        
        // 移除之前的高亮
        document.querySelectorAll('.param-highlight').forEach(el => {
            el.classList.remove('param-highlight', 'from-previous');
        });
        
        // 根据当前步骤添加高亮
        if (currentStepId === 'pm-2') {
            this.highlightInCodeBlock(['totalPeriods', 'amount', 'currency', 'periodUnit']);
        } else if (currentStepId === 'pm-4-bind') {
            this.highlightInCodeBlock(['paymentToken', 'sessionKey'], 'from-previous');
        }
    }
    
    highlightInCodeBlock(paramNames, className = '') {
        paramNames.forEach(paramName => {
            // 查找代码块中的参数
            const codeElements = document.querySelectorAll('.code-body');
            codeElements.forEach(codeEl => {
                const content = codeEl.innerHTML;
                const regex = new RegExp(`("${paramName}"[^,}]+)`, 'g');
                const newContent = content.replace(regex, `<span class="param-highlight ${className}">$1</span>`);
                if (newContent !== content) {
                    codeEl.innerHTML = newContent;
                }
            });
        });
    }
}

// Initialize app when DOM is ready
let app;

function initializeApp() {
    console.log('Initializing app...');
    app = new App();
    window.app = app;
    console.log('App initialized successfully');
}

// Global test function for debugging
window.testCodeBlockSwitch = function(paymentMethod) {
    console.log('Testing code block switch for:', paymentMethod);
    if (app && app.switchPayerMaxComponentCodeBlocks) {
        // Temporarily set payment method
        const originalPayment = document.querySelector('input[name="payment"]:checked');
        const testPayment = document.querySelector(`input[name="payment"][value="${paymentMethod}"]`);
        if (testPayment) {
            testPayment.checked = true;
            app.switchPayerMaxComponentCodeBlocks();
            // Restore original selection
            if (originalPayment) {
                originalPayment.checked = true;
            }
        }
    } else {
        console.error('App or function not available');
    }
};

// Global function to navigate directly to STEP4 for testing
window.goToStep4 = function() {
    console.log('Navigating to STEP4 for testing...');
    if (app) {
        // Set to PayerMax mode and component integration
        app.state.currentMode = 'payermax';
        document.querySelector('input[name="integration"][value="component"]').checked = true;
        
        // Navigate to step 3 (which is step 4 in the 5-step flow)
        app.state.currentStep = 3;
        app.renderProgress();
        app.showPanel();
        app.renderActionBar();
        
        console.log('Navigated to STEP4. Current step:', app.state.currentStep);
        console.log('Current panel should be: pm-4-bind');
    } else {
        console.error('App not available');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}


// ==================== COMPONENT FUNCTIONS ====================

// PayerMax Mode Component Functions
function initComponent() {
    const clientKey = getValue('comp-clientKey');
    const sessionKey = getValue('comp-sessionKey');
    const environment = getValue('comp-environment') === 'true';
    const payment = getRadioValue('payment', 'card');

    if (!clientKey || !sessionKey) {
        alert('请输入 Client Key 和 Session Key');
        return;
    }

    // 清理之前的组件
    if (app && app.state.pmComponent) {
        try {
            app.state.pmComponent.unmount();
        } catch (e) {
            console.log('Unmount error:', e);
        }
        app.state.pmComponent = null;
    }

    // 重置显示状态
    const mountContainer = document.getElementById('component-mount-container');
    if (mountContainer) {
        mountContainer.classList.remove('active');
    }
    
    document.querySelectorAll('.component-mount').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
        el.innerHTML = '';
    });
    
    const tokenDisplay = document.getElementById('token-display-area');
    if (tokenDisplay) {
        tokenDisplay.classList.remove('active');
    }
    
    const cardPayBtn = document.getElementById('card-pay-btn');
    if (cardPayBtn) {
        cardPayBtn.style.display = 'none';
    }

    try {
        // 配置对象
        let config = {
            clientKey: clientKey,
            sessionKey: sessionKey,
            sandbox: environment
        };

        // 根据支付方式加载不同组件
        let componentType = '';
        let mountId = '';
        let mountElement = null;

        if (payment === 'card') {
            componentType = 'card';
            mountId = '#card-mount-area';
            mountElement = document.getElementById('card-mount-area');
        } else if (payment === 'applepay') {
            componentType = 'applepay';
            mountId = '#applepay-mount-area';
            mountElement = document.getElementById('applepay-mount-area');
            
            // 检查是否支持 ApplePay
            if (typeof PMdropin !== 'undefined' && !PMdropin.isSupportApplePay()) {
                alert('当前设备或浏览器不支持 Apple Pay');
                return;
            }
        } else if (payment === 'googlepay') {
            componentType = 'googlepay';
            mountId = '#googlepay-mount-area';
            mountElement = document.getElementById('googlepay-mount-area');
            config.payButtonConfig = { width: "100%", height: "40px" };
        }

        // 显示挂载容器和对应的挂载点
        if (mountContainer) {
            mountContainer.classList.add('active');
        }
        if (mountElement) {
            mountElement.classList.add('active');
            mountElement.style.display = 'block';
        }

        // 创建并挂载组件
        if (typeof PMdropin === 'undefined') {
            alert('PMdropin SDK 未加载，请检查网络连接');
            return;
        }

        const pmComponent = PMdropin.create(componentType, config);
        pmComponent.mount(mountId);

        // 保存组件实例
        if (app && app.state) {
            app.state.pmComponent = pmComponent;
        }

        // 监听组件就绪事件
        pmComponent.on('ready', () => {
            console.log(`${componentType} component ready`);
        });

        // 监听组件加载事件
        pmComponent.on('load', (res) => {
            if (res && res.code === 'SUCCESS') {
                console.log('Component loaded successfully');
                if (componentType === 'card' && cardPayBtn) {
                    cardPayBtn.style.display = 'block';
                }
            } else if (res) {
                alert('组件加载失败: ' + res.msg);
            }
        });

        // 设置支付处理函数
        if (componentType !== 'card') {
            pmComponent.on('payButtonClick', () => handleAppleGooglePayment(pmComponent));
        }

        console.log('Component initialized:', componentType);
    } catch (e) {
        console.error('Component initialization error:', e);
        alert('组件初始化失败: ' + e.message);
    }
}

function handleCardPayment() {
    if (!app || !app.state.pmComponent) {
        alert('请先初始化组件');
        return;
    }

    const pmComponent = app.state.pmComponent;
    pmComponent.emit('setDisabled', true);

    // CARD 支付不需要传 subscriptionPlan，只传 mitManagementUrl
    const canMakePaymentOptions = {
        mitManagementUrl: "http://www.xxx.com"
    };

    pmComponent.emit('canMakePayment', canMakePaymentOptions).then(resp => {
        pmComponent.emit('setDisabled', false);
        if (resp.code === 'APPLY_SUCCESS') {
            const token = resp.data.paymentToken;
            const tokenDisplay = document.getElementById('token-value-display');
            if (tokenDisplay) {
                tokenDisplay.textContent = token;
            }
            const tokenArea = document.getElementById('token-display-area');
            if (tokenArea) {
                tokenArea.classList.add('active');
            }
        } else {
            alert('支付申请失败: ' + resp.msg);
        }
    }).catch(err => {
        pmComponent.emit('setDisabled', false);
        console.error('Payment error:', err);
        alert('支付处理失败: ' + err.message);
    });
}

function handleAppleGooglePayment(pmComponent) {
    if (!pmComponent) {
        alert('请先初始化组件');
        return;
    }

    pmComponent.emit('setDisabled', true);

    // 获取订阅类型
    const subtype = getRadioValue('subtype', 'standard');
    
    // 获取参数
    const totalPeriods = parseInt(getValue('p-totalPeriods', '12')) || 12;
    const periodCount = parseInt(getValue('p-periodCount', '1')) || 1;
    const periodUnit = getValue('p-periodUnit', 'M');
    const amount = getValue('p-amount', '9.99');
    const currency = getValue('p-currency', 'USD');
    const startDate = getValue('p-startDate', '');
    const formattedDate = startDate ? startDate + ":00+00:00" : "";

    // ApplePay/GooglePay 需要传 subscriptionPlan
    const canMakePaymentOptions = {
        subscriptionPlan: {
            subject: "订阅计划标题",
            description: "PMMAX周期首期扣款",
            totalPeriods: totalPeriods,
            periodRule: {
                periodUnit: periodUnit,
                periodCount: periodCount
            },
            periodAmount: {
                amount: amount,
                currency: currency
            },
            firstPeriodStartDate: formattedDate
        },
        mitManagementUrl: "http://www.xxx.com"
    };

    // 根据订阅类型添加额外参数
    if (subtype === 'discount') {
        const trialPeriodCount = parseInt(getValue('p-trialPeriodCount', '3')) || 3;
        const trialAmount = getValue('p-trialAmount', '4.99');

        canMakePaymentOptions.subscriptionPlan.trialPeriodConfig = {
            trialPeriodCount: trialPeriodCount,
            trialPeriodAmount: {
                amount: trialAmount,
                currency: currency
            }
        };
    } else if (subtype === 'trial-discount') {
        const trialDays = parseInt(getValue('p-trialDays-combo', '7')) || 7;
        const trialAmount = getValue('p-trialAmount-combo', '0.99');
        const trialPeriodCount = parseInt(getValue('p-trialPeriodCount-combo', '2')) || 2;
        const trialPeriodAmount = getValue('p-trialPeriodAmount-combo', '3.00');

        canMakePaymentOptions.subscriptionPlan.trialConfig = {
            trialDays: trialDays,
            trialAmount: {
                amount: trialAmount,
                currency: currency
            }
        };

        canMakePaymentOptions.subscriptionPlan.trialPeriodConfig = {
            trialPeriodCount: trialPeriodCount,
            trialPeriodAmount: {
                amount: trialPeriodAmount,
                currency: currency
            }
        };
    }

    pmComponent.emit('canMakePayment', canMakePaymentOptions).then(resp => {
        pmComponent.emit('setDisabled', false);
        if (resp.code === 'APPLY_SUCCESS') {
            const token = resp.data.paymentToken;
            const tokenDisplay = document.getElementById('token-value-display');
            if (tokenDisplay) {
                tokenDisplay.textContent = token;
            }
            const tokenArea = document.getElementById('token-display-area');
            if (tokenArea) {
                tokenArea.classList.add('active');
            }
        } else {
            alert('支付申请失败: ' + resp.msg);
        }
    }).catch(err => {
        pmComponent.emit('setDisabled', false);
        console.error('Payment error:', err);
        alert('支付处理失败: ' + err.message);
    });
}

// Merchant Mode Component Functions
function initComponentMerchant() {
    const clientKey = getValue('comp-clientKey-m');
    const sessionKey = getValue('comp-sessionKey-m');
    const environment = getValue('comp-environment-m') === 'true';
    const payment = getRadioValue('payment', 'card');

    if (!clientKey || !sessionKey) {
        alert('请输入 Client Key 和 Session Key');
        return;
    }

    // 清理之前的组件
    if (app && app.state.pmComponentMerchant) {
        try {
            app.state.pmComponentMerchant.unmount();
        } catch (e) {
            console.log('Unmount error:', e);
        }
        app.state.pmComponentMerchant = null;
    }

    // 重置显示状态
    const mountContainer = document.getElementById('component-mount-container-m');
    if (mountContainer) {
        mountContainer.classList.remove('active');
    }
    
    document.querySelectorAll('#card-mount-area-m, #applepay-mount-area-m, #googlepay-mount-area-m').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
        el.innerHTML = '';
    });
    
    const tokenDisplay = document.getElementById('token-display-area-m');
    if (tokenDisplay) {
        tokenDisplay.classList.remove('active');
    }
    
    const cardPayBtn = document.getElementById('card-pay-btn-m');
    if (cardPayBtn) {
        cardPayBtn.style.display = 'none';
    }

    try {
        let config = {
            clientKey: clientKey,
            sessionKey: sessionKey,
            sandbox: environment
        };

        let componentType = '';
        let mountId = '';
        let mountElement = null;

        if (payment === 'card') {
            componentType = 'card';
            mountId = '#card-mount-area-m';
            mountElement = document.getElementById('card-mount-area-m');
        } else if (payment === 'applepay') {
            componentType = 'applepay';
            mountId = '#applepay-mount-area-m';
            mountElement = document.getElementById('applepay-mount-area-m');
            
            if (typeof PMdropin !== 'undefined' && !PMdropin.isSupportApplePay()) {
                alert('当前设备或浏览器不支持 Apple Pay');
                return;
            }
        } else if (payment === 'googlepay') {
            componentType = 'googlepay';
            mountId = '#googlepay-mount-area-m';
            mountElement = document.getElementById('googlepay-mount-area-m');
            config.payButtonConfig = { width: "100%", height: "40px" };
        }

        if (mountContainer) {
            mountContainer.classList.add('active');
        }
        if (mountElement) {
            mountElement.classList.add('active');
            mountElement.style.display = 'block';
        }

        if (typeof PMdropin === 'undefined') {
            alert('PMdropin SDK 未加载，请检查网络连接');
            return;
        }

        const pmComponentMerchant = PMdropin.create(componentType, config);
        pmComponentMerchant.mount(mountId);

        if (app && app.state) {
            app.state.pmComponentMerchant = pmComponentMerchant;
        }

        pmComponentMerchant.on('ready', () => {
            console.log(`${componentType} component ready (Merchant mode)`);
        });

        pmComponentMerchant.on('load', (res) => {
            if (res && res.code === 'SUCCESS') {
                console.log('Component loaded successfully (Merchant mode)');
                if (componentType === 'card' && cardPayBtn) {
                    cardPayBtn.style.display = 'block';
                }
            } else if (res) {
                alert('组件加载失败: ' + res.msg);
            }
        });

        if (componentType !== 'card') {
            pmComponentMerchant.on('payButtonClick', () => handleAppleGooglePaymentMerchant(pmComponentMerchant));
        }

        console.log('Component initialized (Merchant mode):', componentType);
    } catch (e) {
        console.error('Component initialization error (Merchant mode):', e);
        alert('组件初始化失败: ' + e.message);
    }
}

function handleCardPaymentMerchant() {
    if (!app || !app.state.pmComponentMerchant) {
        alert('请先初始化组件');
        return;
    }

    const pmComponent = app.state.pmComponentMerchant;
    pmComponent.emit('setDisabled', true);

    const canMakePaymentOptions = {
        mitManagementUrl: "http://www.xxx.com"
    };

    pmComponent.emit('canMakePayment', canMakePaymentOptions).then(resp => {
        pmComponent.emit('setDisabled', false);
        if (resp.code === 'APPLY_SUCCESS') {
            const token = resp.data.paymentToken;
            const tokenDisplay = document.getElementById('token-value-display-m');
            if (tokenDisplay) {
                tokenDisplay.textContent = token;
            }
            const tokenArea = document.getElementById('token-display-area-m');
            if (tokenArea) {
                tokenArea.classList.add('active');
            }
        } else {
            alert('支付申请失败: ' + resp.msg);
        }
    }).catch(err => {
        pmComponent.emit('setDisabled', false);
        console.error('Payment error (Merchant mode):', err);
        alert('支付处理失败: ' + err.message);
    });
}

function handleAppleGooglePaymentMerchant(pmComponent) {
    if (!pmComponent) {
        alert('请先初始化组件');
        return;
    }

    pmComponent.emit('setDisabled', true);

    const subtype = getRadioValue('subtype', 'standard');
    const totalPeriods = parseInt(getValue('p-totalPeriods', '12')) || 12;
    const periodCount = parseInt(getValue('p-periodCount', '1')) || 1;
    const periodUnit = getValue('p-periodUnit', 'M');
    const amount = getValue('p-amount', '9.99');
    const currency = getValue('p-currency', 'USD');
    const startDate = getValue('p-startDate', '');
    const formattedDate = startDate ? startDate + ":00+00:00" : "";

    const canMakePaymentOptions = {
        subscriptionPlan: {
            subject: "订阅计划标题",
            description: "PMMAX周期首期扣款",
            totalPeriods: totalPeriods,
            periodRule: {
                periodUnit: periodUnit,
                periodCount: periodCount
            },
            periodAmount: {
                amount: amount,
                currency: currency
            },
            firstPeriodStartDate: formattedDate
        },
        mitManagementUrl: "http://www.xxx.com"
    };

    if (subtype === 'discount') {
        const trialPeriodCount = parseInt(getValue('p-trialPeriodCount', '3')) || 3;
        const trialAmount = getValue('p-trialAmount', '4.99');

        canMakePaymentOptions.subscriptionPlan.trialPeriodConfig = {
            trialPeriodCount: trialPeriodCount,
            trialPeriodAmount: {
                amount: trialAmount,
                currency: currency
            }
        };
    } else if (subtype === 'trial-discount') {
        const trialDays = parseInt(getValue('p-trialDays-combo', '7')) || 7;
        const trialAmount = getValue('p-trialAmount-combo', '0.99');
        const trialPeriodCount = parseInt(getValue('p-trialPeriodCount-combo', '2')) || 2;
        const trialPeriodAmount = getValue('p-trialPeriodAmount-combo', '3.00');

        canMakePaymentOptions.subscriptionPlan.trialConfig = {
            trialDays: trialDays,
            trialAmount: {
                amount: trialAmount,
                currency: currency
            }
        };

        canMakePaymentOptions.subscriptionPlan.trialPeriodConfig = {
            trialPeriodCount: trialPeriodCount,
            trialPeriodAmount: {
                amount: trialPeriodAmount,
                currency: currency
            }
        };
    }

    pmComponent.emit('canMakePayment', canMakePaymentOptions).then(resp => {
        pmComponent.emit('setDisabled', false);
        if (resp.code === 'APPLY_SUCCESS') {
            const token = resp.data.paymentToken;
            const tokenDisplay = document.getElementById('token-value-display-m');
            if (tokenDisplay) {
                tokenDisplay.textContent = token;
            }
            const tokenArea = document.getElementById('token-display-area-m');
            if (tokenArea) {
                tokenArea.classList.add('active');
            }
        } else {
            alert('支付申请失败: ' + resp.msg);
        }
    }).catch(err => {
        pmComponent.emit('setDisabled', false);
        console.error('Payment error (Merchant mode):', err);
        alert('支付处理失败: ' + err.message);
    });
}

// NonPeriodic Mode Component Functions
function initComponentNonPeriodic() {
    const clientKey = getValue('comp-clientKey-np');
    const sessionKey = getValue('comp-sessionKey-np');
    const environment = getValue('comp-environment-np') === 'true';
    const payment = getRadioValue('payment', 'card');

    if (!clientKey || !sessionKey) {
        alert('请输入 Client Key 和 Session Key');
        return;
    }

    if (app && app.state.pmComponentNonPeriodic) {
        try {
            app.state.pmComponentNonPeriodic.unmount();
        } catch (e) {
            console.log('Unmount error:', e);
        }
        app.state.pmComponentNonPeriodic = null;
    }

    const mountContainer = document.getElementById('component-mount-container-np');
    if (mountContainer) {
        mountContainer.classList.remove('active');
    }
    
    document.querySelectorAll('#card-mount-area-np, #applepay-mount-area-np, #googlepay-mount-area-np').forEach(el => {
        el.classList.remove('active');
        el.style.display = 'none';
        el.innerHTML = '';
    });
    
    const tokenDisplay = document.getElementById('token-display-area-np');
    if (tokenDisplay) {
        tokenDisplay.classList.remove('active');
    }
    
    const cardPayBtn = document.getElementById('card-pay-btn-np');
    if (cardPayBtn) {
        cardPayBtn.style.display = 'none';
    }

    try {
        let config = {
            clientKey: clientKey,
            sessionKey: sessionKey,
            sandbox: environment
        };

        let componentType = '';
        let mountId = '';
        let mountElement = null;

        if (payment === 'card') {
            componentType = 'card';
            mountId = '#card-mount-area-np';
            mountElement = document.getElementById('card-mount-area-np');
        } else if (payment === 'applepay') {
            componentType = 'applepay';
            mountId = '#applepay-mount-area-np';
            mountElement = document.getElementById('applepay-mount-area-np');
            
            if (typeof PMdropin !== 'undefined' && !PMdropin.isSupportApplePay()) {
                alert('当前设备或浏览器不支持 Apple Pay');
                return;
            }
        } else if (payment === 'googlepay') {
            componentType = 'googlepay';
            mountId = '#googlepay-mount-area-np';
            mountElement = document.getElementById('googlepay-mount-area-np');
            config.payButtonConfig = { width: "100%", height: "40px" };
        }

        if (mountContainer) {
            mountContainer.classList.add('active');
        }
        if (mountElement) {
            mountElement.classList.add('active');
            mountElement.style.display = 'block';
        }

        if (typeof PMdropin === 'undefined') {
            alert('PMdropin SDK 未加载，请检查网络连接');
            return;
        }

        const pmComponentNonPeriodic = PMdropin.create(componentType, config);
        pmComponentNonPeriodic.mount(mountId);

        if (app && app.state) {
            app.state.pmComponentNonPeriodic = pmComponentNonPeriodic;
        }

        pmComponentNonPeriodic.on('ready', () => {
            console.log(`${componentType} component ready (NonPeriodic mode)`);
        });

        pmComponentNonPeriodic.on('load', (res) => {
            if (res && res.code === 'SUCCESS') {
                console.log('Component loaded successfully (NonPeriodic mode)');
                if (componentType === 'card' && cardPayBtn) {
                    cardPayBtn.style.display = 'block';
                }
            } else if (res) {
                alert('组件加载失败: ' + res.msg);
            }
        });

        if (componentType !== 'card') {
            pmComponentNonPeriodic.on('payButtonClick', () => handleAppleGooglePaymentNonPeriodic(pmComponentNonPeriodic));
        }

        console.log('Component initialized (NonPeriodic mode):', componentType);
    } catch (e) {
        console.error('Component initialization error (NonPeriodic mode):', e);
        alert('组件初始化失败: ' + e.message);
    }
}

function handleCardPaymentNonPeriodic() {
    if (!app || !app.state.pmComponentNonPeriodic) {
        alert('请先初始化组件');
        return;
    }

    const pmComponent = app.state.pmComponentNonPeriodic;
    pmComponent.emit('setDisabled', true);

    const canMakePaymentOptions = {
        mitManagementUrl: "http://www.xxx.com"
    };

    pmComponent.emit('canMakePayment', canMakePaymentOptions).then(resp => {
        pmComponent.emit('setDisabled', false);
        if (resp.code === 'APPLY_SUCCESS') {
            const token = resp.data.paymentToken;
            const tokenDisplay = document.getElementById('token-value-display-np');
            if (tokenDisplay) {
                tokenDisplay.textContent = token;
            }
            const tokenArea = document.getElementById('token-display-area-np');
            if (tokenArea) {
                tokenArea.classList.add('active');
            }
        } else {
            alert('支付申请失败: ' + resp.msg);
        }
    }).catch(err => {
        pmComponent.emit('setDisabled', false);
        console.error('Payment error (NonPeriodic mode):', err);
        alert('支付处理失败: ' + err.message);
    });
}

function handleAppleGooglePaymentNonPeriodic(pmComponent) {
    if (!pmComponent) {
        alert('请先初始化组件');
        return;
    }

    pmComponent.emit('setDisabled', true);

    const amount = getValue('np-amount', '9.99');
    const currency = getValue('np-currency', 'USD');

    const canMakePaymentOptions = {
        mitManagementUrl: "http://www.xxx.com"
    };

    pmComponent.emit('canMakePayment', canMakePaymentOptions).then(resp => {
        pmComponent.emit('setDisabled', false);
        if (resp.code === 'APPLY_SUCCESS') {
            const token = resp.data.paymentToken;
            const tokenDisplay = document.getElementById('token-value-display-np');
            if (tokenDisplay) {
                tokenDisplay.textContent = token;
            }
            const tokenArea = document.getElementById('token-display-area-np');
            if (tokenArea) {
                tokenArea.classList.add('active');
            }
        } else {
            alert('支付申请失败: ' + resp.msg);
        }
    }).catch(err => {
        pmComponent.emit('setDisabled', false);
        console.error('Payment error (NonPeriodic mode):', err);
        alert('支付处理失败: ' + err.message);
    });
}

// Make functions globally available
window.initComponent = initComponent;
window.handleCardPayment = handleCardPayment;
window.initComponentMerchant = initComponentMerchant;
window.handleCardPaymentMerchant = handleCardPaymentMerchant;
window.initComponentNonPeriodic = initComponentNonPeriodic;
window.handleCardPaymentNonPeriodic = handleCardPaymentNonPeriodic;

// Global wrapper functions for HTML onclick handlers
window.switchMode = function(el, mode) {
    if (window.app) {
        // Remove active class from all mode cards
        document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
        el.classList.add('active');
        
        // Map mode string to MODES constant
        const modeMap = {
            'payermax': MODES.PAYERMAX,
            'merchant': MODES.MERCHANT,
            'nonperiodic': MODES.NONPERIODIC
        };
        
        // Update state
        window.app.state.currentMode = modeMap[mode] || MODES.PAYERMAX;
        window.app.state.currentStep = 0;
        
        // Clean up components
        window.app.cleanupComponents();
        
        // Re-render
        window.app.init();
    }
};

window.resetAll = function() {
    if (window.app) {
        window.app.resetAll();
    }
};

window.goNext = function() {
    if (window.app) {
        window.app.goNext();
    }
};

window.goPrev = function() {
    if (window.app) {
        window.app.goPrev();
    }
};

window.switchCreateTab = function(type, autoSwitch = false) {
    // 更新 tab 激活状态
    const tabsContainer = document.querySelector('#panel-pm-2 .sub-tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.sub-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // 如果是自动切换，根据 type 找到对应的 tab
        if (autoSwitch) {
            tabs.forEach(tab => {
                const tabText = tab.textContent.trim();
                if ((type === 'standard' && tabText.includes('普通订阅')) ||
                    (type === 'trial' && tabText.includes('N天试用')) ||
                    (type === 'discount' && tabText.includes('前N期优惠')) ||
                    (type === 'trial-discount' && tabText.includes('试用+优惠'))) {
                    tab.classList.add('active');
                }
            });
        } else {
            // 手动点击时，激活点击的 tab
            tabs.forEach(tab => {
                const tabText = tab.textContent.trim();
                if ((type === 'standard' && tabText.includes('普通订阅')) ||
                    (type === 'trial' && tabText.includes('N天试用')) ||
                    (type === 'discount' && tabText.includes('前N期优惠')) ||
                    (type === 'trial-discount' && tabText.includes('试用+优惠'))) {
                    tab.classList.add('active');
                }
            });
        }
    }
    
    // 隐藏所有代码块
    document.querySelectorAll('.create-code-standard, .create-code-trial, .create-code-discount, .create-code-trial-discount').forEach(block => {
        block.style.display = 'none';
    });
    
    // 显示对应的代码块
    const targetBlock = document.querySelector(`.create-code-${type}`);
    if (targetBlock) {
        targetBlock.style.display = 'block';
    }
};

window.copyCode = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const raw = el.innerText || el.textContent;
    navigator.clipboard.writeText(raw).then(() => {
        const btn = el.closest('.code-block').querySelector('.copy-mini-btn');
        if (btn) { 
            btn.textContent = '✓ 已复制'; 
            setTimeout(() => btn.textContent = '复制', 2000); 
        }
    }).catch(err => {
        console.error('Copy failed:', err);
        alert('复制失败，请手动复制');
    });
};

window.updateDynamic = function() {
    if (window.app) {
        window.app.updateDynamic();
    }
};

window.updateMerchantBindType = function() {
    if (window.app) {
        window.app.updateMerchantBindType();
    }
};


// ========================================
// 激活订阅计划 - 集成方式和支付方式切换逻辑
// ========================================

/**
 * 监听集成方式和支付方式的变化，动态切换 Step 3 的代码示例
 */
function initActivateModeSwitcher() {
    // 监听集成方式变化
    const integrationRadios = document.querySelectorAll('input[name="integration"]');
    integrationRadios.forEach(radio => {
        radio.addEventListener('change', updateActivateCodeExample);
    });
    
    // 监听支付方式变化
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', updateActivateCodeExample);
    });
    
    // 初始化时执行一次
    updateActivateCodeExample();
}

/**
 * 更新激活订阅计划的代码示例
 */
function updateActivateCodeExample() {
    const integration = document.querySelector('input[name="integration"]:checked')?.value;
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    
    // 获取容器元素
    const cashierMode = document.getElementById('activate-cashier-mode');
    const apiMode = document.getElementById('activate-api-mode');
    const modeTitle = document.getElementById('integration-mode-title');
    const modeDesc = document.getElementById('integration-mode-desc');
    
    if (!cashierMode || !apiMode) return;
    
    // 根据集成方式显示对应的代码示例
    if (integration === 'cashier') {
        // 收银台模式
        cashierMode.style.display = 'grid';
        apiMode.style.display = 'none';
        
        if (modeTitle) modeTitle.textContent = '收银台模式';
        if (modeDesc) {
            modeDesc.innerHTML = `
                • <strong>integrate</strong>：固定值 <code style="background:rgba(255,255,255,0.7);padding:2px 6px;border-radius:4px;">Hosted_Checkout</code><br>
                • 用户将跳转到 PayerMax 收银台完成支付<br>
                • 支持 CARD、ApplePay、GooglePay、APM 等多种支付方式
            `;
        }
    } else if (integration === 'api') {
        // API 模式
        cashierMode.style.display = 'none';
        apiMode.style.display = 'grid';
        
        if (modeTitle) modeTitle.textContent = 'API 模式';
        if (modeDesc) {
            modeDesc.innerHTML = `
                • <strong>integrate</strong>：固定值 <code style="background:rgba(255,255,255,0.7);padding:2px 6px;border-radius:4px;">Direct_Payment</code><br>
                • 需要添加 <strong>terminalType</strong>（WEB/WAP/APP）和 <strong>osType</strong>（ANDROID/IOS）<br>
                • 不同支付方式需要传入对应的支付要素参数
            `;
        }
        
        // 根据支付方式显示对应的 API 代码示例
        const apiCardRequest = document.getElementById('api-card-request');
        const apiApplepayRequest = document.getElementById('api-applepay-request');
        const apiGooglepayRequest = document.getElementById('api-googlepay-request');
        const apiApmRequest = document.getElementById('api-apm-request');
        
        if (apiCardRequest) apiCardRequest.style.display = payment === 'card' ? 'block' : 'none';
        if (apiApplepayRequest) apiApplepayRequest.style.display = payment === 'applepay' ? 'block' : 'none';
        if (apiGooglepayRequest) apiGooglepayRequest.style.display = payment === 'googlepay' ? 'block' : 'none';
        if (apiApmRequest) apiApmRequest.style.display = payment === 'apm' ? 'block' : 'none';
    } else if (integration === 'component') {
        // 前置组件模式 - 隐藏所有激活代码示例（前置组件有自己的 Step）
        cashierMode.style.display = 'none';
        apiMode.style.display = 'none';
        
        if (modeTitle) modeTitle.textContent = '前置组件模式';
        if (modeDesc) {
            modeDesc.innerHTML = `
                • 前置组件模式的激活流程请参考 Step 3 的前置组件加载步骤<br>
                • 使用 <strong>applyDropinSession</strong> 获取 Session Key<br>
                • 通过前端组件完成支付和绑定
            `;
        }
    }
}

// 页面加载完成后初始化切换器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initActivateModeSwitcher);
} else {
    initActivateModeSwitcher();
}

/**
 * 重新计算并更新首期扣款时间
 */
function recalculateStartDate() {
    const subtype = getRadioValue('subtype', 'standard');
    const now = new Date();
    
    if (subtype === 'trial') {
        // N天试用：当前时间 + 试用天数
        const trialDays = parseInt(getValue('p-trialDays', '7'));
        now.setDate(now.getDate() + trialDays);
    } else {
        // 其他模式（包括N天试用+前N期优惠）：当前时间 + 2小时
        now.setHours(now.getHours() + 2);
    }
    
    // Format to datetime-local format (YYYY-MM-DDTHH:MM)
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const startDate = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Update the input field
    const startDateInput = document.getElementById('p-startDate');
    if (startDateInput) {
        startDateInput.value = startDate;
    }
    
    // Trigger updateDynamic to refresh all displays
    if (window.updateDynamic) {
        window.updateDynamic();
    }
}

// 为订阅类型和试用天数字段添加自动重新计算功能
function initStartDateAutoCalculation() {
    // 监听订阅类型变化
    const subtypeRadios = document.querySelectorAll('input[name="subtype"]');
    subtypeRadios.forEach(radio => {
        radio.addEventListener('change', recalculateStartDate);
    });
    
    // 监听试用天数变化（仅对N天试用模式有效）
    const trialDaysInput = document.getElementById('p-trialDays');
    if (trialDaysInput) {
        trialDaysInput.addEventListener('input', recalculateStartDate);
    }
}

// 页面加载完成后初始化自动计算
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStartDateAutoCalculation);
} else {
    initStartDateAutoCalculation();
}

/**
 * 更新前置组件模式下的 firstPeriodStartDate 字段
 */
function updateComponentStartDate() {
    const startDate = getValue('p-startDate', '');
    if (startDate) {
        // 转换为 ISO 8601 格式 (YYYY-MM-DDTHH:MM:SS+00:00)
        const date = new Date(startDate);
        const isoString = date.toISOString().replace('Z', '+00:00');
        
        // 更新前置组件代码示例中的 firstPeriodStartDate
        const startDateElement = document.getElementById('s-startDate');
        if (startDateElement) {
            startDateElement.textContent = isoString;
        }
    }
}

// 扩展现有的 updateDynamic 函数，添加前置组件首期扣款时间更新
const originalUpdateDynamic = window.updateDynamic;
window.updateDynamic = function() {
    // 调用原始函数
    if (originalUpdateDynamic) {
        originalUpdateDynamic();
    }
    
    // 更新前置组件首期扣款时间
    updateComponentStartDate();
};

// 页面加载完成后初始化前置组件首期扣款时间
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateComponentStartDate);
} else {
    updateComponentStartDate();
}