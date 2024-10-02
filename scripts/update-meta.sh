#!/usr/bin/env bash

echo "Stashing local changes"
if ! git stash; then
    exit 1
fi

echo "Pulling latest commits from koha-plugin:main"
if ! git pull https://github.com/pders01/koha-plugin.git main; then
    exit 1
fi

echo "Popping stash"
git stash pop
