#!/bin/sh
set -ex

echo "[frontend] Entrypoint starting..."
echo "[frontend] node_modules exists: $(test -d node_modules && echo yes || echo no)"

if [ ! -d "node_modules/.pnpm" ]; then
  echo "[frontend] Installing dependencies..."
  pnpm install --prefer-offline || true
fi

echo "[frontend] Running: $@"
exec "$@"
