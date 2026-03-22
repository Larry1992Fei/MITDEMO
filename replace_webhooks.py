import sys

file_path = "c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html"
with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_webhook_lines = [
'                                    <pre>{\r\n',
'  <span class="jk">"msg"</span>: <span class="js">"Success."</span>,\r\n',
'  <span class="jk">"code"</span>: <span class="js">"APPLY_SUCCESS"</span>,\r\n',
'  <span class="jk">"data"</span>: {\r\n',
'    <span class="jk">"redirectUrl"</span>: <span class="js">"https://cashier..."</span>,\r\n',
'    <span class="jk">"outTradeNo"</span>: <span class="js">"UATTest1774168793846"</span>,\r\n',
'    <span class="jk">"tradeToken"</span>: <span class="js">"T2026032208377782045789"</span>,\r\n',
'    <span class="jk">"status"</span>: <span class="js">"PENDING"</span>\r\n',
'  }\r\n',
'}</pre>\r\n',
]

replacements_done = 0
i = 0
new_lines = []
while i < len(lines):
    line = lines[i]
    # Detect start of an old-format webhook block by detecting the `"keyVersion"` line after a `<pre>{`
    if i + 2 < len(lines) and '<pre>{' in lines[i] and '"keyVersion"' in lines[i+1]:
        # scan forward to find the closing </pre>
        j = i
        while j < len(lines) and '}</pre>' not in lines[j]:
            j += 1
        # Replace from i to j (inclusive)
        new_lines.extend(new_webhook_lines)
        i = j + 1
        replacements_done += 1
    else:
        new_lines.append(line)
        i += 1

print(f"Replacements done: {replacements_done}")

with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)
