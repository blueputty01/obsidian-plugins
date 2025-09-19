#!/bin/bash
set -e
set -o pipefail

if [ -z "$OBSIDIAN_DIR" ]; then
  echo "Error: OBSIDIAN_DIR environment variable is not set. Defaulting to \$obsidian/.obsidian"
  export OBSIDIAN_DIR=$obsidian/.obsidian
fi

install_auto-link-title() {
  cd auto-link-title
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/auto-link-title
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_consistent-attachments-and-links() {
  cd consistent-attachments-and-links
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/consistent-attachments-and-links
  mkdir -p $PLUGIN_DIR
  mv dist/build/* $PLUGIN_DIR
  cd ../
}

install_copy-as-html() {
  cd copy-as-html
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/copy-as-html
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cp styles.css $PLUGIN_DIR
  cd ../
}

install_git() {
  cd git
  pnpm i
  pnpm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/obsidian-git
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp styles.css $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_kanban() {
  cd kanban
  yarn
  yarn build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/kanban
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  mv styles.css $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_math-ocr() {
  cd math-ocr
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/math-ocr
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_protect-files() {
  cd protect-files
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/protect-files
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_quick-explorer() {
  cd quick-explorer
  pnpm i
  pnpm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/quick-explorer
  mkdir -p $PLUGIN_DIR
  mv dist/* $PLUGIN_DIR
  cd ../
}

install_quickadd() {
  cd quickadd
  bun install
  bun run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/quickadd
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  mv styles.css $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_remotely-save() {
  cd remotely-save
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/remotely-save
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp styles.css $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_templater() {
  cd templater
  pnpm i
  pnpm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/templater
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp styles.css $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_unlinked() {
  cd unlinked
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/unlinked
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

install_vimrc() {
  cd vimrc
  npm i
  npm run build
  PLUGIN_DIR=$OBSIDIAN_DIR/plugins/vimrc
  mkdir -p $PLUGIN_DIR
  mv main.js $PLUGIN_DIR
  cp manifest.json $PLUGIN_DIR
  cd ../
}

usage() {
  echo "Usage: $0 [plugin-name]"
  echo "Available plugins:"
  compgen -A function install_ | sed 's/install_//'
  exit 1
}

if [ -z "$1" ]; then
  usage
fi

case "$1" in
  auto-link-title|consistent-attachments-and-links|copy-as-html|git|kanban|math-ocr|protect-files|quick-explorer|quickadd|remotely-save|templater|unlinked|vimrc)
    "install_$1"
    ;;
  *)
    echo "Error: Unknown plugin '$1'"
    usage
    ;;
esac
