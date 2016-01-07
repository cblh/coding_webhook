#!/bin/sh
# update git
git pull origin master
# npm install
npm install
# restart app
npm run start
