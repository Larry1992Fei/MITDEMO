
"""
Fix panel-m-2 and panel-np-2: merge the Response block and Webhook block
into the SAME right-column <div>, so they stack vertically instead of
appearing as separate columns.
"""

file_path = "c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# In panel-m-2: the Response block ends with </div>\n\n and then a new <div> opens for Webhook
# We need to remove the closing </div> + opening <div> between them

# Fix 1: panel-m-2 — merge Response and Webhook Bind Success into same right column
OLD_M2_SEP = """\
                            </div>

                            <div>
                                <div class="sub-tabs">
                                    <div class="sub-tab active">📥 Webhook 异步回调</div>
                                </div>
                                <div class="code-block">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind Success"""

NEW_M2_SEP = """\
                                <div class="code-block" style="margin-top:0.75rem;">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind Success"""

count = content.count(OLD_M2_SEP)
print(f"panel-m-2 merge matches: {count}")
content = content.replace(OLD_M2_SEP, NEW_M2_SEP, 1)

# Fix 2: panel-np-2 — merge Response and Webhook Bind/Pay Success into same right column
OLD_NP2_SEP = """\
                            </div>

                            <div>
                                <div class="sub-tabs">
                                    <div class="sub-tab active">📥 Webhook 异步回调</div>
                                </div>
                                <div class="code-block">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind/Pay Success"""

NEW_NP2_SEP = """\
                                <div class="code-block" style="margin-top:0.75rem;">
                                    <div class="code-block-header">
                                        <div class="code-block-title">
                                            <div class="code-dot dot-red"></div>
                                            <div class="code-dot dot-yellow"></div>
                                            <div class="code-dot dot-green"></div>
                                            Webhook — Bind/Pay Success"""

count = content.count(OLD_NP2_SEP)
print(f"panel-np-2 merge matches: {count}")
content = content.replace(OLD_NP2_SEP, NEW_NP2_SEP, 1)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
