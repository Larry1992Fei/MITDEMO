# PayerMax托管前置组件模式 - ApplePay支持更新

## 更新概述
为PayerMax托管（周期性订阅）+ 前置组件绑定/激活模式的STEP4添加了对ApplePay和GooglePay的支持，实现了根据支付方式动态切换代码示例。

## 更改详情

### 1. HTML代码块更新 (index-full.html)

#### 原单一代码块：
- 只有一个通用的前置组件激活代码示例

#### 新多支付方式代码块：
- **CARD + Component**: `pm-component-card-request`
- **APPLEPAY + Component**: `pm-component-applepay-request` 
- **GOOGLEPAY + Component**: `pm-component-googlepay-request`

### 2. ApplePay前置组件请求参数

根据PayerMax官方文档，ApplePay前置组件模式的关键参数：

```json
{
  "paymentDetail": {
    "paymentToken": "CPT4f200d278f3a454b9e91c81edc641e2b",
    "sessionKey": "bdsf8982348974hhf82934bf8239424", 
    "mitType": "SCHEDULED",
    "tokenForFutureUse": true,
    "merchantInitiated": false,
    "buyerInfo": {
      "firstName": "Deborah",
      "lastName": "Swinstead",
      "email": "your@gmail.com",
      "phoneNo": "0609 031 114",
      "address": "Test Address",
      "city": "Holden Hill",
      "region": "SA",
      "zipCode": "5088",
      "clientIp": "211.52.321.225",
      "userAgent": "Mozilla/5.0 (iPad; CPU OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15..."
    }
  }
}
```

### 3. JavaScript功能更新 (js/app-bundle.js)

#### 新增函数：
```javascript
switchPayerMaxComponentCodeBlocks() {
    const payment = this.state.getCurrentPayment();
    // 根据支付方式显示对应的代码块
    // CARD -> pm-component-card-request
    // APPLEPAY -> pm-component-applepay-request  
    // GOOGLEPAY -> pm-component-googlepay-request
}
```

#### 调用位置：
1. **updateDynamic()**: 当参数更新时自动切换
2. **handleStepTransition()**: 当进入STEP4时自动切换
3. **handlePaymentChange()**: 当用户切换支付方式时自动切换

### 4. 支付方式差异

#### CARD模式：
- 标准的前置组件参数
- 包含完整的buyerInfo

#### APPLEPAY模式：
- 相同的前置组件参数结构
- buyerInfo中的userAgent使用iPad/iOS格式
- country设置为"US"

#### GOOGLEPAY模式：
- 与CARD模式基本相同
- 适用于GooglePay前置组件集成

### 5. 动态切换逻辑

用户在以下情况下会看到代码块自动切换：
1. 进入PayerMax托管模式的STEP4（后端支付方式绑定）
2. 在STEP4中切换支付方式（CARD/APPLEPAY/GOOGLEPAY）
3. 修改其他参数时保持当前支付方式的代码块显示

## 参考文档
- [PayerMax ApplePay订阅集成 - 4.3 前置组件模式激活订阅计划](https://docs-v2.payermax.com/doc-center/receipt/subscription/applepay/subscription-pmx-management.html#_4-3-%E5%89%8D%E7%BD%AE%E7%BB%84%E4%BB%B6%E6%A8%A1%E5%BC%8F%E6%BF%80%E6%B4%BB%E8%AE%A2%E9%98%85%E8%AE%A1%E5%88%92)

## 业务流程

### 完整的ApplePay前置组件流程：
1. **Step 1**: 配置订阅参数
2. **Step 2**: 创建订阅计划 (`subscriptionCreate`)
3. **Step 3**: 加载ApplePay前置组件 (`applyDropinSession` + 前端组件)
4. **Step 4**: 后端支付绑定 (`orderAndPay` + `paymentToken` + `sessionKey`)
5. **Step 5**: PayerMax自动管理后续扣款

## 更新完成时间
2026-03-10