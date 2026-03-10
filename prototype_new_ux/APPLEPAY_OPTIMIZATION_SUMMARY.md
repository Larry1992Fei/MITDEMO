# ApplePay & GooglePay 商户自管模式优化总结

## 📋 优化概述

根据 PayerMax 官方文档要求，对商户自管模式下 ApplePay 和 GooglePay 支付方式的三种集成方式进行了全面优化：

- **ApplePay 文档**: [ApplePay周期性订阅集成-商户管理订阅计划](https://docs-v2.payermax.com/doc-center/receipt/subscription/applepay/subscription-merchant-management.html)
- **GooglePay 文档**: [GooglePay周期性订阅集成-商户管理订阅计划](https://docs-v2.payermax.com/doc-center/receipt/subscription/googlepay/subscription-merchant-management.html)

## 🎯 优化内容

### ApplePay 优化

#### 1. **收银台模式优化** ✅
- **添加 `subscriptionPlan` 字段**（必填）
- **添加 `mitManagementUrl` 字段**（必填）
- **保持 `integrate: "Hosted_Checkout"`** 正确

#### 2. **API 模式优化** ✅
- **添加 `applePayPaymentData` 字段**（ApplePay API 模式必填）
- **删除 `cardInfo` 字段**（避免混淆不同支付方式）
- **添加 `subscriptionPlan` 字段**（非必填，但建议包含）
- **添加 `mitManagementUrl` 字段**（非必填）
- **保持 `integrate: "Direct_Payment"`** 正确
- **保持 `terminalType` 和 `osType` 字段** 正确

#### 3. **前置组件模式优化** ✅
- **保持现有 `subscriptionPlan` 字段**（非必填，符合最佳实践）
- **保持 `paymentToken` 和 `sessionKey` 字段** 正确
- **保持 `integrate: "Direct_Payment"`** 正确

### GooglePay 优化

#### 1. **收银台模式优化** ✅
- **保持 `subscriptionPlan` 字段**（必填）
- **保持 `mitManagementUrl` 字段**（必填）
- **保持 `integrate: "Hosted_Checkout"`** 正确

#### 2. **API 模式优化** ✅
- **添加 `googlePayDetails` 字段**（GooglePay API 模式必填）
- **保持 `subscriptionPlan` 字段**（非必填，但建议包含）
- **保持 `mitManagementUrl` 字段**（非必填）
- **保持 `integrate: "Direct_Payment"`** 正确
- **保持 `terminalType` 和 `osType` 字段** 正确

#### 3. **前置组件模式优化** ✅
- **保持现有 `subscriptionPlan` 字段**（非必填，符合最佳实践）
- **保持 `paymentToken` 和 `sessionKey` 字段** 正确
- **保持 `integrate: "Direct_Payment"`** 正确

### 通用优化

#### 4. **后续扣款优化** ✅
- **修改 `country` 字段**：从 `"UN"` 改为 `"US"`（必传）
- **保持 `subscriptionPlan` 结构**：包含商户订阅计划管理字段
- **保持 `merchantInitiated: true`**（商户主动发起）

## 📝 具体修改详情

### ApplePay API 模式新增字段
```json
"applePayPaymentData": {
  "applicationExpirationDate": "231231",
  "applicationPrimaryAccountNumber": "1234209400123456",
  "currencyCode": "344",
  "deviceManufacturerIdentifier": "040010030273",
  "paymentData": {
    "eciIndicator": "7",
    "onlinePaymentCryptogram": "AqhVFUwAAuM69WEZxe+OMAACAAA="
  },
  "paymentDataType": "3DSecure",
  "transactionAmount": "100",
  "network": "Visa",
  "type": "credit",
  "displayName": "VISA 5743"
}
```

### GooglePay API 模式新增字段
```json
"googlePayDetails": {
  "authMethod": "PAN_ONLY", // 或 CRYPTOGRAM_3DS
  "pan": "4111111111111111", // 卡号
  "expirationMonth": "12",
  "expirationYear": "2029",
  "cryptogram": "xxxxxxxxxxxx",
  "eciIndicator": "5",
  "description": "VISA 1234",
  "cardNetwork": "VISA",
  "cardHolderFullName": "zhangsan" // pan_only时传入
}
```

### 收银台模式新增字段（ApplePay & GooglePay）
```json
"subscriptionPlan": {
  "subject": "订阅计划标题",
  "description": "商户自管周期性订阅",
  "totalPeriods": 12,
  "periodRule": {
    "periodUnit": "M",
    "periodCount": 1
  },
  "periodAmount": {
    "amount": 20,
    "currency": "USD"
  }
},
"mitManagementUrl": "https://your.domain/subscription-management"
```

### 后续扣款字段修改
```json
"country": "US"  // 从 "UN" 改为 "US"
```

## ✅ 验证结果

所有三种集成方式现在都符合 PayerMax 官方文档要求：

### ApplePay 支付方式
1. **收银台模式**：包含必填的 `subscriptionPlan` 和 `mitManagementUrl`
2. **API 模式**：包含 ApplePay 必需的 `applePayPaymentData` 字段
3. **前置组件模式**：保持最佳实践的 `subscriptionPlan` 配置

### GooglePay 支付方式
1. **收银台模式**：包含必填的 `subscriptionPlan` 和 `mitManagementUrl`
2. **API 模式**：包含 GooglePay 必需的 `googlePayDetails` 字段
3. **前置组件模式**：保持最佳实践的 `subscriptionPlan` 配置

### 通用优化
4. **后续扣款**：使用正确的 `country` 字段值

## 🎯 优化效果

- ✅ 代码示例完全符合官方文档规范
- ✅ 支持 ApplePay 和 GooglePay 的完整支付流程
- ✅ 提供准确的集成指导
- ✅ 减少开发者集成时的错误
- ✅ 统一了不同支付方式的代码结构

---

**优化完成时间**: 2026-03-10  
**参考文档**: 
- [PayerMax ApplePay 商户自管文档](https://docs-v2.payermax.com/doc-center/receipt/subscription/applepay/subscription-merchant-management.html)
- [PayerMax GooglePay 商户自管文档](https://docs-v2.payermax.com/doc-center/receipt/subscription/googlepay/subscription-merchant-management.html)