# PayerMax托管前置组件模式步骤更新

## 更新概述
为PayerMax托管（周期性订阅）+ 前置组件绑定/激活模式添加了新的STEP4：后端支付方式绑定。

## 更改详情

### 1. 步骤配置更新 (js/app-bundle.js)

**原步骤结构：**
- Step 1: 配置订阅参数
- Step 2: 创建订阅计划  
- Step 3: 加载前置组件
- Step 4: 完成订阅激活

**新步骤结构：**
- Step 1: 配置订阅参数
- Step 2: 创建订阅计划
- Step 3: 加载前置组件 → 返回 paymentToken
- **Step 4: 后端支付方式绑定** ← **新增**
- Step 5: 完成订阅激活 ← **原Step 4**

### 2. HTML面板更新 (index-full.html)

#### 新增面板：panel-pm-4-bind
- **功能**：使用前置组件获取的 paymentToken 和 sessionKey 调用 orderAndPay API
- **API调用**：orderAndPay (Direct_Payment模式)
- **关键参数**：
  ```json
  {
    "integrate": "Direct_Payment",
    "subscriptionPlan": {
      "subscriptionNo": "SUB2026XXXxxxxxx2112"
    },
    "paymentDetail": {
      "paymentToken": "CPT4f200d278f3a454b9e91c81edc641e2b",
      "sessionKey": "bdsf8982348974hhf82934bf8239424",
      "mitType": "SCHEDULED",
      "tokenForFutureUse": true,
      "merchantInitiated": false
    }
  }
  ```

#### 更新面板：panel-pm-4 → panel-pm-5
- 将原来的"完成订阅激活"面板ID从 `panel-pm-4` 改为 `panel-pm-5`

### 3. 按钮标签更新

**原标签：**
```javascript
['下一步：创建订阅计划', '下一步：加载前置组件', '下一步：完成激活', '完成']
```

**新标签：**
```javascript
['下一步：创建订阅计划', '下一步：加载前置组件', '下一步：后端支付绑定', '下一步：完成激活', '完成']
```

### 4. 提示信息更新

**新增提示：**
```javascript
'💡 调用 orderAndPay API 完成后端支付绑定'
```

### 5. 动态更新函数扩展

在 `updateDynamic()` 函数中添加了对新面板元素的更新：
```javascript
// Update PayerMax step 4 - Component bind orderAndPay
setText('pm-comp-amount', activateAmount);
setText('pm-comp-currency', currency);
```

## 业务流程

### 更新后的完整流程：

1. **Step 1**: 用户配置订阅参数
2. **Step 2**: 后端调用 `subscriptionCreate` 创建订阅计划，获取 `subscriptionNo`
3. **Step 3**: 
   - 后端调用 `applyDropinSession` 获取 `sessionKey`
   - 前端初始化组件，用户完成支付操作
   - 前端获取 `paymentToken`
4. **Step 4** (新增): 
   - 后端使用 `paymentToken` + `sessionKey` + `subscriptionNo` 调用 `orderAndPay`
   - 完成支付方式绑定并激活订阅计划
   - 返回 `paymentTokenID` 用于后续代扣
5. **Step 5**: 订阅激活完成，PayerMax自动管理后续扣款

## 参考文档
- [PayerMax订阅集成文档 - 3.3 前置组件模式激活订阅计划](https://docs-v2.payermax.com/doc-center/receipt/subscription/subscription-integration.html#_3-3-%E5%89%8D%E7%BD%AE%E7%BB%84%E4%BB%B6%E6%A8%A1%E5%BC%8F%E6%BF%80%E6%B4%BB%E8%AE%A2%E9%98%85%E8%AE%A1%E5%88%92)

## 更新完成时间
2026-03-10