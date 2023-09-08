PHONY: dc install run_dev run_prod test

dc:
	docker-compose up --build --remove-orphans

install:
	cd front && npm install

run_dev:
	cd front && npm run webpack-config-dev

run_prod:
	cd front && npm run webpack-config-prod

test:
	cd front && npm run test