# Obsidian Plugins 

I maintain my own forks of plugins I use in Obsidian

# Usage 

Run `./install.sh` to install all plugins.

# Development

## Subtree

This project uses [git subtree](https://www.atlassian.com/git/tutorials/git-subtree). 

Add subtree to remote

```bash
git remote add -f 'remote-alias' 'remote-url'
```

Add subtree

```bash
git subtree add --prefix 'local-path' 'remote-alias' branch --squash
```

Update subtree

```bash
git fetch 'remote-alias' 'branch'
git subtree pull --prefix 'local-path' 'remote-alias' 'branch' --squash
```

