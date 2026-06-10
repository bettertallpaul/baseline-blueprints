.PHONY: up down dev install shell build test seed

up:
	docker compose up -d

down:
	docker compose down

dev:
	docker compose up

install:
	docker compose run --rm frontend pnpm install
	docker compose run --rm backend pnpm install

shell:
	docker compose exec frontend sh

build:
	docker compose build

test:
	docker compose run --rm frontend pnpm test -- --run || true
	docker compose run --rm backend pnpm test || true

seed:
	docker compose exec backend node seed.js
