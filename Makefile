.PHONY: up down dev install shell build test seed setup-ide

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

setup-ide:
	@echo "Stopping existing node_modules from conflicting..."
	rm -rf frontend/node_modules backend/node_modules
	@echo "Linking OrbStack volumes to local workspace for IDE support..."
	ln -s ~/OrbStack/docker/volumes/baseline-blueprints_frontend_node_modules ./frontend/node_modules
	ln -s ~/OrbStack/docker/volumes/baseline-blueprints_backend_node_modules ./backend/node_modules
	@echo "Success! Remember to reload your Antigravity window (Cmd+Shift+P -> 'Reload Window')."
