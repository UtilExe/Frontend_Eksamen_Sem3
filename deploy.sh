#!/usr/bin/env bash

XXXX="frontend_eks"
DROPLET_URL="161.35.24.227"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build/* root@$DROPLET_URL:/var/www/$XXXX

