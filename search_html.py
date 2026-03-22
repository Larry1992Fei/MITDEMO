import sys
with open('c:\\KFRJ\\MITDEMO\\prototype_new_ux\\index-full.html', encoding='utf-8') as f:
    lines = f.readlines()
with open('c:\\KFRJ\\MITDEMO\\prototype_new_ux\\search_res.txt', 'w', encoding='utf-8') as out:
    for i, l in enumerate(lines):
        if 'subscriptionPlan' in l or 'applyDropinSession' in l or 'applyDropinSession Request' in l:
            out.write(f"{i+1}: {l.strip()}\n")
