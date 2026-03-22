import sys

file_path = "c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()
    lines = content.splitlines(keepends=True)

# 1. Replace the single API Response block (display sub-tabs for each payment method)
old_api_resp = """                                        <pre>{
  <span class="jk">"code"</span>: <span class="js">"0000"</span>,
  <span class="jk">"message"</span>: <span class="js">"success"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"tradeNo"</span>: <span class="js">"TRD20260310XXX"</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>, <span class="jc">// API模式直接返回支付结果</span>
    <span class="jk">"paymentTokenID"</span>: <span class="js">"PMTOKEN20260310XXX"</span> <span class="jc">// 用于后续代扣的Token</span>
  }
}</pre>"""

new_api_resp = """                                        <!-- API Response - CARD -->
                                        <div id="api-resp-card" style="display:block;">
                                            <span class="jc">// CARD响应参数（需进行3DS验证时）</span>
                                            <pre>{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"redirectUrl"</span>: <span class="js">"https://cashier..."</span>, <span class="jc">// 3ds挑战页地址</span>
    <span class="jk">"outTradeNo"</span>: <span class="js">"APIFOXDEV1745388079422"</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2025042306527802000033"</span>,
    <span class="jk">"status"</span>: <span class="js">"PENDING"</span>
  }
}</pre>
                                        </div>
                                        <!-- API Response - APPLEPAY -->
                                        <div id="api-resp-applepay" style="display:none;">
                                            <pre>{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"outTradeNo"</span>: <span class="js">"APIFOXDEV1745388079422"</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2025042306527802000033"</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>
  }
}</pre>
                                        </div>
                                        <!-- API Response - GOOGLEPAY -->
                                        <div id="api-resp-googlepay" style="display:none;">
                                            <span class="jc">// 当paymentDetail.googlePayDetails.authMethod=PAN_ONLY时，响应参数redirecUrl将返回3ds验证地址；当paymentDetail.googlePayDetails.authMethod=CRYPTOGRAM_3DS时，响应参数中不会返回redirecUrl。</span>
                                            <pre><span class="jc">// CRYPTOGRAM_3DS响应参数</span>
{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"outTradeNo"</span>: <span class="js">"APIFOXDEV1745388079422"</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2025042306527802000033"</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>
  }
}
<span class="jc">// PAN_ONLY响应参数</span>
{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"redirectUrl"</span>: <span class="js">"https://cashier..."</span>, <span class="jc">// 3ds地址</span>
    <span class="jk">"outTradeNo"</span>: <span class="js">"APIFOXDEV1745388079422"</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2025042306527802000033"</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>
  }
}</pre>
                                        </div>
                                        <!-- API Response - APM -->
                                        <div id="api-resp-apm" style="display:none;">
                                            <pre>{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"redirectUrl"</span>: <span class="js">"https://cashier..."</span>, <span class="jc">// 跳转地址</span>
    <span class="jk">"outTradeNo"</span>: <span class="js">"APIFOXDEV1745388079422"</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2025042306527802000033"</span>,
    <span class="jk">"status"</span>: <span class="js">"PENDING"</span>
  }
}</pre>
                                        </div>"""

content = content.replace(old_api_resp, new_api_resp, 1)

# 2. Replace the first Webhook block (non-component mode, lines ~1446)
old_webhook = """                                    <pre>{
  <span class="jk">"keyVersion"</span>: <span class="js">"1"</span>,
  <span class="jk">"merchantNo"</span>: <span class="js">"P01000116980333"</span>,
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"notifyTime"</span>: <span class="js">"2023-04-24T09:44:40.761Z"</span>,
  <span class="jk">"notifyType"</span>: <span class="js">"SUBSCRIPTION_PAYMENT"</span>,
  <span class="jk">"appId"</span>: <span class="js">"6c556bcd56c84652176b3c5abc389296"</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"subscriptionRequestId"</span>: <span class="js">"requestMWRkgX5iHaTmf45ePdEP"</span>,
    <span class="jk">"merchantNo"</span>: <span class="js">"P01010113865434"</span>,
    <span class="jk">"userId"</span>: <span class="js">"10003"</span>,
    <span class="jk">"subscriptionPlan"</span>: {
      <span class="jk">"subscriptionNo"</span>: <span class="js">"SUB20221212174716894496912"</span>
    },
    <span class="jk">"subscriptionPaymentDetail"</span>: {
      <span class="jk">"subscriptionIndex"</span>: <span class="jv">1</span>, <span class="jc">// 扣款期数</span>
      <span class="jk">"paymentStatus"</span>: <span class="js">"SUCCESS"</span>, <span class="jc">// 本期订单状态</span>
      <span class="jk">"periodStartTime"</span>: <span class="js">"2025-10-13T15:59:59+0000"</span>, <span class="jc">// 本期开始时间</span>
      <span class="jk">"periodEndTime"</span>: <span class="js">"2025-12-13T15:59:59+0000"</span>, <span class="jc">// 本期结束时间</span>
      <span class="jk">"payAmount"</span>: { <span class="jc">// 扣款金额</span>
        <span class="jk">"amount"</span>: <span class="jv" id="w-amount">10</span>,
        <span class="jk">"currency"</span>: <span class="jv">"<span id="w-currency">USD</span>"</span>
      },
      <span class="jk">"paymentMethodType"</span>: <span class="js">"<span id="w-paymentMethodType">CARD</span>"</span>,
      <span class="jk">"cardOrg"</span>: <span class="js">"VISA"</span>,
      <span class="jk">"lastPaymentInfo"</span>: { 
        <span class="jk">"tradeToken"</span>: <span class="js">"T20221212174800970116912"</span>, <span class="jc">// 支付单号 tradeToken可用于发起退款</span>
        <span class="jk">"lastPaymentStatus"</span>: <span class="js">"SUCCESS"</span>, <span class="jc">// 最新扣款结果</span>
        <span class="jk">"payTime"</span>: <span class="js">"2025-02-13T15:59:59+0000"</span> <span class="jc">// 支付时间</span>
      }
    }
  }
}
</pre>"""

new_webhook = """                                    <pre>{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"redirectUrl"</span>: <span class="js">"https://cashier..."</span>,
    <span class="jk">"outTradeNo"</span>: <span class="js">"UATTest1774168793846"</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2026032208377782045789"</span>,
    <span class="jk">"status"</span>: <span class="js">"PENDING"</span>
  }
}
</pre>"""

count = content.count(old_webhook)
print(f"Webhook block 1 matches: {count}")
content = content.replace(old_webhook, new_webhook, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
