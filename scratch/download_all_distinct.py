import urllib.request
import os

distinct_photos = {
    "sahi_bond_1.jpg": "1-4o35dxareMkD6c0jehWQyoNgbdNQtgT",
    "sahi_bond_2.jpg": "1w_THsrvt4dmIHqQz5OcBk7X8d7_yBhS2",
    "sahi_bond_3.jpg": "1m6XPAo2mq0cqcp995Mlex3bj9Dqi3QZN",
    "sahi_bond_4.jpg": "1TnV70Kp38hrQLFBgy6h6J0slMfWNyMfw",
    "sahi_bond_5.jpg": "1x2V6bNi6djGvYdizV3BQiX2RwPUBSCcg",
    "sahi_bond_6.jpg": "1WkftkR346ty1rCA6uJLDyG0qYPCAYgcG",
    "sahi_bond_7.jpg": "1dCrD_F1SPtyvazbf3YYCpMgi32l8IjYh"
}

assets_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\assets"
if not os.path.exists(assets_dir):
    os.makedirs(assets_dir)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

print("--- DOWNLOADING ALL 7 DISTINCT PRODUCT IMAGES ---")
for filename, file_id in distinct_photos.items():
    download_url = f"https://docs.google.com/uc?export=download&id={file_id}"
    target_path = os.path.join(assets_dir, filename)
    print(f"Downloading {filename} (ID: {file_id}) from {download_url}...")
    try:
        req = urllib.request.Request(download_url, headers=headers)
        with urllib.request.urlopen(req) as response:
            data = response.read()
            with open(target_path, 'wb') as out_file:
                out_file.write(data)
        print(f"Successfully downloaded {filename} to {target_path} (Size: {len(data)} bytes)")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
    print("-" * 50)
