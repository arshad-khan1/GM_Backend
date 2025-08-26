#!/bin/bash

# === Configuration ===
USERNAME="sunitpatil32"
REPO="sunitpatil32/helpnest_callback_processor"
BRANCH="STAGING"

# === Step 1: Stop running containers ===
echo "🛑 Stopping docker containers..."
docker-compose down

# === Step 2: Pull latest code ===
echo "🔄 Pulling latest code from $BRANCH branch..."
echo "👉 Please enter GitHub password or personal access token for user: $USERNAME"

# Construct URL with username (password will be prompted)
GIT_URL="https://$USERNAME@github.com/$REPO"

git pull "$GIT_URL" "$BRANCH"

# === Step 3: Rebuild and start containers ===
echo "🚀 Rebuilding and starting docker containers..."
docker-compose up --build -d

# === Step 4: Clean up ===
echo "🧹 Cleaning up..."
docker system prune -af --volumes

echo "✅ Docker image updated successfully!"
