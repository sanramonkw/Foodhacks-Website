#!/usr/bin/env bash
# Builds the master site + all three design variants and assembles them
# into one combined dist/ folder for GitHub Pages:
#
#   dist/                      -> master
#   dist/variants/premium/     -> premium variant
#   dist/variants/editorial/   -> editorial variant
#   dist/variants/bold/        -> bold variant
#
# Run from the repo root: bash scripts/build-all.sh
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

echo "==> Building master"
# NOTE: `npm install` (not `npm ci`) — the committed lockfiles omit some
# cross-platform optional deps (@emnapi/*), which makes `npm ci` abort on
# Windows. `npm install` reconciles the lockfile and keeps the deploy working.
npm install --no-audit --no-fund
rm -rf dist
npm run build

echo "==> Building variants"
for v in premium editorial bold; do
  echo "  -> $v"
  (cd "variants/$v" && npm install --no-audit --no-fund && rm -rf dist && npm run build)
done

echo "==> Assembling combined dist/"
mkdir -p dist/variants
for v in premium editorial bold; do
  rm -rf "dist/variants/$v"
  cp -r "variants/$v/dist" "dist/variants/$v"
done

echo "==> Done. Combined output is in dist/"
echo "    Deploy it with: npm run deploy:all"
