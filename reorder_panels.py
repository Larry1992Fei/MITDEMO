"""
Reorder right-side panels in index-full.html:

1. panel-m-2 right side (lines ~1923-1960): add Response block ABOVE existing Webhook
2. panel-m-3 right side (lines ~2055-2091): has only Response, add Webhook BELOW
3. panel-np-2 right side (lines ~2680-2720): add Response block ABOVE existing Webhook
4. panel-np-3 right side (lines ~2788-2824): has only Response, add Webhook BELOW
"""

file_path = "c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# === Helper blocks ===

# Response block to insert before Webhook in panel-m-2 and panel-np-2
response_block_bind = """\
                            <div>
                                <div class="sub-tabs">
                                    <div class="sub-tab active">📥 返回示例</div>
                                </div>
                                <div class="code-block">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            orderAndPay Response — Bind
                                        </div>
                                    </div>
                                    <div class="code-body">
                                        <pre>{
  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,
  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"redirectUrl"</span>: <span class="js">"https://cashier..."</span>, <span class="jc">// 跳转收银台地址</span>
    <span class="jk">"outTradeNo"</span>: <span class="js">"bind_1741..."</span>,
    <span class="jk">"tradeToken"</span>: <span class="js">"T2026032208327882045715"</span>,
    <span class="jk">"status"</span>: <span class="js">"PENDING"</span>
  }
}</pre>
                                    </div>
                                </div>
                            </div>
"""

# Webhook block to add after Response in panel-m-3 / panel-np-3 (deduct)
webhook_block_deduct = """
                                <div class="code-block" style="margin-top:0.75rem;">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Deduct Notification
                                        </div>
                                    </div>
                                    <div class="code-body">
                                        <pre>{
  <span class="jk">"code"</span>: <span class="js">"0000"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"tradeNo"</span>: <span class="js">"TRD_MCH_P2_2026"</span>,
    <span class="jk">"outTradeNo"</span>: <span class="js">"deduct_1741..."</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>,
    <span class="jk">"paymentMethodType"</span>: <span class="js">"CARD"</span>,
    <span class="jk">"amount"</span>: <span class="jv">9.99</span>,
    <span class="jk">"currency"</span>: <span class="js">"USD"</span>
  }
}</pre>
                                    </div>
                                </div>"""

# ==============================
# 1. Add Response block before Webhook in panel-m-2
# ==============================
OLD_M2_WEBHOOK_START = '''                            <div>
                                <div class="sub-tabs">
                                    <div class="sub-tab active">📥 Webhook 异步回调</div>
                                </div>
                                <div class="code-block">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind Success'''

content = content.replace(
    OLD_M2_WEBHOOK_START,
    response_block_bind + "\n" + OLD_M2_WEBHOOK_START,
    1  # only first occurrence = panel-m-2
)

# ==============================
# 2. Add Webhook block after Response in panel-m-3 (merchant deduct)
# ==============================
OLD_M3_RESULT_CARD = '''                                <div class="completion-banner" style="margin-top:0.75rem;padding:1.25rem;">
                                    <div class="check-big"
                                        style="width:40px;height:40px;font-size:1.1rem;margin-bottom:.75rem;">✓
                                    </div>
                                    <div class="completion-title" style="font-size:1rem;">扣款成功！</div>
                                    <div class="completion-desc" style="font-size:0.78rem;">
                                        商户自主管理扣款周期，<br>每次扣款均使用相同 paymentTokenID 发起
                                    </div>
                                </div>'''

content = content.replace(
    OLD_M3_RESULT_CARD,
    webhook_block_deduct + "\n" + OLD_M3_RESULT_CARD,
    1
)

# ==============================
# 3. Add Response block before Webhook in panel-np-2
# ==============================
# Second occurrence of "Webhook — Bind/Pay Success"
OLD_NP2_WEBHOOK_START = '''                            <div>
                                <div class="sub-tabs">
                                    <div class="sub-tab active">📥 Webhook 异步回调</div>
                                </div>
                                <div class="code-block">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind/Pay Success'''

content = content.replace(
    OLD_NP2_WEBHOOK_START,
    response_block_bind + "\n" + OLD_NP2_WEBHOOK_START,
    1
)

# ==============================
# 4. Add Webhook block after Response in panel-np-3 (non-periodic deduct)
# ==============================
OLD_NP3_RESULT_CARD = '''                                <div class="result-card success" style="margin-top:0.75rem;">
                                    <div class="result-icon">✓</div>
                                    <div>
                                        <div class="result-label">扣款成功</div>
                                        <div class="result-value">商户可根据业务需求重复调用此API进行后续扣款</div>
                                    </div>
                                </div>'''

content = content.replace(
    OLD_NP3_RESULT_CARD,
    webhook_block_deduct + "\n" + OLD_NP3_RESULT_CARD,
    1
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
