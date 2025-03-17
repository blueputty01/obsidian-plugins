#!/usr/bin/env bash

echo $BASH_VERSION
# Define the subtrees and their corresponding branches
declare -A subtrees=(
  ["auto-link-title"]="main",
  ["consistent-attachments-and-links"]="master",
  ["git"]="master",
  ["kanban"]="main",
  ["quick-explorer"]="master",
  ["quickadd"]="master",
  ["templater"]="master",
  ["vimrc"]="master"
)

for subtree in "${!subtrees[@]}"; do
  echo "Key: $subtree, Value: ${subtrees[$subtree]}"
done

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
  else
    echo "Failed to update subtree '$subtree'."
  fi
done
