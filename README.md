# Obsidian Plugins 

I maintain forks of all the plugins I use and ocassionally write my own from scratch.

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

