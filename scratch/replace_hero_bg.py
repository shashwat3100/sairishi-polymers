import os
import glob

workspace_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi"
html_files = glob.glob(os.path.join(workspace_dir, "*.html"))

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    if "assets/hero_bg.png" in content:
        # In index.html, replace og:image and slide background
        # In other files, replace subpage hero banner and images
        new_content = content.replace("assets/hero_bg.png", "assets/sahi_bond_4.jpg")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Successfully replaced generic background with sahi_bond_4.jpg in {os.path.basename(filepath)}")
