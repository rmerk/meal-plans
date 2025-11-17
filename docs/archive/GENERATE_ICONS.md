# Generate PWA Icons

The PWA manifest requires icon files at different sizes. Use the `icon.svg` file to generate PNGs:

## Method 1: Using rsvg-convert (Linux/Mac)
```bash
# Install librsvg (if not already installed)
# Ubuntu/Debian: sudo apt-get install librsvg2-bin
# Mac: brew install librsvg

# Generate icons
rsvg-convert -w 192 -h 192 icon.svg > icon-192.png
rsvg-convert -w 512 -h 512 icon.svg > icon-512.png
```

## Method 2: Using ImageMagick
```bash
# Install ImageMagick (if not already installed)
# Ubuntu/Debian: sudo apt-get install imagemagick
# Mac: brew install imagemagick

# Generate icons
convert -background none -resize 192x192 icon.svg icon-192.png
convert -background none -resize 512x512 icon.svg icon-512.png
```

## Method 3: Using Online Tools
1. Go to https://realfavicongenerator.net/
2. Upload `icon.svg`
3. Generate and download all icon sizes
4. Extract `icon-192.png` and `icon-512.png` to the root directory

## Method 4: Using Node.js (sharp)
```bash
npm install sharp
node -e "
const sharp = require('sharp');
sharp('icon.svg').resize(192, 192).toFile('icon-192.png');
sharp('icon.svg').resize(512, 512).toFile('icon-512.png');
"
```

After generating the icons, they should be placed in the root directory:
- `/icon-192.png` (192x192 pixels)
- `/icon-512.png` (512x512 pixels)

These will be used by the PWA manifest for the app icon when users "Add to Home Screen".
