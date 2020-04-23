########################################################################################################################
# General

.PHONY: start

start: start-backend start-frontend

.PHONY: stop

stop:
	docker-compose down

.PHONY: restart

restart: stop start

########################################################################################################################
# Backend

.PHONY: start-backend

start-backend:
	docker-compose up -d backend

########################################################################################################################
# Frontend

.PHONY: start-frontend

start-frontend:
	docker-compose up -d frontend

########################################################################################################################
# Utils

.PHONY: backend-shell

backend-shell:
	docker-compose exec backend bash

.PHONY: frontend-shell

frontend-shell:
	docker-compose exec frontend sh

.PHONY: migrate

migrate:
	docker-compose up --build migrator
