import sys

file_path = "c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_webhook_content = """\
                                    <pre>{
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
        <span class="jk">"amount"</span>: <span class="jv">10</span>,
        <span class="jk">"currency"</span>: <span class="js">"USD"</span>
      },
      <span class="jk">"paymentMethodType"</span>: <span class="js">"<span id="W_PM_TYPE_PLACEHOLDER">CARD</span>"</span>,
      <span class="jk">"cardOrg"</span>: <span class="js">"VISA"</span>,
      <span class="jk">"lastPaymentInfo"</span>: {
        <span class="jk">"tradeToken"</span>: <span class="js">"T20221212174800970116912"</span>, <span class="jc">// 支付单号 tradeToken可用于发起退款</span>
        <span class="jk">"lastPaymentStatus"</span>: <span class="js">"SUCCESS"</span>, <span class="jc">// 最新扣款结果</span>
        <span class="jk">"payTime"</span>: <span class="js">"2025-02-13T15:59:59+0000"</span> <span class="jc">// 支付时间</span>
      }
    }
  }
}</pre>
"""

replacements_done = 0
i = 0
new_lines = []
placeholder_ids = ['w-pm4-paymentMethodType-noncomp', 'w-pm4-paymentMethodType-comp']

while i < len(lines):
    line = lines[i]
    # Detect old simple webhook block start: <pre>{\n\n  "msg"...
    if '<pre>{' in line and i + 1 < len(lines) and lines[i+1].strip() == '':
        # scan forward to find the closing  }</pre>
        j = i
        while j < len(lines) and '}</pre>' not in lines[j]:
            j += 1
        # Confirm this is an old simple block by checking it contains 'msg' and 'APPLY_SUCCESS'
        block_text = ''.join(lines[i:j+1])
        if '"msg"' in block_text and 'APPLY_SUCCESS' in block_text and '"keyVersion"' not in block_text:
            placeholder_id = placeholder_ids[min(replacements_done, len(placeholder_ids)-1)]
            new_block = new_webhook_content.replace('W_PM_TYPE_PLACEHOLDER', placeholder_id)
            new_lines.append(new_block)
            i = j + 1
            replacements_done += 1
        else:
            new_lines.append(line)
            i += 1
    else:
        new_lines.append(line)
        i += 1

print(f"Replacements done: {replacements_done}")

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)
