# 非周期性订阅代扣+前置组件+ApplePay/GooglePay STEP3 代码块更新

## 📋 更新概述

更新了非周期性订阅代扣+前置组件绑定/激活+APPLEPAY/GOOGLEPAY模式下的STEP3代码块，添加了新的必要字段并优化了参数格式。

## 🔄 主要变更

### 1. 新增字段
- **country**: "US" - 国家代码
- **mitManagementUrl**: 订阅管理URL (非必填)

### 2. 字段调整
- **userAgent**: 更新为更简洁的格式，移除了多余的信息

## 📤 更新后的API请求示例

### ApplePay 模式
```json
{
  "version": "1.5",
  "keyVersion": "1",
  "requestTime": "2022-01-17T09:05:52.194+00:00",
  "appId": "bbd8d2639a7c4dfd8df7d005294390df",
  "merchantNo": "020113838535952",
  "data": {
    "outTradeNo": "APIFOXDEV1745388079422", // 商户下单唯一单号
    "subject": "代扣标题", // 标题
    "totalAmount": 10, // 代扣金额
    "country": "US", // 新增：国家代码
    "currency": "USD", // 代扣币种
    "userId": "test1111", // 用户号
    "language": "en",
    "reference": "test mit",
    "frontCallbackUrl": "https://[your domain name]/[your callback URL]",
    "notifyUrl": "https://[your domain name]/[your notify URL]",
    "integrate": "Direct_Payment", // 固定值：Direct_Payment
    "expireTime": "1800",
    "terminalType": "WEB", // 终端类型，WEB、WAP or APP
    "osType": "ANDROID", // 操作系统类型 ANDROID or IOS
    "mitManagementUrl": "https://[your domain name]/[your subscription management URL]", // 新增：非必填
    "paymentDetail": {
      "paymentToken": "CPT4f200d278f3a454b9e91c81edc641e2b", // 必传
      "sessionKey": "bdsf8982348974hhf82934bf8239424", // 必传
      "mitType": "UNSCHEDULED", // 必传，MIT类型，非周期性代扣时为UNSCHEDULED
      "tokenForFutureUse": true, // 必传，值为true，生成paymentTokenID，用于后续代扣
      "merchantInitiated": false, // 必传，false标识不是商户主动发起，有用户参与
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
        "userAgent": "Mozilla/5.0 (iPad; CPU OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) " // 更新：简化格式
      }
    }
  }
}
```

### GooglePay 模式
GooglePay模式使用相同的结构和字段，只是支付方式不同。

## 🔍 字段说明

### 新增字段详解

#### country
- **类型**: String
- **值**: "US"
- **说明**: 国家代码，ApplePay/GooglePay支付时需要指定
- **必填**: 是

#### mitManagementUrl
- **类型**: String
- **值**: "https://[your domain name]/[your subscription management URL]"
- **说明**: 订阅管理页面URL，用户可以在此管理订阅
- **必填**: 否

### 更新字段详解

#### userAgent
- **ApplePay更新前**: 包含完整的Facebook应用信息
- **ApplePay更新后**: 简化为基础的iPad Safari信息
- **GooglePay更新前**: 简单的 "Mozilla/5.0"
- **GooglePay更新后**: 完整的iPad Safari信息
- **原因**: 统一格式，避免显示空间挤压，提高可读性

## 🎯 适用场景

此更新适用于以下特定组合：
- **业务模式**: 非周期性订阅代扣
- **集成方式**: 前置组件绑定/激活
- **支付方式**: APPLEPAY 或 GOOGLEPAY
- **步骤**: STEP3 (后端支付方式绑定)

## 🧪 测试方法

1. 访问 `http://localhost:8000/index-full.html`
2. 选择 "非周期性订阅代扣"
3. 选择 "前置组件绑定 / 激活"
4. 分别选择 "APPLEPAY" 和 "GOOGLEPAY" 支付方式
5. 进入STEP3，验证代码块内容
6. 确认包含 `country` 和 `mitManagementUrl` 字段
7. 确认 `userAgent` 格式已统一

## ✅ 验证要点

- [ ] `country` 字段值为 "US"
- [ ] `mitManagementUrl` 字段已添加并标注为非必填
- [ ] `userAgent` 已统一为完整的iPad Safari格式
- [ ] ApplePay和GooglePay代码块结构一致
- [ ] 其他字段保持不变
- [ ] 代码块在对应支付方式下正确显示

## 📝 注意事项

1. **兼容性**: 此更新不影响CARD支付方式的代码块
2. **字段顺序**: 新增字段按照提供的顺序插入
3. **注释保持**: 所有字段注释保持完整
4. **动态更新**: 参数值仍然支持动态更新
5. **格式统一**: ApplePay和GooglePay使用相同的字段结构

## 🔄 相关文件

- **主要文件**: `prototype_new_ux/index-full.html`
- **代码块ID**: 
  - `np-component-applepay-request`
  - `np-component-googlepay-request`
- **影响范围**: 仅ApplePay和GooglePay支付方式的非周期性前置组件模式

## 📊 对比总结

| 字段 | 更新前 | 更新后 | 变更类型 |
|------|--------|--------|----------|
| country | 无 | "US" | 新增 |
| mitManagementUrl | 无 | "https://[your domain name]/[your subscription management URL]" | 新增 |
| userAgent (ApplePay) | 完整Facebook信息 | 简化iPad Safari信息 | 优化 |
| userAgent (GooglePay) | "Mozilla/5.0" | 完整iPad Safari信息 | 增强 |

## 🎉 更新完成

- ✅ ApplePay代码块已更新
- ✅ GooglePay代码块已更新  
- ✅ 字段结构已统一
- ✅ 格式已优化
- ✅ 代码块切换功能正常
- ✅ 服务器测试环境已启动

更新已完成，ApplePay和GooglePay模式下的代码块现在包含了所有必要的字段并使用统一的格式。

## 🧪 测试验证

测试服务器已启动在 `http://localhost:8000`，可以通过以下步骤验证更新：

1. 访问 `http://localhost:8000/index-full.html`
2. 选择 "非周期性订阅代扣"
3. 选择 "前置组件绑定 / 激活"
4. 分别选择 "APPLEPAY" 和 "GOOGLEPAY" 支付方式
5. 进入STEP3，验证代码块内容包含所有新增字段

所有更新已成功应用并可以正常使用。