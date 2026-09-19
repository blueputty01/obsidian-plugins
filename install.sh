#!/bin/bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGINS=(
  advanced-rename-and-delete-handler
  auto-link-title
  copy-as-html
  git
  math-ocr
  # protect-files
  quick-explorer
  quickadd
  templater
  unlinked
  vimrc
)

if [ "$#" -eq 1 ] && [ "$1" = "--list" ]; then
  printf '%s\n' "${PLUGINS[@]}"
  exit 0
fi

if [ -z "${OBSIDIAN_DIR:-}" ]; then
  echo "Error: OBSIDIAN_DIR environment variable is not set. Defaulting to \$obsidian/.obsidian"
  OBSIDIAN_DIR="$obsidian/.obsidian"
fi

install_dependencies() {
  if [ -f bun.lockb ]; then
    bun install
  elif [ -f pnpm-lock.yaml ]; then
    pnpm install
  elif [ -f yarn.lock ]; then
    yarn install
  else
    npm install
  fi
}

copy_artifacts() {
  local plugin_id="$1"
  local target_dir="$OBSIDIAN_DIR/plugins/$plugin_id"
  local artifact source
  local artifacts=(main.js styles.css)

  mkdir -p "$target_dir"
  for artifact in "${artifacts[@]}"; do
    for source in "$artifact" "dist/$artifact" "dist/build/$artifact"; do
      if [ -f "$source" ]; then
        cp "$source" "$target_dir/$artifact"
        break
      fi
    done
  done
  cp manifest.json "$target_dir/manifest.json"
}

install_plugin() {
  local plugin="$1"
  local plugin_dir="$REPO_DIR/$plugin"
  local plugin_id

  if [ ! -f "$plugin_dir/package.json" ] || [ ! -f "$plugin_dir/manifest.json" ]; then
    echo "Error: '$plugin' is not an installable plugin directory."
    return 1
  fi

  plugin_id="$(sed -nE 's/^[[:space:]]*"id"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/p' "$plugin_dir/manifest.json" | head -n 1)"
  if [ -z "$plugin_id" ]; then
    echo "Error: Could not read plugin ID from '$plugin/manifest.json'."
    return 1
  fi

  (
    cd "$plugin_dir"
    install_dependencies
    npm run build
    copy_artifacts "$plugin_id"
  )
}

usage() {
  echo "Usage: $0 <plugin-name>"
  echo "       $0 --list"
  echo "Available plugins:"
  printf '  %s\n' "${PLUGINS[@]}"
  exit 1
}

if [ "$#" -eq 1 ] && [ "$1" = "--list" ]; then
  printf '%s\n' "${PLUGINS[@]}"
  exit 0
fi

if [ "$#" -ne 1 ]; then
  usage
fi

for plugin in "${PLUGINS[@]}"; do
  if [ "$plugin" = "$1" ]; then
    install_plugin "$plugin"
    exit 0
  fi
done

echo "Error: Unknown plugin '$1'"
usage
