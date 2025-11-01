#!/bin/bash

# Print commands and their arguments as they are executed
set -x

# Print current directory
pwd
ls -la

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Build the application
echo "Building the application..."
CI=false npm run build

# Verify build output
echo "Checking build output..."
ls -la build/