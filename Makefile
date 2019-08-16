.PHONY: install up stop setup node mongo logs

MAKEPATH := $(abspath $(lastword $(MAKEFILE_LIST)))
PWD := $(dir $(MAKEPATH))

install:
	docker-compose -f docker-compose.builder.yml run --rm install

build:
	docker-compose -f docker-compose.builder.yml run --rm build

bundles:
	docker-compose -f docker-compose.builder.yml run --rm create-bundles

up:
	docker-compose up -d
stop:
	docker stop gql-node-container
setup:
	docker volume create gqlnodemodules && docker volume create gqlmongodata
node:
	docker exec -it gql-node-container bash

mongo:
	docker exec -it gql-mongo-container bash	
logs: 
	docker logs -f gql-node-container
