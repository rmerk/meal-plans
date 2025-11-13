#!/bin/bash
# Script to add PWA meta tags to all HTML files

# Define the files to update
FILES=(
    "index.html"
    "shopping-helper.html"
    "recipe-scaler.html"
    "rating-history.html"
    "nutrition-dashboard.html"
    "all-recipes.html"
    "meals/week2-meals.html"
    "meals/week3-meals.html"
    "meals/week1-breakfast.html"
    "meals/week2-breakfast.html"
    "meals/week3-breakfast.html"
)

# Function to add PWA meta tags if they don't exist
add_pwa_meta() {
    local file=$1
    local in_meals_dir=$2

    # Check if manifest link already exists
    if grep -q '<link rel="manifest"' "$file"; then
        echo "✓ $file already has PWA meta tags"
        return
    fi

    echo "Updating $file..."

    # Determine the correct path for manifest and mobile-utils
    if [ "$in_meals_dir" = "true" ]; then
        manifest_path="/manifest.json"
        mobile_utils_path="../mobile-utils.js"
    else
        manifest_path="/manifest.json"
        mobile_utils_path="mobile-utils.js"
    fi

    # Create a temporary file
    tmp_file=$(mktemp)

    # Process the file line by line
    while IFS= read -r line; do
        echo "$line" >> "$tmp_file"

        # After viewport meta tag, add PWA meta tags if not in meals dir
        if echo "$line" | grep -q '<meta name="viewport"' && [ "$in_meals_dir" = "false" ]; then
            # Check if next line already has theme-color
            if ! grep -A 1 '<meta name="viewport"' "$file" | grep -q 'theme-color'; then
                cat >> "$tmp_file" << 'EOF'
    <meta name="theme-color" content="#d4735e">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
EOF
            fi
        fi

        # After title tag, add manifest link
        if echo "$line" | grep -q '</title>' && ! grep -q 'manifest.json' "$file"; then
            echo "    <link rel=\"manifest\" href=\"$manifest_path\">" >> "$tmp_file"
        fi
    done < "$file"

    # Replace the original file
    mv "$tmp_file" "$file"
    echo "✓ Updated $file"
}

# Update each file
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        if [[ $file == meals/* ]]; then
            add_pwa_meta "$file" "true"
        else
            add_pwa_meta "$file" "false"
        fi
    else
        echo "⚠ File not found: $file"
    fi
done

echo "Done!"
