import re

with open("src/pages/Home.tsx", "r") as f:
    content = f.read()

# I will write a simple string splitting mechanism based on `{block_name.length > 0 && (`

blocks = [
    ("hero", "{hero && ("),
    ("marquee", "{marquee.length > 0 && ("),
    ("whatWeDo", "{whatWeDo.length > 0 && ("),
    ("partners", "{partners.length > 0 && ("),
    ("services", "{services.length > 0 && ("),
    ("testimonials", "{testimonials.length > 0 && ("),
    ("sisterCompanies", "{sisterCompanies.length > 0 && ("),
    ("cta", "<section className=\"relative z-10 border-y border-border bg-mist/60\">")
]

# We need to split the content accurately
def get_block_end(start_idx, is_cta=False):
    if is_cta:
        # CTA goes till the end of the div
        return content.find("    </div>\n  );\n}", start_idx)
        
    open_braces = 0
    in_block = False
    
    for i in range(start_idx, len(content)):
        if content[i] == '{':
            open_braces += 1
            in_block = True
        elif content[i] == '}':
            open_braces -= 1
            
        if in_block and open_braces == 0:
            return i + 1
            
    return -1

extracted = {}
for name, token in blocks:
    idx = content.find(token)
    if idx != -1:
        end_idx = get_block_end(idx, is_cta=(name == "cta"))
        extracted[name] = content[idx:end_idx].strip()

# Now reconstruct the body
new_order = [
    "hero",
    "marquee",
    "partners",
    "whatWeDo",
    "services",
    "sisterCompanies",
    "testimonials",
    "cta"
]

body_content = ""
for name in new_order:
    if name in extracted:
        body_content += "\n      " + extracted[name] + "\n"

# Replace the old body with the new body
# The body starts after `<div className="relative">\n      <LightField />`
start_body = content.find("<LightField />") + len("<LightField />")
end_body = content.find("    </div>\n  );\n}")

new_content = content[:start_body] + "\n" + body_content + "\n" + content[end_body:]

with open("src/pages/Home.tsx", "w") as f:
    f.write(new_content)

print("Reorganized Home.tsx")
