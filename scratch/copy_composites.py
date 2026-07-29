from PIL import Image
import os

artifact_dir = r"C:\Users\Shashwat\\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1"
assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"

cans_src = os.path.join(artifact_dir, "media__1779994944423.png")
tubes_src = os.path.join(artifact_dir, "media__1779995311690.jpg")

if not os.path.exists(cans_src) or not os.path.exists(tubes_src):
    print("Error: Composite source files are missing in artifact directory!")
    exit(1)

# Open and save cans image (preserve PNG)
img_cans = Image.open(cans_src)
img_cans.save(os.path.join(assets_dir, "sahi_bond_cans_white.png"), optimize=True)
print("Saved assets/sahi_bond_cans_white.png")

# Open and save tubes image (preserve JPEG)
img_tubes = Image.open(tubes_src)
img_tubes.save(os.path.join(assets_dir, "sahi_bond_tubes_white.jpg"), quality=95)
print("Saved assets/sahi_bond_tubes_white.jpg")
