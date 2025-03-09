#/bin/bash

OBSIDIAN_DIR=$obsidian/.obsidian
export OBSIDIAN_PATH=$OBSIDIAN_DIR/themes

cd auto-link-title
npm i
npm run build
mkdir -p $OBSIDIAN_DIR/plugins/auto-link-title
rm -rf $OBSIDIAN_DIR/plugins/auto-link-title/*
mv main.js $OBSIDIAN_DIR/plugins/auto-link-title
cp manifest.json $OBSIDIAN_DIR/plugins/auto-link-title

cd ../consistent-attachments-and-links
npm i
npm run build
mkdir -p $OBSIDIAN_DIR/plugins/consistent-attachments-and-links
rm -rf $OBSIDIAN_DIR/plugins/consistent-attachments-and-links/*
mv dist/build/* $OBSIDIAN_DIR/plugins/consistent-attachments-and-links

cd ../git
pnpm i
pnpm run build
mkdir -p $OBSIDIAN_DIR/plugins/git
rm -rf $OBSIDIAN_DIR/plugins/git/*
mv main.js $OBSIDIAN_DIR/plugins/git/main.js
cp manifest.json $OBSIDIAN_DIR/plugins/git
cd ../

cd minimal
npm i
npx grunt
cd ../

cd quick-explorer
pnpm i
pnpm run build
mkdir -p $OBSIDIAN_DIR/plugins/quick-explorer
rm -rf $OBSIDIAN_DIR/plugins/quick-eplorer/*
mv dist/* $OBSIDIAN_DIR/plugins/quick-explorer
cd ../

cd templater
pnpm i
pnpm run build
mkdir -p $OBSIDIAN_DIR/plugins/templater
rm -rf $OBSIDIAN_DIR/plugins/templater/*
mv main.js $OBSIDIAN_DIR/plugins/templater
cp manifest.json $OBSIDIAN_DIR/plugins/templater
cd ../
