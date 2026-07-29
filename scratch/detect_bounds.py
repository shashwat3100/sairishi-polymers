from PIL import Image
import os

assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"

def analyze_image(filename):
    path = os.path.join(assets_dir, filename)
    img = Image.open(path)
    w, h = img.size
    print(f"Analyzing {filename}: Width={w}, Height={h}")
    
    # Let's find non-black bounding box or key color changes
    # We can inspect rows and columns
    # Let's print average brightness per row to find where the subject is
    gray = img.convert("L")
    row_averages = [sum(gray.getpixel((x, y)) for x in range(w)) / w for y in range(h)]
    
    # Find first row with avg brightness > 30 (subject start)
    start_y = 0
    for y, avg in enumerate(row_averages):
        if avg > 30:
            start_y = y
            break
            
    # Find last row from bottom with avg brightness > 50 (subject end / table top boundary)
    end_y = h - 1
    for y in range(h - 1, -1, -1):
        if row_averages[y] > 50:
            # We want to find where the table top begins or where the cans end
            pass
            
    print(f"Row averages sample: top 10={row_averages[:10]}, bottom 10={row_averages[-10:]}")
    # Let's write a script to save multiple test crops to see where they are
    
analyze_image("sahi_bond_7.jpg")
analyze_image("sahi_bond_2.jpg")
