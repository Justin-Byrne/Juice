#!/bin/bash
# Juice Framework Watch Script
# Compatible with BASH 3.2.57+
# Location: ~/Programs/HTML5/Juice/build/watch.sh

set -eo pipefail

################################################################################
# GLOBAL CONFIGURATION
################################################################################

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly ROOT_DIR="$(dirname "${SCRIPT_DIR}")"

# Project Configuration
readonly PROJECT="Juice"
readonly PROJECT_DESC="JavaScript Unified Interactive Creation Engine"

# Watch Configuration
readonly WATCH_DIRECTORY="${ROOT_DIR}/script/source"
readonly COMPILE_SCRIPT="${SCRIPT_DIR}/compile.sh"
readonly SLEEP_INTERVAL=1

# Console Colors (BASH 3.2.57 compatible)
readonly FG_RED='\033[1;31m'
readonly FG_GREEN='\033[1;32m'
readonly FG_YELLOW='\033[1;33m'
readonly FG_PINK='\033[1;35m'
readonly FG_BLUE='\033[1;36m'
readonly FG_WHITE='\033[1;37m'
readonly NOCOLOR='\033[0m'

# Watch State
WATCH_ACTIVE=true
BUILD_COUNT=0

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

log_watch() {
    echo -e "${FG_PINK}👁  ${NOCOLOR}$*"
}

log_build() {
    echo -e "${FG_GREEN}🔨  ${NOCOLOR}$*"
}

# Display watch header
show_watch_header() {
    clear
    echo
    log_watch "Watching ${FG_PINK}${PROJECT}${NOCOLOR} Framework"
    log_info "Directory: ${FG_BLUE}${WATCH_DIRECTORY}${NOCOLOR}"
    log_info "Build Script: ${FG_WHITE}${COMPILE_SCRIPT}${NOCOLOR}"
    echo
    log_info "Press ${FG_WHITE}Ctrl+C${NOCOLOR} to stop watching..."
    echo
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo
}

# Display file change notification
show_file_change() {
    local timestamp="$(date +'%H:%M:%S')"
    ((BUILD_COUNT++))

    echo
    log_build "File change detected at ${FG_WHITE}${timestamp}${NOCOLOR}"
    log_info "Build #${FG_WHITE}${BUILD_COUNT}${NOCOLOR} starting..."
    log_info "Directory: ${FG_BLUE}${WATCH_DIRECTORY}${NOCOLOR}"
    echo
}

# Execute build script
run_build() {
    if [[ -x "$COMPILE_SCRIPT" ]]; then
        log_info "Executing build script..."
        echo

        # Run the build script and capture exit code
        if bash "$COMPILE_SCRIPT"; then
            echo
            log_success "Build #${FG_WHITE}${BUILD_COUNT}${NOCOLOR} completed successfully!"
        else
            local exit_code=$?
            echo
            log_error "Build #${FG_WHITE}${BUILD_COUNT}${NOCOLOR} failed with exit code: ${exit_code}"
        fi
    else
        log_error "Build script not found or not executable: ${COMPILE_SCRIPT}"
        return 1
    fi
}

# Cleanup function for graceful shutdown
cleanup() {
    echo
    echo
    log_info "Shutting down file watcher..."
    log_success "Watched ${FG_WHITE}${BUILD_COUNT}${NOCOLOR} builds for ${FG_PINK}${PROJECT}${NOCOLOR}"
    echo
    exit 0
}

# Verify dependencies and configuration
verify_setup() {
    local missing_deps=()

    # Check for fswatch
    if ! command -v fswatch >/dev/null 2>&1; then
        missing_deps+=("fswatch")
    fi

    # Check if watch directory exists
    if [[ ! -d "$WATCH_DIRECTORY" ]]; then
        log_error "Watch directory not found: ${FG_BLUE}${WATCH_DIRECTORY}${NOCOLOR}"
        return 1
    fi

    # Check if compile script exists
    if [[ ! -f "$COMPILE_SCRIPT" ]]; then
        log_error "Compile script not found: ${FG_WHITE}${COMPILE_SCRIPT}${NOCOLOR}"
        return 1
    fi

    # Report missing dependencies
    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        log_error "Missing required dependencies: ${missing_deps[*]}"
        log_info "Install with: ${FG_WHITE}brew install ${missing_deps[*]}${NOCOLOR}"
        return 1
    fi

    return 0
}

################################################################################
# MAIN WATCH LOOP
################################################################################

# Main watch function
watch_files() {
    show_watch_header

    # Verify setup before starting
    if ! verify_setup; then
        log_error "Setup verification failed - exiting"
        exit 1
    fi

    log_success "File watcher initialized successfully!"
    log_info "Monitoring changes in: ${FG_BLUE}${WATCH_DIRECTORY}${NOCOLOR}"
    echo

    # Start file watching with fswatch
    fswatch -r "$WATCH_DIRECTORY" | while read -r file_path; do
        # Skip hidden files and temporary files
        case "$(basename "$file_path")" in
            .* | *~ | *.tmp | *.swp)
                continue
                ;;
        esac

        # Only process JavaScript files
        if [[ "$file_path" =~ \.js$ ]]; then
            show_file_change

            # Add a small delay to avoid rapid successive builds
            sleep "$SLEEP_INTERVAL"

            run_build

            echo
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo
            log_watch "Watching for changes..."
            echo
        fi
    done
}

################################################################################
# MAIN EXECUTION
################################################################################

main() {
    # Set up signal handlers for graceful shutdown
    trap cleanup SIGINT SIGTERM

    # Start watching files
    watch_files
}

# Execute main function
main "$@"
