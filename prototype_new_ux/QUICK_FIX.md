# Step 3 激活订阅计划 - API 模式优化

## 修改时间
2026-03-10

## 修改内容

### 1. 优化了 Step 3（激活订阅计划）的代码示例

在 `index-full.html` 中为 PayerMax托管模式的 Step 3 添加了完整的收银台模式和 API 模式代码示例。

### 2. 新增的代码示例

#### 收银台模式（Hosted_Checkout）
- 保持原有的收银台模式代码示例
- `integrate`: `"Hosted_Checkout"`
- 支持 CARD、ApplePay、GooglePay、APM

#### API 模式（Direct_Payment）
根据不同支付方式，添加了 4 种 API 模式代码示例：

##### API + CARD
- `integrate`: `"Direct_Payment"`
- `terminalType`: `"WEB"` / `"WAP"` / `"APP"`
- `osType`: `"ANDROID"` / `"IOS"`
- `paymentDetail.cardInfo`: 包含卡号、持卡人、有效期、CVV
- `paymentDetail.buyerInfo`: 包含用户信息

##### API + ApplePay
- `integrate`: `"Direct_Payment"`
- `terminalType`: `"APP"`（ApplePay 通常在 APP 端）
- `osType`: `"IOS"`（ApplePay 只支持 IOS）
- `applePayPaymentData`: Apple 支付要素解密后的参数
  - `paymentData`: 包含 version、data、signature、header
  - `paymentMethod`: 包含 displayName、network、type
  - `transactionIdentifier`: 交易标识符

##### API + GooglePay
- `integrate`: `"Direct_Payment"`
- `terminalType`: `"WEB"` / `"WAP"` / `"APP"`
- `osType`: `"ANDROID"`（GooglePay 主要在 ANDROID）
- `paymentDetail.googlePayDetails`: Google Pay 下单参数
  - `authMethod`: `"PAN_ONLY"` 或 `"CRYPTOGRAM_3DS"`
  - `pan`: 卡号
  - `expirationMonth` / `expirationYear`: 有效期
  - `cryptogram`: 密文
  - `eciIndicator`: ECI 指示器
  - `description`: 卡片描述
  - `cardNetwork`: 卡组织
  - `cardHolderFullName`: 持卡人姓名
- `paymentDetail.buyerInfo`: 包含用户信息

##### API + APM
- `integrate`: `"Direct_Payment"`
- `terminalType`: `"WEB"` / `"WAP"` / `"APP"`
- `osType`: `"ANDROID"` / `"IOS"`
- `country`: 必传（如 KR、MY、BR）
- `paymentDetail.paymentMethodType`: `"ONE_TOUCH"`
- `paymentDetail.targetOrg`: 目标机构（如 NAVERPAY、KAKAOPAY）
- `paymentDetail.buyerInfo`: 包含用户信息

### 3. 动态切换逻辑

在 `app-bundle.js` 中添加了 `initActivateModeSwitcher()` 和 `updateActivateCodeExample()` 函数：

- 监听集成方式（收银台/API/前置组件）的变化
- 监听支付方式（CARD/ApplePay/GooglePay/APM）的变化
- 根据用户选择动态显示对应的代码示例
- 更新集成方式说明卡片的内容

### 4. 用户体验优化

- 添加了集成方式说明卡片，清晰展示当前模式的特点
- 收银台模式和 API 模式的代码示例分别独立显示
- API 模式下，根据支付方式自动切换对应的代码示例
- 所有代码示例都包含详细的注释说明

## 参考文档

- **ApplePay + API**: https://docs-v2.payermax.com/doc-center/receipt/subscription/applepay/subscription-pmx-management.html#_4-2-api模式激活订阅计划
- **GooglePay + API**: https://docs-v2.payermax.com/doc-center/receipt/subscription/googlepay/subscription-pmx-management.html#_4-2-api模式激活订阅计划
- **CARD + API**: https://docs-v2.payermax.com/doc-center/receipt/subscription/subscription-integration.html#_3-2-api模式激活订阅计划
- **APM + API**: https://docs-v2.payermax.com/doc-center/receipt/subscription/apm/subscription-integration.html#_3-2-api模式激活订阅计划

## 测试建议

1. 打开 `index-full.html`
2. 选择 "PayerMax托管（周期性订阅）" 模式
3. 切换不同的集成方式（收银台/API/前置组件）
4. 切换不同的支付方式（CARD/ApplePay/GooglePay/APM）
5. 验证 Step 3 的代码示例是否正确切换
6. 检查代码示例中的参数是否符合文档要求

## 注意事项

- API 模式的代码示例中，`terminalType` 和 `osType` 是必填字段
- ApplePay 只支持 IOS 系统
- GooglePay 主要在 ANDROID 系统上使用
- APM 模式下 `country` 字段是必填的
- 所有 API 模式的返回结果都是直接返回支付状态，无需跳转收银台
