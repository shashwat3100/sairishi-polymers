from PIL import Image
import os

artifact_dir = r"C:\Users\Shashwat\\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1"
img_path = os.path.join(artifact_dir, "media__1779994944423.png")

if not os.path.exists(img_path):
    print("Error: Target media__1779994944423.png does not exist in artifact folder!")
    exit(1)

img = Image.open(img_path)
w, h = img.size
print(f"Target Image Size: Width={w}, Height={h}")
