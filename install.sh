#/bin/bash

OBSIDIAN_DIR=$obsidian/.obsidian

cd auto-link-title
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/auto-link-title
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR/main.js
cp manifest.json $PLUGIN_DIR/manifest.json

cd ../consistent-attachments-and-links
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/consistent-attachments-and-links
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv dist/build/* $PLUGIN_DIR

cd ../git
pnpm i
pnpm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/obsidian-git
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR/main.js
mv styles.css $PLUGIN_DIR/styles.css
cp manifest.json $PLUGIN_DIR/manifest.json
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
mv main.js $PLUGIN_DIR/main.js
cp manifest.json $PLUGIN_DIR/manifest.json
cd ../

cd vimrc
npm i
npm run build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/vimrc
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR/main.js
cp manifest.json $PLUGIN_DIR/manifest.json
cd ../

cd kanban
yarn
yarn build
PLUGIN_DIR=$OBSIDIAN_DIR/plugins/kanban
mkdir -p $PLUGIN_DIR
# rm -rf $PLUGIN_DIR/*
mv main.js $PLUGIN_DIR/main.js
cp manimest.json $PLUGIN_DIR/manifest.json
cd ../
