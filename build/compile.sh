#!/bin/bash
# Juice Framework Build Script
# Compatible with BASH 3.2.57+
# Location: ~/Programs/HTML5/Juice/build/compile.sh

set -eo pipefail  # Removed 'u' flag to avoid array issues in BASH 3.2.57

# Error trap for debugging
trap 'echo "❌ Error occurred at line $LINENO. Exit code: $?" >&2' ERR

################################################################################
# GLOBAL CONFIGURATION
################################################################################

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly ROOT_DIR="$(dirname "${SCRIPT_DIR}")"

# Project Configuration
readonly VC_PACKAGE="Juice"
readonly VC_BRIEF="JavaScript Unified Interactive Creation Engine"
readonly DATE="$(date +%Y.%m.%d)"

# Path Configuration
readonly INPUT_FOLDER="${ROOT_DIR}/script/source"
readonly OUTPUT_DIRECTORY="${ROOT_DIR}/script/distro"
OUTPUT_FILE="${OUTPUT_DIRECTORY}/${VC_PACKAGE}.js"
OUTPUT_MIN="${OUTPUT_DIRECTORY}/${VC_PACKAGE}.min.js"

# Build Options
readonly OMIT_INCLUDE="${OMIT_INCLUDE:-false}"
readonly RELOAD_CHROME="${RELOAD_CHROME:-true}"

# Build Metadata
readonly BUILD_DATE="$(date +'%m-%d-%y')"
readonly BUILD_TIME="$(date +'%r')"
readonly BUILD_YEAR="$(date +'%Y')"

# Console Colors (BASH 3.2.57 compatible)
readonly FG_RED='\033[1;31m'
readonly FG_GREEN='\033[1;32m'
readonly FG_YELLOW='\033[1;33m'
readonly FG_PINK='\033[1;35m'
readonly FG_BLUE='\033[1;36m'
readonly FG_WHITE='\033[1;37m'
readonly NOCOLOR='\033[0m'

# Audio Files
readonly AUDIO_DIR="${ROOT_DIR}/assets/audio"
# readonly SOUND_START="${AUDIO_DIR}/start.mp3"
readonly SOUND_SHRINK="${AUDIO_DIR}/minify.mp3"
readonly SOUND_SUCCESS="${AUDIO_DIR}/compile/distro.mp3"
readonly SOUND_FAILURE="${AUDIO_DIR}/failure.mp3"

# File Processing
readonly FILE_REGEX='\.js$'

# Build State
BUILD_SUCCESS=true
PROCESSED_FILES=()
VERSION=""

################################################################################
# BUILD ORDER CONFIGURATION
################################################################################

# Critical: Maintain exact order for proper dependency resolution
readonly -a BUILD_ORDER=(
    "script/source/typedef/typedef.js"
    "script/source/components"
    "script/source/components/Types"
    "script/source/components/Utilities"
    "script/source/classes/Core/Subjects/Color"
    "script/source/classes/Core/Subjects/Staging/Properties"
    "script/source/classes/Core/Subjects/Staging"
    "script/source/classes/Core/Subjects/Color/Gradient/Abstracts"
    "script/source/classes/Core/Subjects/Color/Gradient/Properties"
    "script/source/classes/Core/Subjects/Color/Gradient"
    "script/source/classes/Core/Subjects"
    "script/source/classes/Core/Objects"
    "script/source/classes/Core/Objects/Properties"
    "script/source/classes/Core/Objects/Basic/Abstracts"
    "script/source/classes/Core/Objects/Basic"
    "script/source/classes/Core/Objects/Collections/Abstracts"
    "script/source/classes/Core/Objects/Collections"
    "script/source/classes/Core/Objects/Complex"
    "script/source/classes/Data-Structures"
    "script/source/classes/Templates"
)

################################################################################
# UTILITY FUNCTIONS
################################################################################

# Logging functions
log_info() {
    echo -e "${FG_BLUE}ℹ️  ${NOCOLOR}$*"
}

log_success() {
    echo -e "${FG_GREEN}✅  ${NOCOLOR}$*"
}

log_warning() {
    echo -e "${FG_YELLOW}⚠️  ${NOCOLOR}$*"
}

log_error() {
    echo -e "${FG_RED}❌  ${NOCOLOR}$*" >&2
}

log_section() {
    echo -e "\n${FG_PINK}📦  ${NOCOLOR}$*\n"
}

log_step() {
    echo -e "${FG_BLUE}🔧  ${NOCOLOR}$*"
}

# Audio feedback (with error suppression)
play_sound() {
    local sound_file="$1"
    if [[ -f "$sound_file" ]] && command -v afplay >/dev/null 2>&1; then
        afplay "$sound_file" 2>/dev/null || true
    fi
}

# Screen flash for errors
flash_screen() {
    if [[ "$TERM" != "dumb" ]]; then
        printf '\e[?5h' 2>/dev/null || true
        sleep 0.15
        printf '\e[?5l' 2>/dev/null || true
    fi
}

# Diagnostic function to check directory structure
check_directory_structure() {
    log_step "Checking directory structure..."
    log_info "Root directory: ${FG_WHITE}${ROOT_DIR}${NOCOLOR}"
    log_info "Script directory: ${FG_WHITE}${SCRIPT_DIR}${NOCOLOR}"
    echo

    # Check if main directories exist
    local -a check_paths=(
        "${ROOT_DIR}/docs"
        "${ROOT_DIR}/script"
        "${ROOT_DIR}/script/source"
        "${ROOT_DIR}/script/source/classes"
        "${ROOT_DIR}/script/source/components"
    )

    local path
    for path in "${check_paths[@]}"; do
        if [[ -d "$path" ]]; then
            log_success "Found: ${FG_BLUE}${path}${NOCOLOR}"
        else
            log_warning "Missing: ${FG_BLUE}${path}${NOCOLOR}"
        fi
    done 2>/dev/null

    # List what's actually in the script/source directory
    if [[ -d "${ROOT_DIR}/script/source" ]]; then
        echo
        log_info "Contents of ${FG_WHITE}script/source${NOCOLOR}:"
        find "${ROOT_DIR}/script/source" -type d -maxdepth 2 2>/dev/null | sort | while read -r dir; do
            echo "    📁  ${dir#${ROOT_DIR}/}"
        done
    fi

    echo
}

# Extract version from settings.json
get_version_from_settings() {
    local settings_file="${SCRIPT_DIR}/settings.json"

    if [[ ! -f "$settings_file" ]]; then
        log_warning "settings.json not found at: ${settings_file}"
        VERSION="0.0.0"
        return 1
    fi

    # Extract version using grep and sed (BASH 3.2.57 compatible)
    VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$settings_file" | sed 's/.*"\([^"]*\)".*/\1/')

    if [[ -z "$VERSION" ]]; then
        log_warning "Could not extract version from settings.json"
        VERSION="0.0.0"
        return 1
    fi

    log_info "Version extracted from settings.json: ${FG_WHITE}${VERSION}${NOCOLOR}"
    return 0
}

is_file_processed() {
    local file="$1"
    local processed_file
    for processed_file in "${PROCESSED_FILES[@]}"; do
        [[ "$file" == "$processed_file" ]] && return 0
    done
    return 1
}

# Mark file as processed
mark_file_processed() {
    local file="$1"
    PROCESSED_FILES+=("$file")
}

################################################################################
# BUILD FUNCTIONS
################################################################################

# Initialize build environment
initialize_build() {
    log_info "Initializing ${FG_PINK}${VC_PACKAGE}${NOCOLOR} build environment..."

    # Extract version from settings.json
    get_version_from_settings

    # Redeclare output files with version number
    OUTPUT_FILE="${OUTPUT_DIRECTORY}/${VC_PACKAGE}-v${VERSION}.js"
    OUTPUT_MIN="${OUTPUT_DIRECTORY}/${VC_PACKAGE}-v${VERSION}.min.js"

    # Clear all files from output directory
    rm -f "${OUTPUT_DIRECTORY}"/*

    # Create output directory if it doesn't exist
    mkdir -p "$OUTPUT_DIRECTORY"

    # Clean previous build
    [[ -f "$OUTPUT_FILE" ]] && rm -f "$OUTPUT_FILE"

    clear
    log_section "Building ${VC_PACKAGE} Framework"
}

# Generate file header
generate_header() {
    cat > "$OUTPUT_FILE" << EOF
// @program:        ${VC_PACKAGE}
// @brief:          ${VC_BRIEF}
// @author:         Justin D. Byrne
// @email:          justin@byrne-systems.com
// @version:        ${VERSION}
// @date:           ${DATE}
// @license:        GPL-2.0

"use strict";
EOF
}

# Generate GPL preamble
generate_preamble() {
    cat << EOF
/**
 * ${VC_PACKAGE} - ${VC_BRIEF}
 * Copyright (C) ${BUILD_YEAR}  Justin D. Byrne
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin St, Fifth Floor,
 * Boston, MA  02110-1301, USA.
 *
 * Byrne-Systems, hereby disclaims all copyright interest in
 * the library '${VC_PACKAGE}' (${VC_BRIEF}) written
 * by Justin D. Byrne. (justin@byrne-systems.com)
 */

EOF
}

# Insert individual file with duplicate prevention
insert_file() {
    local file_path="$1"

    # Resolve relative paths
    if [[ "$file_path" != /* ]]; then
        file_path="${ROOT_DIR}/$file_path"
    fi

    # Check if file exists and hasn't been processed
    if [[ ! -f "$file_path" ]]; then
        log_warning "File not found: ${FG_BLUE}$file_path${NOCOLOR}"
        return 1
    fi

    if is_file_processed "$file_path"; then
        log_info "Skipping duplicate: ${FG_WHITE}$(basename "$file_path")${NOCOLOR}"
        return 0
    fi

    # Insert file with blank line separator
    {
        echo
        cat "$file_path"
    } >> "$OUTPUT_FILE"

    mark_file_processed "$file_path"
    log_success "Inserted: ${FG_WHITE}$(basename "$file_path")${NOCOLOR}"
}

# Process directory with file ordering
process_directory() {
    local dir_path="$1"
    local section_name="$2"
    local -a js_files

    # Resolve relative paths
    if [[ "$dir_path" != /* ]]; then
        dir_path="${ROOT_DIR}/$dir_path"
    fi

    if [[ ! -d "$dir_path" ]]; then
        log_warning "Directory not found: ${FG_BLUE}$dir_path${NOCOLOR}"
        return 1
    fi

    echo >> "$OUTPUT_FILE"
    echo "////    ${section_name}    //////////////////////////////////////" >> "$OUTPUT_FILE"

    # Collect and sort JavaScript files
    while IFS= read -r -d '' file; do
        js_files+=("$file")
    done < <(find "$dir_path" -maxdepth 1 -name "*.js" -type f -print0 2>/dev/null | sort -z)

    # Process files in sorted order
    local file
    for file in "${js_files[@]}"; do
        insert_file "$file"
    done 2>/dev/null

    if [[ ${#js_files[@]} -gt 0 ]]; then
        log_success "Processed ${FG_WHITE}${#js_files[@]}${NOCOLOR} files from ${FG_BLUE}$(basename "$dir_path")${NOCOLOR}"
    else
        log_info "No JavaScript files found in ${FG_BLUE}$(basename "$dir_path")${NOCOLOR}"
    fi
}

# Collect includes from global search
collect_includes() {
    local -a include_files
    local includes_root="${HOME}/Programs/HTML5/Juice"

    log_info "Searching for include files..."

    # Find all _include directories and collect JS files
    while IFS= read -r -d '' include_dir; do
        while IFS= read -r -d '' js_file; do
            include_files+=("$js_file")
        done < <(find "$include_dir" -maxdepth 1 -name "*.js" -type f -print0 2>/dev/null)
    done < <(find "$includes_root" -type d -name "_include" -print0 2>/dev/null)

    # Process include files
    if [[ ${#include_files[@]} -gt 0 ]]; then
        echo >> "$OUTPUT_FILE"
        echo "////    INCLUDES    ////////////////////////////////////////" >> "$OUTPUT_FILE"

        local file
        for file in "${include_files[@]}"; do
            insert_file "$file"
        done 2>/dev/null

        log_success "Processed ${#include_files[@]} include files"
    fi
}

# Main compilation process
compile_juice() {
    log_step "Compiling ${FG_PINK}${VC_PACKAGE}${NOCOLOR} juice..."

    generate_header

    local item
    local section_name
    local full_path

    echo

    # Process each item in build order
    for item in "${BUILD_ORDER[@]}"; do
        full_path="${ROOT_DIR}/$item"

        if [[ -f "$full_path" ]]; then
            # Single file
            section_name="$(basename "$(dirname "$item")" | tr '[:lower:]' '[:upper:]')"
            echo >> "$OUTPUT_FILE"
            echo "////    ${section_name}    //////////////////////////////////////" >> "$OUTPUT_FILE"
            insert_file "$full_path"
        elif [[ -d "$full_path" ]]; then
            # Directory
            section_name="$(basename "$item" | tr '[:lower:]' '[:upper:]')"
            log_step "Processing ${FG_BLUE}$(basename "$item")${NOCOLOR} directory..."
            process_directory "$full_path" "$section_name"
        else
            log_warning "Build item not found: ${FG_BLUE}$item${NOCOLOR}"
            log_info "  Checked path: ${FG_WHITE}$full_path${NOCOLOR}"

            # Try to find similar directories
            local parent_dir="${full_path%/*}"
            if [[ -d "$parent_dir" ]]; then
                log_info "  Parent directory exists, contents:"
                find "$parent_dir" -maxdepth 1 -type d 2>/dev/null | sort | while read -r dir; do
                    echo "      📁  $(basename "$dir")"
                done
            fi
        fi
    done

    echo

    # Process includes if not omitted
    if [[ "$OMIT_INCLUDE" != "true" ]]; then
        collect_includes
    fi

    # play_sound "$SOUND_START"
    echo
    log_success "Framework compilation complete!"
    log_info "Output: ${FG_BLUE}${OUTPUT_FILE}${NOCOLOR}"
}

# Create minified version
create_minified() {
    log_step "Creating minified version..."

    if ! command -v uglifyjs >/dev/null 2>&1; then
        log_warning "uglifyjs not found - skipping minification"
        return 0
    fi

    log_info "Running uglifyjs compression..."

    if uglifyjs "$OUTPUT_FILE" --source-map -o "$OUTPUT_MIN" --compress --mangle reserved=['window','_instance'] 2>/dev/null; then
        log_success "Uglification successful!"

        # Add preamble to minified version
        local temp_file="${OUTPUT_MIN}.tmp"

        if {
            generate_preamble
            cat "$OUTPUT_MIN"
        } > "$temp_file"; then
            mv "$temp_file" "$OUTPUT_MIN"
            log_success "Preamble added successfully"
        else
            log_warning "Failed to add preamble to minified version"
            rm -f "$temp_file"
        fi

        play_sound "$SOUND_SHRINK"
        log_success "Minification complete!"
        log_info "Output: ${FG_PINK}${OUTPUT_MIN}${NOCOLOR}"
        echo
    else
        log_warning "Minification failed - continuing with unminified version"
        echo
        # Don't set BUILD_SUCCESS=false since the main file was created successfully
    fi
}

# Generate README if script exists
generate_readme() {
    local readme_script="${SCRIPT_DIR}/readme.sh"

    if [[ ! -f "$readme_script" ]]; then
        log_info "README script not found - skipping"
        return 0
    fi

    log_info "Generating README..."

    # Check dependencies
    local missing_deps=()

    if ! command -v tree >/dev/null 2>&1; then
        missing_deps+=("tree")
    fi

    # Check if Chrome is available (for version detection)
    if [[ ! -f "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]]; then
        log_warning "Google Chrome not found at expected path"
    fi

    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log_warning "Missing dependencies for README generation: ${missing_deps[*]}"
        log_info "Install with: brew install ${missing_deps[*]}"
        log_warning "Skipping README generation"
        return 0
    fi

    # Create readme directory if it doesn't exist
    # local readme_dir="${SCRIPT_DIR}/readme"
    # mkdir -p "$readme_dir"

    # Run the readme script with timeout to prevent hanging
    log_info "Executing README script with 30-second timeout..."

    # Change to the script directory before running
    (
        cd "$SCRIPT_DIR" || exit 1

        # Run with timeout to prevent hanging
        if timeout 30s bash "$readme_script" 2>/dev/null; then
            log_success "README generation complete"
            log_info "Output: ${FG_BLUE}../README.md${NOCOLOR}"
        else
            local exit_code=$?
            if [[ $exit_code -eq 124 ]]; then
                log_warning "README generation timed out after 30 seconds"
            else
                log_warning "README generation failed with exit code: $exit_code"
            fi
            log_info "This is non-critical - continuing with build"
        fi
    )
}

# Chrome reload for development
reload_browser() {
    if [[ "$OSTYPE" == darwin* ]] && [[ "$RELOAD_CHROME" == "true" ]]; then

        if [[ -f "browser/focus.scpt" ]]; then
            osascript "browser/focus.scpt" 2>/dev/null || true
        fi

        if [[ -f "browser/reload.scpt" ]]; then
            osascript "browser/reload.scpt" 2>/dev/null || true
            log_info "Chrome reloaded"
        fi
    fi
}

# Build completion handler
complete_build() {
    echo
    log_step "Build completion phase..."

    # Ensure OUTPUT_FILE exists before checking its size
    if [[ ! -f "$OUTPUT_FILE" ]]; then
        log_error "Output file was not created: ${FG_BLUE}$OUTPUT_FILE${NOCOLOR}"
        BUILD_SUCCESS=false
    fi

    if [[ "$BUILD_SUCCESS" == "true" ]]; then
        log_success "Build marked as successful!"
        play_sound "$SOUND_SUCCESS"

        log_info "Attempting Chrome reload..."
        reload_browser

        echo
        log_section "🎉  ${VC_PACKAGE} Build Complete!"

        log_info "📄  Output File: ${FG_BLUE}${OUTPUT_FILE}${NOCOLOR}"
        log_info "📅  Build Date: ${FG_WHITE}${BUILD_DATE}${NOCOLOR}"
        log_info "🕐  Build Time: ${FG_WHITE}${BUILD_TIME}${NOCOLOR}"

        # Safe array length check
        local file_count=0
        if [[ ${#PROCESSED_FILES[@]} -gt 0 ]]; then
            file_count=${#PROCESSED_FILES[@]}
        fi
        log_info "📊  Files Processed: ${FG_WHITE}${file_count}${NOCOLOR}"

        echo
        log_success "✨  Build completed successfully!"
        echo
    else
        log_error "Build failed!"
        play_sound "$SOUND_FAILURE"
        flash_screen

        echo
        log_error "💥  ${VC_PACKAGE} build failed"
        echo
        exit 1
    fi
}

################################################################################
# MAIN EXECUTION
################################################################################

main() {
    log_info "🚀  Starting Juice Framework build process..."
    echo

    initialize_build
    log_success "Build initialization complete"
    echo

    check_directory_structure
    log_success "Directory structure check complete"

    compile_juice
    log_success "Framework compilation complete"

    create_minified
    log_success "Minification process complete"

    generate_readme
    log_success "README generation complete"

    complete_build
}

# Execute main function
main "$@"
