#!/bin/bash

COMPOSE_PATH="./docker-compose.yml"

if docker compose version >/dev/null 2>&1; then
  COMPOSE=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
  COMPOSE=(docker-compose)
else
  echo "Error: neither 'docker compose' (V2 plugin) nor 'docker-compose' (V1) is available." >&2
  echo "Install the Docker Compose plugin: https://docs.docker.com/compose/install/" >&2
  exit 1
fi

function up() {
  "${COMPOSE[@]}" -f "$COMPOSE_PATH" up -d

  echo "Waiting for PostgreSQL to start..."
  until "${COMPOSE[@]}" -f "$COMPOSE_PATH" exec -T db pg_isready -U postgres; do
    echo "PostgreSQL is not ready yet, waiting..."
    sleep 1
  done

  echo "PostgreSQL is ready."
}

function down() {
  "${COMPOSE[@]}" -f "$COMPOSE_PATH" down
  echo "Containers stopped. Volumes preserved."
}

function reset() {
  "${COMPOSE[@]}" -f "$COMPOSE_PATH" down -v
  echo "Containers stopped and volumes removed."
}

case "$1" in
  up)
    up
    ;;
  down)
    down
    ;;
  reset)
    reset
    ;;
  *)
    echo "Uso: $0 {up|down|reset}"
    echo "  up     - Start containers (creates volumes if missing, reuses if present)"
    echo "  down   - Stop containers, preserve volumes"
    echo "  reset  - Stop containers and delete volumes (wipes DB)"
    exit 1
    ;;
esac
