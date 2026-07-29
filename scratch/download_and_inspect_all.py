import urllib.request
import os

ids = [
    "1-4o35dxareMkD6c0jehWQyoNgbdNQtgT",
    "1w_THsrvt4dmIHqQz5OcBk7X8d7_yBhS2",
    "1m6XPAo2mq0cqcp995Mlex3bj9Dqi3QZN",
    "1TnV70Kp38hrQLFBgy6h6J0slMfWNyMfw",
    "1o6qViBWsxetnzN6IiX9R0uk5B2hUNpI-",
    "1x2V6bNi6djGvYdizV3BQiX2RwPUBSCcg",
    "1WkftkR346ty1rCA6uJLDyG0qYPCAYgcG",
    "1dlxnmk_ayQAcKwbPOyoj2rgdpH0qMOeE",
    "133hc5eSYolyQYXDytk2g5jGlB7zi7joY",
    "1dCrD_F1SPtyvazbf3YYCpMgi32l8IjYh"
]

temp_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi\scratch_downloads"
if not os.path.exists(temp_dir):
    os.makedirs(temp_dir)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

print("--- DOWNLOADING AND INSPECTING ALL 10 IDS ---")
for file_id in ids:
    download_url = f"https://docs.google.com/uc?export=download&id={file_id}"
    req = urllib.request.Request(download_url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            content_disposition = response.headers.get('Content-Disposition')
            filename = None
            if content_disposition:
                # E.g. attachment; filename="sahi_bond.png"
                parts = content_disposition.split('filename=')
                if len(parts) > 1:
                    filename = parts[1].replace('"', '').strip()
            
            if not filename:
                filename = f"file_{file_id}.bin"
                
            save_path = os.path.join(temp_dir, filename)
            data = response.read()
            with open(save_path, "wb") as f:
                f.write(data)
                
            print(f"ID: {file_id}")
            print(f"  Filename resolved: {filename}")
            print(f"  Size: {len(data)} bytes")
            print(f"  Saved to: {save_path}")
            print("-" * 50)
    except Exception as e:
        print(f"ID: {file_id} failed: {e}")
        print("-" * 50)
