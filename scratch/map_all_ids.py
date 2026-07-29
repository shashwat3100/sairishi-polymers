import re
import os

html_path = r"C:\Users\Shashwat\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1\.system_generated\steps\313\content.md"

with open(html_path, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Let's extract all strings in the HTML and print anything that correlates with our IDs
# We will do a regex search for any list elements in the JSON state payload.
# Public Google Drive folder payloads contain elements like:
# [id, name, mimeType, size, createdTime, ...]
# So we can search for the ID and look at the strings following it.
ids = [
    "1-4o35dxareMkD6c0jehWQyoNgbdNQtgT",
    "1w_THsrvt4dmIHqQz5OcBk7X8d7_yBhS2",
    "1m6XPAo2mq0cqcp995Mlex3bj9Dqi3QZN",
    "1TnV70Kp38hrQLFBgy6h6J0slMfWNyMfw",
    "1o6qViBWsxetnzN6IiX9R0uk5B2hUNpI-",
    "1x2V6bNi6djGvYdizV3BQiX2RwPUBSCcg",
    "1WkftkR346ty1rCA6uJLDyG0qYPCAYgcG",
    "1dlxnmk_ayQAcKwbPOyoj2rgdpH0qMOeE",
    "133hc5eSYolyQYXDytk2g5jGlB7zi7joY",
    "1dCrD_F1SPtyvazbf3YYCpMgi32l8IjYh"
]

print("--- RESOLVING ALL DRIVE FILE IDS ---")
for file_id in ids:
    pos = content.find(file_id)
    if pos != -1:
        # Search 1000 characters before and after
        window = content[max(0, pos-1000):min(len(content), pos+1000)]
        
        # In Google Drive pages, the name is typically another string within the same array or nearby.
        # Let's find all double-quoted strings in the window:
        quoted_strings = re.findall(r'\"([^\"]+)\"', window)
        # Filter out long random strings, UI elements, or keys
        cleaned_strings = []
        for s in quoted_strings:
            if s == file_id:
                continue
            if len(s) < 3 or len(s) > 100:
                continue
            if any(k in s for k in ["ssk", "type", "doc", "rcu", "click", "focus", "handled", "row", "qwPkcb"]):
                continue
            cleaned_strings.append(s)
            
        print(f"ID: {file_id}")
        print(f"  Nearby candidate strings: {list(set(cleaned_strings))}")
        print("-" * 50)
