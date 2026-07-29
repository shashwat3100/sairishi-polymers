from PIL import Image
import os

artifact_dir = r"C:\Users\Shashwat\\.gemini\antigravity-ide\brain\ed20820c-1f46-4533-ac72-91e5b6d6aaa1"
img_path = os.path.join(artifact_dir, "media__1779995311690.jpg")

if not os.path.exists(img_path):
    print("Error: Target media__1779995311690.jpg does not exist!")
    exit(1)

img = Image.open(img_path)
w, h = img.size
gray = img.convert("L")

print(f"Analyzing {img_path} (width={w}, height={h}) for white separator rows:")
# Let's print out the average row brightness for each row to see where the transitions are
row_brightness = []
for y in range(h):
    row_pixels = [gray.getpixel((x, y)) for x in range(w)]
    avg_brightness = sum(row_pixels) / w
    row_brightness.append((y, avg_brightness))

# Print row averages around the expected transition boundaries (around 140-160, 290-310, 440-460)
def print_range(label, start, end):
    print(f"\n--- {label} (y={start} to y={end}) ---")
    for y in range(start, end):
        if y < h:
            print(f"y={y:3d}: avg={row_brightness[y][1]:.2f}")

print_range("PVC to UPVC-Purple Transition", 130, 170)
print_range("UPVC-Purple to UPVC-Blue Transition", 280, 320)
print_range("UPVC-Blue to CPVC-Yellow Transition", 435, 475)
