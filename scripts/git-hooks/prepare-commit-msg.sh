#!/bin/sh

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
ISSUE_ID=$(echo "$CURRENT_BRANCH" | grep -Eo "#[0-9]+")

COMMIT_FILE=$1

COMMIT_MESSAGE=$(cat $1)
COMMIT_MESSAGE_PREFIX=$(echo "$COMMIT_MESSAGE" | grep -Eo ".+: ")

if echo "$COMMIT_MESSAGE_PREFIX" | grep -Eo ":"; then
    COMMIT_MESSAGE_DESCRIPTION=$(echo "$COMMIT_MESSAGE" | grep -Eo " .+")
    FINAL_COMMIT_MESSAGE="$COMMIT_MESSAGE_PREFIX [$ISSUE_ID]$COMMIT_MESSAGE_DESCRIPTION"
else
    FINAL_COMMIT_MESSAGE="[$ISSUE_ID] $COMMIT_MESSAGE"
fi

if [ ! -z "$ISSUE_ID" ] && [[ $COMMIT_MESSAGE != *$ISSUE_ID* ]]; then
    echo $FINAL_COMMIT_MESSAGE > $COMMIT_FILE
    echo $COMMIT_FILE
    echo "ISSUE ID '$ISSUE_ID' matched in current branch name and prepended to commit message. (Use --no-verify to skip)"
fi
