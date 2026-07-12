#!/usr/bin/env bash
# Builds the master site + both design variants and assembles them into one
# combined dist/ folder for the GitHub Pages review deploy:
#
#   dist/                      -> master (built with DEPLOY_TARGET=pages)
#   dist/variants/premium/     -> premium variant
#   dist/variants/editorial/   -> editorial variant
#
# The master site normally builds for production (foodhacks.co, base "/") —
# DEPLOY_TARGET=pages switches astro.config.mjs to the sanramonkw.github.io
# project-pages site + /Foodhacks-Website/ base instead. NEVER set
# DEPLOY_TARGET when building for production; see DEPLOYMENT.md.
#
# Run from the repo root: bash scripts/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

echo "==> Building master (DEPLOY_TARGET=pages)"
# NOTE: `npm install` (not `npm ci`) — the committed lockfiles omit some
# cross-platform optional deps (@emnapi/*), which makes `npm ci` abort on
# Windows. `npm install` reconciles the lockfile and keeps the deploy working.
npm install --no-audit --no-fund
rm -rf dist
DEPLOY_TARGET=pages npm run build

echo "==> Building variants"
for v in premium editorial; do
  echo "  -> $v"
  (cd "variants/$v" && npm install --no-audit --no-fund && rm -rf dist && npm run build)
done

echo "==> Assembling combined dist/"
mkdir -p dist/variants
for v in premium editorial; do
  rm -rf "dist/variants/$v"
  cp -r "variants/$v/dist" "dist/variants/$v"
done

echo "==> Done. Combined output is in dist/"
echo "    Deploy it with: npm run deploy:all"
