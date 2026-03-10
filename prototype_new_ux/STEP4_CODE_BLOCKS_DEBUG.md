# STEP4 代码块显示问题调试报告

## 问题描述
用户报告 STEP4 中的代码块没有展示出来。

## 已实现的功能

### 1. 代码块结构
在 `index-full.html` 中，STEP4 面板 (`panel-pm-4-bind`) 包含三个代码块：

- `pm-component-card-request` - CARD 支付方式代码块（默认显示）
- `pm-component-applepay-request` - APPLEPAY 支付方式代码块（默认隐藏）
- `pm-component-googlepay-request` - GOOGLEPAY 支付方式代码块（默认隐藏）

### 2. 切换函数
`switchPayerMaxComponentCodeBlocks()` 函数负责根据选择的支付方式显示对应的代码块：

```javascript
switchPayerMaxComponentCodeBlocks() {
    const payment = this.state.getCurrentPayment();
    // 隐藏所有代码块
    // 根据支付方式显示对应代码块
}
```

### 3. 调用时机
函数在以下情况下被调用：

1. **步骤切换时**: `handleStepTransition()` 中当进入 `pm-4-bind` 步骤时
2. **支付方式改变时**: `handlePaymentChange()` 中当在 STEP4 时
3. **面板显示时**: `showPanel()` 中当显示 `pm-4-bind` 面板时

## 调试功能

### 1. 测试页面
创建了 `test-step4.html` 用于独立测试代码块切换功能。

### 2. 全局调试函数
在浏览器控制台中可以使用以下函数：

```javascript
// 直接跳转到 STEP4 进行测试
goToStep4();

// 测试代码块切换
testCodeBlockSwitch('applepay');
testCodeBlockSwitch('googlepay');
testCodeBlockSwitch('card');
```

## 测试步骤

### 方法1：正常流程测试
1. 打开 `index-full.html`
2. 选择 "PayerMax托管（周期性订阅）"
3. 选择 "前置组件绑定 / 激活"
4. 点击 "下一步" 按钮，依次进入 STEP2、STEP3、STEP4
5. 在 STEP4 中切换支付方式，观察代码块是否正确显示

### 方法2：直接跳转测试
1. 打开 `index-full.html`
2. 打开浏览器开发者工具控制台
3. 执行 `goToStep4()` 直接跳转到 STEP4
4. 切换支付方式测试代码块显示

### 方法3：独立测试
1. 打开 `test-step4.html`
2. 切换支付方式选项
3. 点击 "Test Code Block Switch" 按钮
4. 观察代码块切换是否正常

## 预期行为

- **CARD**: 显示 CARD 代码块，隐藏其他两个
- **APPLEPAY**: 显示 APPLEPAY 代码块，隐藏其他两个  
- **GOOGLEPAY**: 显示 GOOGLEPAY 代码块，隐藏其他两个

## 调试日志

函数执行时会在控制台输出详细日志：
- 当前选择的支付方式
- 找到的代码块元素
- 隐藏/显示操作的确认

## 可能的问题原因

1. **CSS 样式冲突**: 检查是否有其他 CSS 规则影响代码块显示
2. **JavaScript 错误**: 检查控制台是否有 JavaScript 错误
3. **元素未找到**: 检查代码块 ID 是否正确
4. **时机问题**: 函数调用时 DOM 元素可能还未准备好

## 解决方案

已添加以下改进：

1. **增强调试日志**: 更详细的控制台输出
2. **多重调用**: 在多个时机调用切换函数
3. **延迟执行**: 使用 `setTimeout` 确保 DOM 准备就绪
4. **默认显示**: 确保 CARD 代码块默认可见
5. **测试工具**: 提供多种测试方法

## 下一步

如果问题仍然存在，请：

1. 使用浏览器开发者工具检查 STEP4 面板的 HTML 结构
2. 查看控制台日志确认函数是否被正确调用
3. 检查代码块元素的 CSS 样式是否正确
4. 使用提供的测试工具进行独立验证