#/bin/bash
set -e
set -o pipefail

cd auto-link-title
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/auto-link-title
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd consistent-attachments-and-links
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/consistent-attachments-and-links
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv dist/build/* $PLUGIN_DIR
cd ../

cd git
pnpm i
pnpm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/obsidian-git
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp styles.css $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd quick-explorer
pnpm i
pnpm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/quick-explorer
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv dist/* $PLUGIN_DIR
cd ../

cd templater
pnpm i
pnpm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/templater
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp styles.css $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd vimrc
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/vimrc
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd kanban
yarn
yarn build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/kanban
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
mv styles.css $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd quickadd
bun install
bun run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/quickadd
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
mv styles.css $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd math-ocr
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/math-ocr
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd remotely-save
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/remotely-save
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp styles.css $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../

cd unlinked
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/unlinked
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR
cp manifest.json $PLUGIN_DIR
cd ../
