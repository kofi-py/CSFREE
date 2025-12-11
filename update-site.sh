#!/bin/bash

# Step 1: add all changes
git add .

# Step 2: commit with a message
git commit -m "update support page — removed tutoring references"

# Step 3: push to main branch (change 'main' if your branch is different)
git push origin main

echo "✅ Changes pushed! Your GitHub Pages site should update in a few minutes."
sleep 5
# Step 4: open your live GitHub Pages site
# replace with your actual GitHub Pages URL
xdg-open "https://topproj.github.io/CSFREE/support.html" 2>/dev/null || open "https://topproj.github.io/CSFREE/support.html"