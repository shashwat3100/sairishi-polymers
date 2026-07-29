from PIL import Image
import os

artifact_dir = r"C:\Users\Shashwat\\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1"
assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"
react_assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\react-version\public\assets"

img_path = os.path.join(artifact_dir, "media__1779994944423.png")

if not os.path.exists(img_path):
    print("Error: Source image media__1779994944423.png do not exist!")
    exit(1)

# Open image
img = Image.open(img_path)
w, h = img.size

# Slicing:
# Left: CPVC
# Middle: UPVC
# Right: PVC
col_w = w // 3

cpvc_can_raw = img.crop((0, 0, col_w, h))
upvc_can_raw = img.crop((col_w, 0, 2*col_w, h))
pvc_can_raw = img.crop((2*col_w, 0, w, h))

def to_rgb_white(crop_img):
    # Create white canvas of same size
    white_bg = Image.new("RGB", crop_img.size, (255, 255, 255))
    if crop_img.mode in ('RGBA', 'LA') or (crop_img.mode == 'P' and 'transparency' in crop_img.info):
        # Paste transparent image over white
        white_bg.paste(crop_img, (0, 0), crop_img.convert('RGBA'))
    else:
        white_bg.paste(crop_img, (0, 0))
    return white_bg

cpvc_can = to_rgb_white(cpvc_can_raw)
upvc_can = to_rgb_white(upvc_can_raw)
pvc_can = to_rgb_white(pvc_can_raw)

# Save to root assets and react assets
for target_dir in [assets_dir, react_assets_dir]:
    if not os.path.exists(target_dir):
        os.makedirs(target_dir, exist_ok=True)
    cpvc_can.save(os.path.join(target_dir, "cpvc_can.jpg"), quality=95)
    upvc_can.save(os.path.join(target_dir, "upvc_can.jpg"), quality=95)
    pvc_can.save(os.path.join(target_dir, "pvc_can.jpg"), quality=95)

print("Successfully cropped, flattened, and synchronized new white-background cans to both directories!")

