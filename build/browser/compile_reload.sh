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

# Extract host URL
HOST=$(grep '"host"' "$SETTINGS_FILE" | sed 's/.*"host":[[:space:]]*"\([^"]*\)".*/\1/')

# Validate extracted values
if [ -z "$BROWSER_TYPE" ] || [ -z "$HOST" ]; then
    echo "Error: Could not extract browser type or host from settings.json"
    exit 1
fi

echo "Browser Type: $BROWSER_TYPE"
echo "Host: $HOST"

# Create the AppleScript content with substituted values
read -r -d '' APPLESCRIPT_CONTENT <<APPLESCRIPT_END
tell application "$BROWSER_TYPE"
	activate
	set theUrl to "$HOST"

	if (count every window) = 0 then
		make new window
	end if

	set found to false
	set theTabIndex to -1
	repeat with theWindow in every window
		set theTabIndex to 0
		repeat with theTab in every tab of theWindow
			set theTabIndex to theTabIndex + 1
			if theTab's URL = theUrl then
				set found to true
				exit repeat
			end if
		end repeat

		if found then
			exit repeat
		end if
	end repeat

	if found then
		tell theTab to reload
		set theWindow's active tab index to theTabIndex
		set index of theWindow to 1
	else
		tell window 1 to make new tab with properties {URL:theUrl}
	end if
end tell
APPLESCRIPT_END

echo "Compiling AppleScript..."

# Compile the AppleScript
echo "$APPLESCRIPT_CONTENT" | osacompile -o "$SCRIPT_DIR/browser/reload.scpt"

# Check if compilation was successful
if [ $? -eq 0 ]; then
    echo "Successfully compiled reload.scpt"
else
    echo "Error: Failed to compile AppleScript"
    exit 1
fi
