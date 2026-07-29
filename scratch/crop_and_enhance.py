from PIL import Image, ImageEnhance
import os

assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"

cans_path = os.path.join(assets_dir, "sahi_bond_7.jpg")
tubes_path = os.path.join(assets_dir, "sahi_bond_2.jpg")

if not os.path.exists(cans_path) or not os.path.exists(tubes_path):
    print("Error: Source images sahi_bond_7.jpg or sahi_bond_2.jpg do not exist in assets!")
    exit(1)

# Open Cans Image
img_cans = Image.open(cans_path)
w_cans, h_cans = img_cans.size

# Open Tubes Image
img_tubes = Image.open(tubes_path)
w_tubes, h_tubes = img_tubes.size

def enhance_img(img):
    # Enhance Saturation
    img = ImageEnhance.Color(img).enhance(1.2)
    # Enhance Contrast
    img = ImageEnhance.Contrast(img).enhance(1.15)
    # Enhance Sharpness (to make label text extra crisp)
    img = ImageEnhance.Sharpness(img).enhance(1.3)
    return img

# --- Crop Cans ---
# Width is 960, Height is 1280.
# We slice horizontally in thirds: col_w = 320.
# Cans vertically sit from y=240 to y=940 (height 700).
# Let's crop:
col_w = w_cans // 3

cpvc_can_raw = img_cans.crop((0, 240, col_w, 940))
upvc_can_raw = img_cans.crop((col_w, 240, 2*col_w, 940))
pvc_can_raw = img_cans.crop((2*col_w, 240, w_cans, 940))

# Enhance
cpvc_can = enhance_img(cpvc_can_raw)
upvc_can = enhance_img(upvc_can_raw)
pvc_can = enhance_img(pvc_can_raw)

# Save
cpvc_can.save(os.path.join(assets_dir, "cpvc_can.jpg"), quality=95)
upvc_can.save(os.path.join(assets_dir, "upvc_can.jpg"), quality=95)
pvc_can.save(os.path.join(assets_dir, "pvc_can.jpg"), quality=95)
print("Saved enhanced Cans: cpvc_can.jpg, upvc_can.jpg, pvc_can.jpg")

# --- Crop Tubes ---
# Width is 1280, Height is 816.
# PVC (top): y from 30 to 350
# UPVC (middle): y from 245 to 565
# CPVC (bottom): y from 460 to 780
# Height of each crop is 320. Width is 1280.
pvc_tube_raw = img_tubes.crop((0, 30, w_tubes, 350))
upvc_tube_raw = img_tubes.crop((0, 245, w_tubes, 565))
cpvc_tube_raw = img_tubes.crop((0, 460, w_tubes, 780))

# Enhance
pvc_tube = enhance_img(pvc_tube_raw)
upvc_tube = enhance_img(upvc_tube_raw)
cpvc_tube = enhance_img(cpvc_tube_raw)

# Save
pvc_tube.save(os.path.join(assets_dir, "pvc_tube.jpg"), quality=95)
upvc_tube.save(os.path.join(assets_dir, "upvc_tube.jpg"), quality=95)
cpvc_tube.save(os.path.join(assets_dir, "cpvc_tube.jpg"), quality=95)
print("Saved enhanced Tubes: pvc_tube.jpg, upvc_tube.jpg, cpvc_tube.jpg")
