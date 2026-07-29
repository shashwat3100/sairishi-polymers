import os

assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"
expected_files = [
    "cpvc_can.jpg",
    "cpvc_tube.jpg",
    "upvc_can.jpg",
    "upvc_purple_tube.jpg",
    "upvc_blue_tube.jpg",
    "pvc_can.jpg",
    "pvc_tube.jpg"
]

missing = []
for filename in expected_files:
    path = os.path.join(assets_dir, filename)
    if os.path.exists(path):
        print(f"[OK] Found asset: {filename} ({os.path.getsize(path)} bytes)")
    else:
        print(f"[MISSING] Missing asset: {filename}")
        missing.append(filename)

if missing:
    print(f"Error: {len(missing)} assets are missing!")
    exit(1)
else:
    print("All assets verified successfully!")
