from PIL import Image
import os

assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"

def profile(filename):
    path = os.path.join(assets_dir, filename)
    img = Image.open(path)
    w, h = img.size
    gray = img.convert("L")
    print(f"\n--- PROFILE OF {filename} (height={h}) ---")
    for y in range(0, h, 20):
        row = [gray.getpixel((x, y)) for x in range(w)]
        avg = sum(row) / len(row)
        print(f"y={y:4d}: avg={avg:6.1f}")

profile("sahi_bond_7.jpg")
