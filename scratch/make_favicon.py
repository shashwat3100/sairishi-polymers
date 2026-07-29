import os
from PIL import Image

def make_square_favicon(img_path, output_png_path):
    print(f"Loading image from: {img_path}")
    img = Image.open(img_path)
    img = img.convert("RGBA")
    
    # Get the bounding box of non-transparent pixels to crop excess whitespace
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        print(f"Cropped transparent border. New size: {img.size}")
        
    width, height = img.size
    max_dim = max(width, height)
    
    # Create a new square image with a transparent background
    square_img = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))
    
    # Paste the original image centered
    offset_x = (max_dim - width) // 2
    offset_y = (max_dim - height) // 2
    square_img.paste(img, (offset_x, offset_y), img)
    
    # Save as PNG
    print(f"Saving square PNG to: {output_png_path}")
    square_img.save(output_png_path, "PNG")
    
    # Also save as .ico (standard sizes: 16x16, 32x32, 48x48)
    ico_path = os.path.splitext(output_png_path)[0] + ".ico"
    print(f"Saving ICO to: {ico_path}")
    square_img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

# Process for React public folder
make_square_favicon(
    "react-version/public/assets/png_saairishi.png",
    "react-version/public/favicon.png"
)

# Copy to root assets folder for static HTML
if os.path.exists("assets/png_saairishi.png"):
    make_square_favicon(
        "assets/png_saairishi.png",
        "assets/favicon.png"
    )
