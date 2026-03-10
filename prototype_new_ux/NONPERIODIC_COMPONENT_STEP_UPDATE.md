# 非周期性订阅代扣+前置组件模式 STEP3 更新

## 📋 更新概述

为非周期性订阅代扣+前置组件绑定/激活模式添加了新的STEP3：后端支付方式绑定，原来的STEP3改为STEP4。

## 🔄 步骤流程变更

### 更新前 (3步流程)
```
Step 1: 收集用户业务数据
Step 2: 加载前置组件
Step 3: 后续发起扣款
```

### 更新后 (4步流程)
```
Step 1: 收集用户业务数据
Step 2: 加载前置组件
Step 3: 后端支付方式绑定  ← 新增
Step 4: 后续发起扣款      ← 原Step 3
```

## 🛠️ 技术实现

### 1. JavaScript配置更新 (js/app-bundle.js)

#### 步骤配置
```javascript
// 非周期性+前置组件模式
if (integration === INTEGRATION_TYPES.COMPONENT) {
    return [
        { id: 'np-1', label: 'Step 1', title: '收集用户业务数据' },
        { id: 'np-2-component', label: 'Step 2', title: '加载前置组件' },
        { id: 'np-3-bind', label: 'Step 3', title: '后端支付方式绑定' }, // 新增
        { id: 'np-4', label: 'Step 4', title: '后续发起扣款' }           // 原np-3
    ];
}
```

#### 按钮标签更新
```javascript
return ['下一步：加载前置组件', '下一步：完成支付绑定', '下一步：后续扣款', '完成'];
```

#### 提示信息更新
```javascript
return [
    '💡 收集本次绑定/支付的订单参数',
    '💡 使用前置组件获取 paymentToken',
    '💡 调用 orderAndPay API 完成支付绑定',  // 新增
    '💡 商户按业务需求灵活发起扣款'
];
```

### 2. HTML面板更新 (index-full.html)

#### 新增面板：panel-np-3-bind
- **功能**：使用前置组件获取的 paymentToken 和 sessionKey 调用 orderAndPay API
- **API调用**：orderAndPay (Direct_Payment模式)
- **MIT类型**：UNSCHEDULED (非周期性代扣)

#### 面板ID更新
- 原 `panel-np-3` → `panel-np-4`

### 3. 代码块功能

#### 支持的支付方式
- **CARD**: 标准卡支付
- **APPLEPAY**: Apple Pay支付
- **GOOGLEPAY**: Google Pay支付

#### 代码块ID
- `np-component-card-request`
- `np-component-applepay-request`
- `np-component-googlepay-request`

#### 新增函数：
```javascript
switchNonPeriodicComponentCodeBlocks() {
    const payment = this.state.getCurrentPayment();
    // 根据支付方式显示对应的代码块
}
```

#### 调用位置：
1. **updateDynamic()**: 当参数更新时自动切换
2. **handleStepTransition()**: 当进入STEP3时自动切换
3. **handlePaymentChange()**: 当用户切换支付方式时自动切换

## 📤 API请求示例

### CARD支付方式
```json
{
  "version": "1.5",
  "keyVersion": "1",
  "requestTime": "2022-01-17T09:05:52.194+00:00",
  "appId": "bbd8d2639a7c4dfd8df7d005294390df",
  "merchantNo": "020113838535952",
  "data": {
    "outTradeNo": "APIFOXDEV1745388079422",
    "subject": "代扣标题",
    "totalAmount": 10,
    "currency": "USD",
    "userId": "test1111",
    "language": "en",
    "reference": "test mit",
    "frontCallbackUrl": "https://[your domain name]/[your callback URL]",
    "notifyUrl": "https://[your domain name]/[your notify URL]",
    "integrate": "Direct_Payment",
    "expireTime": "1800",
    "terminalType": "WEB",
    "osType": "ANDROID",
    "paymentDetail": {
      "paymentToken": "CPT4f200d278f3a454b9e91c81edc641e2b",
      "sessionKey": "bdsf8982348974hhf82934bf8239424",
      "mitType": "UNSCHEDULED",
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
        "userAgent": "Mozilla/5.0"
      }
    }
  }
}
```

### 关键参数说明
- **mitType**: "UNSCHEDULED" (非周期性代扣专用)
- **tokenForFutureUse**: true (生成paymentTokenID用于后续代扣)
- **merchantInitiated**: false (用户参与的绑定)

## 📥 API响应示例
```json
{
  "code": "APPLY_SUCCESS",
  "msg": "success",
  "psn": "2022011709052194000000",
  "data": {
    "paymentTokenID": "PTI_20260310_001",
    "outTradeNo": "APIFOXDEV1745388079422",
    "tradeNo": "2022011709052194000000",
    "totalAmount": 10,
    "currency": "USD",
    "status": "TRADE_SUCCESS"
  }
}
```

## 🎯 参数传递流程

### Step 2 → Step 3
- **输入**: `paymentToken`, `sessionKey` (来自前置组件)
- **输出**: `paymentTokenID` (用于后续代扣)

### Step 3 → Step 4
- **输入**: `paymentTokenID` (来自绑定结果)
- **用途**: 后续发起扣款时使用

## 🧪 测试方法

1. 访问 `http://localhost:8000/index-full.html`
2. 选择 "非周期性订阅代扣"
3. 选择 "前置组件绑定 / 激活"
4. 依次进入各步骤，验证新增的STEP3
5. 切换支付方式，验证代码块切换功能

## ✅ 验证要点

- [ ] 步骤数量从3步变为4步
- [ ] 新增STEP3面板正确显示
- [ ] 代码块根据支付方式正确切换
- [ ] 参数动态更新正常工作
- [ ] 原STEP3功能在新STEP4中正常工作

## 📝 注意事项

1. **MIT类型差异**: 非周期性使用 "UNSCHEDULED"，周期性使用 "SCHEDULED"
2. **参数传递**: paymentToken 和 sessionKey 来自前置组件，paymentTokenID 用于后续扣款
3. **兼容性**: 不影响其他模式的功能，只针对非周期性+前置组件模式

## 🔄 回滚方法

如需回滚此更新：
1. 恢复步骤配置为3步流程
2. 删除 `panel-np-3-bind` 面板
3. 将 `panel-np-4` 改回 `panel-np-3`
4. 移除相关JavaScript函数