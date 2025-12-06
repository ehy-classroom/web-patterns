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
read -p "➡️  Stage all changes? (y/n): " STAGE

if [[ "$STAGE" == "y" || "$STAGE" == "Y" ]]; then
    git add .
    echo "✔️  Changes staged."
else
    echo "⏭️  Skipping staging."
fi

echo ""
read -p "➡️  Commit changes? (y/n): " COMMIT

if [[ "$COMMIT" == "y" || "$COMMIT" == "Y" ]]; then

    echo ""
    read -p "📝 Use version file commit message '$VERSION_MSG'? (y/n): " USE_VERSION

    if [[ "$USE_VERSION" == "y" || "$USE_VERSION" == "Y" ]]; then
        MSG="$VERSION_MSG"
    else
        read -p "📝 Enter manual commit message: " MSG
    fi

    git commit -m "$MSG"
    echo "✔️  Commit created: $MSG"
else
    echo "⏭️  Skipping commit."
fi

echo ""
read -p "➡️  Push to remote? (y/n): " PUSH

if [[ "$PUSH" == "y" || "$PUSH" == "Y" ]]; then
    git push
    echo "🚀  Changes pushed to remote."
else
    echo "⏭️  Skipping push."
fi

echo ""
echo "🎉 Done."
