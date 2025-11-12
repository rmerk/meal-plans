#!/bin/bash
# Script to create a new meal plan from template
# Usage: ./scripts/new-plan.sh "Week 4 Meals" "week4-meals"

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check arguments
if [ "$#" -lt 2 ]; then
    echo -e "${YELLOW}Usage: $0 \"Plan Title\" \"filename\" [color]${NC}"
    echo ""
    echo "Example: $0 \"Week 4 Meals\" \"week4-meals\" \"teal\""
    echo ""
    echo "Available colors: emerald, amber, orange, red, blue, purple, teal, pink, indigo"
    exit 1
fi

PLAN_TITLE="$1"
FILENAME="$2"
COLOR="${3:-emerald}"  # Default to emerald if not provided

TEMPLATE="meals/_template.html"
OUTPUT="meals/${FILENAME}.html"

# Check if template exists
if [ ! -f "$TEMPLATE" ]; then
    echo -e "${YELLOW}Error: Template file not found at $TEMPLATE${NC}"
    exit 1
fi

# Check if output file already exists
if [ -f "$OUTPUT" ]; then
    echo -e "${YELLOW}Error: File $OUTPUT already exists!${NC}"
    echo "Please choose a different filename or delete the existing file."
    exit 1
fi

echo -e "${BLUE}Creating new meal plan...${NC}"
echo ""
echo "Title: $PLAN_TITLE"
echo "File: $OUTPUT"
echo "Color: $COLOR"
echo ""

# Copy template to new file
cp "$TEMPLATE" "$OUTPUT"

# Basic replacements (user will need to fill in the rest)
sed -i "s/{{PLAN_TITLE}}/${PLAN_TITLE}/g" "$OUTPUT"
sed -i "s/{{COLOR}}/${COLOR}/g" "$OUTPUT"
sed -i "s/{{NAV_TITLE}}/${PLAN_TITLE}/g" "$OUTPUT"

echo -e "${GREEN}✓ Created $OUTPUT${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit $OUTPUT and fill in the remaining placeholders:"
echo "   - {{DESCRIPTION}}, {{PREP_TIME}}, {{MEAL_COUNT}}, etc."
echo ""
echo "2. Add an entry to meals/plans.js:"
echo "   {"
echo "       file: \"${FILENAME}.html\","
echo "       title: \"${PLAN_TITLE}\","
echo "       subtitle: \"Your subtitle\","
echo "       category: \"meals\",  // or \"breakfast\""
echo "       color: \"${COLOR}\","
echo "       features: ["
echo "           \"Feature 1\","
echo "           \"Feature 2\","
echo "           \"Feature 3\""
echo "       ]"
echo "   },"
echo ""
echo "3. The plan will automatically appear on index.html!"
echo ""
echo -e "${GREEN}Happy cooking! 🍳${NC}"
