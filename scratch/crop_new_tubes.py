from PIL import Image
import os

artifact_dir = r"C:\Users\Shashwat\\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1"
assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"
react_assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\react-version\public\assets"

img_path = os.path.join(artifact_dir, "media__1779995311690.jpg")

if not os.path.exists(img_path):
    print("Error: Source image media__1779995311690.jpg does not exist!")
    exit(1)

# Open image
img = Image.open(img_path)
w, h = img.size

# Slice boxes with mathematical precision:
# 1. PVC Box (Grey, 1st): y in [12, 182]
pvc_box = img.crop((0, 12, w, 182))

# 2. UPVC Purple Box (Purple, 2nd): y in [192, 348]
upvc_purple_box = img.crop((0, 192, w, 348))

# 3. UPVC Blue Box (Blue, 3rd): y in [367, 482]
upvc_blue_box = img.crop((0, 367, w, 482))

# 4. CPVC Box (Yellow, 4th): y in [497, 607]
cpvc_box = img.crop((0, 497, w, 607))

# Save to root assets and react assets
for target_dir in [assets_dir, react_assets_dir]:
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)
    pvc_box.save(os.path.join(target_dir, "pvc_tube.jpg"), quality=95)
    upvc_purple_box.save(os.path.join(target_dir, "upvc_purple_tube.jpg"), quality=95)
    upvc_blue_box.save(os.path.join(target_dir, "upvc_blue_tube.jpg"), quality=95)
    cpvc_box.save(os.path.join(target_dir, "cpvc_tube.jpg"), quality=95)
    # Also copy blue box to default upvc_tube.jpg to maintain backwards compatibility
    upvc_blue_box.save(os.path.join(target_dir, "upvc_tube.jpg"), quality=95)

print("Successfully cropped all 4 boxes, including both UPVC boxes (Purple & Blue) and synchronized to both directories!")

