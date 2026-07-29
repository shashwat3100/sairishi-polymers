from PIL import Image
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
print(f"Cans Image Size: Width={w_cans}, Height={h_cans}")

# Open Tubes Image
img_tubes = Image.open(tubes_path)
w_tubes, h_tubes = img_tubes.size
print(f"Tubes Image Size: Width={w_tubes}, Height={h_tubes}")

# --- Crop Cans ---
# The cans are side-by-side. 
# Left is CPVC, Middle is UPVC, Right is PVC.
# Let's crop them horizontally:
# CPVC Can: x in [0, w_cans/3], y in [0, h_cans]
# UPVC Can: x in [w_cans/3, 2*w_cans/3], y in [0, h_cans]
# PVC Can: x in [2*w_cans/3, w_cans], y in [0, h_cans]

col_w = w_cans // 3
# Let's add some overlaps or padding shifts if needed, but simple split is a great start
cpvc_can = img_cans.crop((0, 0, col_w, h_cans))
upvc_can = img_cans.crop((col_w, 0, 2*col_w, h_cans))
pvc_can = img_cans.crop((2*col_w, 0, w_cans, h_cans))

cpvc_can.save(os.path.join(assets_dir, "cpvc_can.jpg"), quality=95)
upvc_can.save(os.path.join(assets_dir, "upvc_can.jpg"), quality=95)
pvc_can.save(os.path.join(assets_dir, "pvc_can.jpg"), quality=95)
print("Successfully cropped and saved individual Cans images!")

# --- Crop Tubes ---
# The tubes/boxes are stacked vertically/diagonally.
# Top-most is PVC (Silver/Grey)
# Middle is UPVC (Blue)
# Bottom-most is CPVC (Yellow)
# Let's split them vertically:
# Since they are laid out diagonally, a horizontal crop will contain parts of other boxes.
# Let's see: we can crop them with custom boxes.
# Let's print out and save a simple split to inspect, or do a vertical crop:
# Let's split h_tubes into three vertical segments:
row_h = h_tubes // 3

# Top section (PVC): y in [0, row_h + 50]
# Middle section (UPVC): y in [row_h - 50, 2*row_h + 50]
# Bottom section (CPVC): y in [2*row_h - 50, h_tubes]
pvc_tube = img_tubes.crop((0, 0, w_tubes, int(row_h * 1.1)))
upvc_tube = img_tubes.crop((0, int(row_h * 0.9), w_tubes, int(row_h * 2.1)))
cpvc_tube = img_tubes.crop((0, int(row_h * 1.9), w_tubes, h_tubes))

pvc_tube.save(os.path.join(assets_dir, "pvc_tube.jpg"), quality=95)
upvc_tube.save(os.path.join(assets_dir, "upvc_tube.jpg"), quality=95)
cpvc_tube.save(os.path.join(assets_dir, "cpvc_tube.jpg"), quality=95)
print("Successfully cropped and saved individual Tubes images!")
