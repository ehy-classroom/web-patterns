#!/bin/bash

VERSION_FILE="VERSION"

if [[ ! -f "$VERSION_FILE" ]]; then
    echo "❌ Version file not found: $VERSION_FILE"
    echo "Please create a file named 'version' containing your desired version number, e.g.:"
    echo "v1.0.3"
    exit 1
fi

VERSION_MSG=$(cat "$VERSION_FILE" | tr -d '[:space:]')

echo "📄 Version file detected: $VERSION_MSG"

echo ""
echo "🔍 Checking repository status..."
git status

echo ""
echo "🔎 Working tree changes (pre-stage):"
git status -sb
git diff --stat

echo ""
read -p "➡️  Stage all changes? (y/n): " STAGE

if [[ "$STAGE" == "y" || "$STAGE" == "Y" ]]; then
    git add .
    echo "✔️  Changes staged."
else
    echo "⏭️  Skipping staging."
fi

echo ""
echo "📦 Staged changes summary:"
if git diff --cached --quiet --exit-code; then
    echo "ℹ️  No staged changes."
else
    git diff --cached --stat
fi

read -p "➡️  Commit changes? (y/n): " COMMIT

if [[ "$COMMIT" == "y" || "$COMMIT" == "Y" ]]; then

    echo ""
    read -p "📝 Use version file commit message '$VERSION_MSG'? (y/n): " USE_VERSION

    if [[ "$USE_VERSION" == "y" || "$USE_VERSION" == "Y" ]]; then
        MSG="$VERSION_MSG"
    else
        read -p "📝 Enter manual commit message: " MSG
    fi

    COMMIT_NOTE="Refer to CHANGELOG.md for commit details"
    git commit -m "$MSG" -m "$COMMIT_NOTE"
    echo "✔️  Commit created: $MSG"
else
    echo "⏭️  Skipping commit."
fi

echo ""
read -p "➡️  Push to remote? (y/n): " PUSH

if [[ "$PUSH" == "y" || "$PUSH" == "Y" ]]; then
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

    check_auth_status() {
        if command -v gh >/dev/null 2>&1; then
            echo "🔐 Checking GitHub auth status..."
            gh auth status || echo "⚠️  Unable to verify auth via gh."
        else
            echo "⚠️  GitHub CLI not found; please verify your Git credentials."
        fi
    }

    if [[ -z "$CURRENT_BRANCH" || "$CURRENT_BRANCH" == "HEAD" ]]; then
        echo "⚠️  Could not determine current branch. Skipping push."
    elif ! git remote get-url origin >/dev/null 2>&1; then
        echo "❌ No remote 'origin' configured. Skipping push."
    elif git rev-parse --abbrev-ref --symbolic-full-name "@{u}" >/dev/null 2>&1; then
        echo "🔗 Upstream detected for '$CURRENT_BRANCH'."
        if git push; then
            echo "🚀  Changes pushed to remote."
        else
            echo "❌ Push failed. Please check the error above."
            check_auth_status
        fi
    else
        echo "ℹ️  No upstream set for '$CURRENT_BRANCH'. Attempting first push with upstream..."
        if git push -u origin "$CURRENT_BRANCH"; then
            echo "🚀  Upstream set and changes pushed."
        else
            echo "❌ Push with upstream failed. Please check the error above."
            check_auth_status
        fi
    fi
else
    echo "⏭️  Skipping push."
fi

echo ""
echo "🎉 Done."
