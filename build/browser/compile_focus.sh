#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd .. "$(dirname "$0")" && pwd)"

# Path to settings.json (one level above)
SETTINGS_FILE="$SCRIPT_DIR/settings.json"

# Check if settings.json exists
if [ ! -f "$SETTINGS_FILE" ]; then
    echo "Error: settings.json not found at $SETTINGS_FILE"
    exit 1
fi

# Extract values from settings.json using grep and sed
# Extract browser type
BROWSER_TYPE=$(grep '"type"' "$SETTINGS_FILE" | sed 's/.*"type":[[:space:]]*"\([^"]*\)".*/\1/')

# Extract browser title
BROWSER_TITLE=$(grep '"title"' "$SETTINGS_FILE" | sed 's/.*"title":[[:space:]]*"\([^"]*\)".*/\1/')

# Validate extracted values
if [ -z "$BROWSER_TYPE" ] || [ -z "$BROWSER_TITLE" ]; then
    echo "Error: Could not extract browser type or title from settings.json"
    exit 1
fi

echo "Browser Type: $BROWSER_TYPE"
echo "Chrome Title: $BROWSER_TITLE"

# Create the AppleScript content with substituted values
APPLESCRIPT_CONTENT="tell application \"$BROWSER_TYPE\" to set index of window 1 where title contains \"$BROWSER_TITLE\" to 1"

echo "Compiling AppleScript..."
echo "$APPLESCRIPT_CONTENT"

# Compile the AppleScript
echo "$APPLESCRIPT_CONTENT" | osacompile -o "$SCRIPT_DIR/browser/focus.scpt"

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "Successfully compiled focus.scpt"
else
    echo "Error: Failed to compile AppleScript"
    exit 1
fi
