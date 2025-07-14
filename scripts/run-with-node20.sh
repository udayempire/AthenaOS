#!/bin/bash

# Check if nvm is installed
if [ -z "$(command -v nvm)" ]; then
  # Try to load nvm if it's installed but not in PATH
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  
  # Check again if nvm is available
  if [ -z "$(command -v nvm)" ]; then
    echo "NVM (Node Version Manager) is not installed or not in PATH."
    echo "Please install NVM first: https://github.com/nvm-sh/nvm#installing-and-updating"
    exit 1
  fi
fi

# Command to run (passed as all arguments)
COMMAND="$@"

if [ -z "$COMMAND" ]; then
  echo "Usage: $0 <command>"
  echo "Example: $0 dev"
  echo "Example: $0 vite build"
  exit 1
fi

# Use Node.js v20 (LTS)
echo "Switching to Node.js v20..."
nvm use 20 || nvm install 20

# Run the command with Node.js v20
echo "Running '$COMMAND' with Node.js v20..."
$COMMAND

# Return to the previous Node.js version if needed
# Uncomment the line below if you want to switch back automatically
# nvm use default
