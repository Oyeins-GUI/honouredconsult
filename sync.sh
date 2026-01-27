#!/bin/bash
set -e

echo "=== Git Sync Script ==="
echo ""

cd /workspaces/honouredconsult

echo "1. Aborting any existing rebase..."
git rebase --abort 2>/dev/null || echo "   No rebase to abort"

echo ""
echo "2. Configuring pull strategy to merge..."
git config pull.rebase false

echo ""
echo "3. Pulling remote changes..."
git pull --no-edit

echo ""
echo "4. Checking status..."
git status --short

echo ""
echo "5. Pushing to remote..."
git push

echo ""
echo "=== ✅ Sync completed successfully! ==="
