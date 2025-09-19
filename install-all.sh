#!/bin/bash
set -e
set -o pipefail

export OBSIDIAN_DIR=$obsidian/.obsidian
./install.sh auto-link-title
./install.sh consistent-attachments-and-links
./install.sh git
./install.sh quick-explorer
./install.sh templater
./install.sh vimrc
./install.sh kanban
./install.sh quickadd
./install.sh math-ocr
./install.sh remotely-save
./install.sh unlinked
./install.sh copy-as-html

export OBSIDIAN_DIR=$class_notes/.obsidian
./install.sh auto-link-title
./install.sh consistent-attachments-and-links
./install.sh git
./install.sh quick-explorer
./install.sh templater
./install.sh vimrc
./install.sh kanban
./install.sh quickadd
./install.sh math-ocr
./install.sh remotely-save
./install.sh unlinked
./install.sh copy-as-html
