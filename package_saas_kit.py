import os
import zipfile

ROOT_DIR = r"G:\AI Games\Research\ApexSaaS_AI_NextJS_Kit"
OUTPUT_DIR = r"G:\AI Games\Research\ApexSaaS_AI_NextJS_Kit\gumroad_assets"

# Folders / files to exclude
EXCLUDE_DIRS = {".git", ".next", "node_modules", "gumroad_assets", "__pycache__"}
EXCLUDE_FILES = {".DS_Store", "package_saas_kit.py"}

def create_starter_zip():
    zip_path = os.path.join(OUTPUT_DIR, "ApexSaaS_AI_Starter_Kit.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            # Prune directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                if file in EXCLUDE_FILES:
                    continue
                # For starter kit, exclude the UNLIMITED_PRO_LICENSE
                if file == "UNLIMITED_PRO_LICENSE.md":
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                zipf.write(full_path, os.path.join("ApexSaaS_AI_Starter_Kit", rel_path))
    print(f"[SUCCESS] Created Starter Zip: {zip_path} ({os.path.getsize(zip_path) / 1024:.1f} KB)")

def create_pro_zip():
    zip_path = os.path.join(OUTPUT_DIR, "ApexSaaS_AI_Unlimited_Pro.zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(ROOT_DIR):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                if file in EXCLUDE_FILES:
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, ROOT_DIR)
                zipf.write(full_path, os.path.join("ApexSaaS_AI_Unlimited_Pro", rel_path))
    print(f"[SUCCESS] Created Pro Zip: {zip_path} ({os.path.getsize(zip_path) / 1024:.1f} KB)")

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    create_starter_zip()
    create_pro_zip()
