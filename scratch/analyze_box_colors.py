from PIL import Image
import os

artifact_dir = r"C:\Users\Shashwat\\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1"
img_path = os.path.join(artifact_dir, "media__1779995311690.jpg")

if not os.path.exists(img_path):
    print("Error: Target media__1779995311690.jpg does not exist!")
    exit(1)

img = Image.open(img_path)
w, h = img.size

# Let's inspect the RGB profile of rows.
# For each row, we'll calculate the average RGB values
print(f"Image dimensions: {w}x{h}")
for y in range(0, h, 5):
    # Get average RGB of the middle 50% of the row (to avoid left/right white margins)
    start_x = int(w * 0.25)
    end_x = int(w * 0.75)
    pixels = [img.getpixel((x, y)) for x in range(start_x, end_x)]
    
    avg_r = sum(p[0] for p in pixels) / len(pixels)
    avg_g = sum(p[1] for p in pixels) / len(pixels)
    avg_b = sum(p[2] for p in pixels) / len(pixels)
    
    # Classify color:
    # Yellow (CPVC): R > 200, G > 180, B < 80
    # Blue (UPVC): R < 120, G > 140, B > 200
    # Grey (PVC): |R-G| < 10, |G-B| < 10, R > 150, R < 220
    # Background (White/Off-white): R > 220, G > 220, B > 220
    
    color_label = "Background"
    if avg_r > 200 and avg_g > 170 and avg_b < 100:
        color_label = "YELLOW (CPVC)"
    elif avg_r < 150 and avg_g > 130 and avg_b > 180:
        color_label = "BLUE (UPVC)"
    elif avg_r > 140 and avg_r < 185 and avg_g > 140 and avg_g < 185 and avg_b > 140 and avg_b < 185:
        color_label = "GREY (PVC)"
    elif avg_r > 150 and avg_r < 180 and avg_g > 140 and avg_g < 170 and avg_b > 180:
        color_label = "PURPLE (UPVC)"
        
    print(f"y={y:3d}: R={avg_r:5.1f}, G={avg_g:5.1f}, B={avg_b:5.1f} -> {color_label}")
