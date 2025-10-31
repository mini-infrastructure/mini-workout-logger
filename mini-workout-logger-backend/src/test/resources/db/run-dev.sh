#!/bin/bash

COMPOSE_PATH="./docker-compose.yml"
PGADMIN_DATA="../../assets/pgadmin-data"
POSTGRES_DATA="../../assets/postgres-data"

function up() {
  mkdir -p "$PGADMIN_DATA" "$POSTGRES_DATA"
  docker compose -f "$COMPOSE_PATH" up -d
  sudo chown -R 5050:5050 "$PGADMIN_DATA"

  echo "Waiting for PostgreSQL to start..."
  until docker compose -f "$COMPOSE_PATH" exec -T db pg_isready -U postgres; do
    echo "PostgreSQL is not ready yet, waiting..."
    sleep 1
  done

  echo "PostgreSQL is ready."
}

function down() {
  docker compose -f "$COMPOSE_PATH" down -v
  sudo rm -rf "$PGADMIN_DATA" "$POSTGRES_DATA"
  echo "PostgreSQL and pgAdmin containers stopped and data directories removed."
}

case "$1" in
  up)
    up
    ;;
  down)
    down
    ;;
  *)
    echo "Uso: $0 {up|down}"
    exit 1
    ;;
esac
