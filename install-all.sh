#!/bin/bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

install_for_vault() {
	local vault_dir="$1"
	local plugin

	while IFS= read -r plugin; do
		OBSIDIAN_DIR="$vault_dir/.obsidian" "$REPO_DIR/install.sh" "$plugin"
	done < <("$REPO_DIR/install.sh" --list)
}

install_for_vault "${obsidian:?Error: obsidian environment variable is not set}"
install_for_vault "${class_notes:?Error: class_notes environment variable is not set}"
