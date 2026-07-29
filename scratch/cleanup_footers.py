import os
import glob

workspace_dir = r"c:\Users\Shashwat\OneDrive\Documents\sairishi"
html_files = glob.glob(os.path.join(workspace_dir, "*.html"))

target_segment_block = """            <div class="footer-col">
                <h3>Core Segments</h3>
                <ul class="footer-links">
                    <li><a href="products.html?cat=solvents" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> SAHI BOND® CPVC Solvents</a></li>
                    <li><a href="products.html?cat=frp" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> FRP Storage Tanks</a></li>
                    <li><a href="products.html?cat=packaging" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> Polypropylene Straps</a></li>
                    <li><a href="products.html?cat=fills" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> PVC Honeycomb Fills</a></li>
                </ul>
            </div>"""

replacement_segment_block = """            <div class="footer-col">
                <h3>Core Segments</h3>
                <ul class="footer-links">
                    <li><a href="products.html?cat=pvc" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> PVC Solvent Cement</a></li>
                    <li><a href="products.html?cat=upvc" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> UPVC Solvent Cement</a></li>
                    <li><a href="products.html?cat=cpvc" class="footer-link"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg> CPVC Solvent Cement</a></li>
                </ul>
            </div>"""

# Also handle cases where whitespace might be slightly different
target_segment_block_collapsed = "".join(target_segment_block.split())

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if target_segment_block in content:
        new_content = content.replace(target_segment_block, replacement_segment_block)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Successfully cleaned footer in {os.path.basename(filepath)} (exact match).")
    else:
        # Try a more flexible replacement
        # Let's search by lines
        lines = content.splitlines()
        found = False
        start_idx = -1
        end_idx = -1
        
        for i, line in enumerate(lines):
            if '<h3>Core Segments</h3>' in line:
                start_idx = i - 1  # grab the opening footer-col
                # search for closing </div>
                for j in range(i, len(lines)):
                    if '</ul>' in lines[j]:
                        end_idx = j + 1
                        if j + 1 < len(lines) and '</div>' in lines[j+1]:
                            end_idx = j + 2
                        break
                break
                
        if start_idx != -1 and end_idx != -1:
            # We found the block! Let's slice it out and replace it.
            # Build indentation from start_idx line
            indent = lines[start_idx].split('<')[0]
            new_lines = replacement_segment_block.replace("\n", "\n" + indent)
            # Prepend indent to the very first line as well
            new_lines = indent + new_lines
            
            lines[start_idx:end_idx] = [new_lines]
            new_content = "\n".join(lines)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Successfully cleaned footer in {os.path.basename(filepath)} (flexible match).")
        else:
            print(f"Warning: Could not find Core Segments block in {os.path.basename(filepath)}")
