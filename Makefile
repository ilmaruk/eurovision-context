########################################################################################################################
# General

.PHONY: start

start: start-backend start-frontend

.PHONY: stop

stop:
	docker-compose down

.PHONY: restart

restart: restart-backend restart-frontend

########################################################################################################################
# Backend

.PHONY: start-backend

start-backend:
	docker-compose up -d backend

.PHONY: restart-backend

restart-backend: stop start-backend

########################################################################################################################
# Frontend

.PHONY: start-frontend

start-frontend:
	docker-compose up -d frontend

.PHONY: restart-frontend

restart-frontend: stop start-frontend

########################################################################################################################
# Utils

.PHONY: backend-shell

backend-shell:
	docker-compose exec backend bash

migrate:
	docker-compose up --build migrator
