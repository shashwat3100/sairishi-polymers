import os

workspace_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi"

# Revert specific files:
# 1. index.html: og:image, and Slide 1 background
index_path = os.path.join(workspace_dir, "index.html")
if os.path.exists(index_path):
    with open(index_path, "r", encoding="utf-8") as f:
        content = f.read()
    # Revert meta tag
    content = content.replace('<meta property="og:image" content="assets/sahi_bond_4.jpg">', '<meta property="og:image" content="assets/hero_bg.png">')
    # Revert Slide 1
    content = content.replace('<div class="hero-slide active" style="background-image: url(\'assets/sahi_bond_4.jpg\');"></div>', '<div class="hero-slide active" style="background-image: url(\'assets/hero_bg.png\');"></div>')
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Reverted index.html backgrounds to assets/hero_bg.png")

# 2. about.html: header banner, and manufacturing layout
about_path = os.path.join(workspace_dir, "about.html")
if os.path.exists(about_path):
    with open(about_path, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("assets/sahi_bond_4.jpg", "assets/hero_bg.png")
    with open(about_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Reverted about.html backgrounds to assets/hero_bg.png")

# 3. products.html: header banner
products_path = os.path.join(workspace_dir, "products.html")
if os.path.exists(products_path):
    with open(products_path, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("assets/sahi_bond_4.jpg", "assets/hero_bg.png")
    with open(products_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Reverted products.html backgrounds to assets/hero_bg.png")

# 4. quality.html: header banner
quality_path = os.path.join(workspace_dir, "quality.html")
if os.path.exists(quality_path):
    with open(quality_path, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("assets/sahi_bond_4.jpg", "assets/hero_bg.png")
    with open(quality_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Reverted quality.html backgrounds to assets/hero_bg.png")

# 5. contact.html: header banner
contact_path = os.path.join(workspace_dir, "contact.html")
if os.path.exists(contact_path):
    with open(contact_path, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("assets/sahi_bond_4.jpg", "assets/hero_bg.png")
    with open(contact_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Reverted contact.html backgrounds to assets/hero_bg.png")
