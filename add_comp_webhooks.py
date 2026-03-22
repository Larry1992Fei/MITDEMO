
import sys

file_path = "c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Provide the Webhook blocks to be inserted
webhook_bind = """\
                                <div class="code-block" style="margin-top:0.75rem;">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind Success
                                        </div>
                                    </div>
                                    <div class="code-body">
                                        <pre>{
  <span class="jk">"code"</span>: <span class="js">"0000"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"tradeNo"</span>: <span class="js">"TRD20260310XXX"</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>,
    <span class="jk">"paymentTokenID"</span>:
      <span class="js">"PMTOKEN177XXXXX1000551"</span>,
    <span class="jk">"userId"</span>: <span class="js">"test1111111"</span>
  }
}</pre>
                                    </div>
                                </div>"""

webhook_np_bind = """\
                                <div class="code-block" style="margin-top:0.75rem;">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind/Pay Success
                                        </div>
                                    </div>
                                    <div class="code-body">
                                        <pre>{
  <span class="jk">"code"</span>: <span class="js">"0000"</span>,
  <span class="jk">"data"</span>: {
    <span class="jk">"tradeNo"</span>: <span class="js">"TRD20260310XXX"</span>,
    <span class="jk">"outTradeNo"</span>: <span class="js">"bind_1741..."</span>,
    <span class="jk">"status"</span>: <span class="js">"SUCCESS"</span>,
    <span class="jk">"paymentTokenID"</span>:
      <span class="js">"PMTOKEN177XXXXX1000551"</span>,
    <span class="jk">"userId"</span>: <span class="js">"test1111111"</span>,
    <span class="jk">"amount"</span>: <span class="jv" id="np-c-resp-amount">10</span>,
    <span class="jk">"currency"</span>: <span class="jv">"<span id="np-c-resp-currency">USD</span>"</span>
  }
}</pre>
                                    </div>
                                </div>
                                <div class="result-card success" style="margin-top:0.75rem;">
                                    <div class="result-icon">✓</div>
                                    <div>
                                        <div class="result-label">绑定/支付成功 — 获取 paymentTokenID</div>
                                        <div class="result-value"><strong>paymentTokenID</strong>:
                                            PMTOKEN177XXXXX1000551<br>
                                            <span
                                                style="color:var(--text-muted);font-size:.75rem">保存此token，商户可随时按业务需求发起后续扣款</span>
                                        </div>
                                    </div>
                                </div>"""

webhook_deduct = """\
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

# 2. Add Webhook to panel-m-3-bind
old_m3_bind_result_card = """\
                                <div class="result-card success" style="margin-top:0.75rem;">
                                    <div class="result-icon">✓</div>
                                    <div>
                                        <div class="result-label">绑定成功 — 获取 paymentTokenID</div>
                                        <div class="result-value">
                                            <strong>paymentTokenID</strong>: PMTOKEN20260310XXX<br>
                                            <span
                                                style="color:var(--text-muted);font-size:.75rem">保存此token，用于后续商户主动发起扣款</span>
                                        </div>
                                    </div>
                                </div>"""

content = content.replace(old_m3_bind_result_card, webhook_bind + "\n" + old_m3_bind_result_card, 1)

# 3. Add Webhook to panel-np-3-bind
# Response in panel-np-3-bind lacks a result-card, we insert after the code-block ends.
old_np3_bind_end = """\
}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NON-PERIODIC STEP 2/3: 首次创建绑定/支付订单 (panel-np-2) -->"""

new_np3_bind_end = """\
}</pre>
                                    </div>
                                </div>
""" + webhook_np_bind + """
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NON-PERIODIC STEP 2/3: 首次创建绑定/支付订单 (panel-np-2) -->"""

content = content.replace(old_np3_bind_end, new_np3_bind_end, 1)

# 4. Add Webhook to panel-np-4
old_np4_completion_banner = """\
                                <div class="completion-banner" style="margin-top:0.75rem;padding:1.5rem;">
                                    <div class="check-big"
                                        style="width:48px;height:48px;font-size:1.2rem;margin-bottom:.75rem;">✓
                                    </div>
                                    <div class="completion-title" style="font-size:1rem;">扣款成功！</div>
                                    <div class="completion-desc" style="font-size:0.8rem;">
                                        非周期性代扣完成，<br>
                                        商户可随时根据业务需求再次使用<br>
                                        <code
                                            style="background:rgba(255,255,255,.7);padding:2px 6px;border-radius:4px;font-size:.75rem;">paymentTokenID</code>
                                        发起新的扣款
                                    </div>
                                </div>"""

content = content.replace(old_np4_completion_banner, webhook_deduct + "\n" + old_np4_completion_banner, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updates applied.")
