#!/usr/bin/env bash

# Define the subtrees and their corresponding branches
declare -A subtrees=(
  ["auto-link-title"]="main"
  ["consistent-attachments-and-links"]="master"
  ["git"]="master"
  ["kanban"]="main"
  ["quick-explorer"]="master"
  ["quickadd"]="master"
  ["remotely-save"]="master"
  ["templater"]="master"
  ["vimrc"]="master"
  ["unlinked"]="main"
)

# Iterate over the subtrees
for subtree in "${!subtrees[@]}"; do
  branch=${subtrees[$subtree]}

  echo "Updating subtree '$subtree' from branch '$branch'..."

  # Fetch the latest changes from the remote
  git fetch "$subtree" "$branch"

  # Pull the changes into the subtree
  git subtree pull --prefix "$subtree" "$subtree" "$branch" --squash

  if [ $? -eq 0 ]; then
    echo "Subtree '$subtree' updated successfully."
    echo "Reinstalling '$subtree'..."
    ./install.sh "$subtree"
  else
    echo "Failed to update subtree '$subtree'."
  fi
  echo ""
done
