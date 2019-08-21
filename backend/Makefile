.PHONY: lint build test run clean secret

lint:
	@./gradlew ktlint

build:
	@./gradlew build

test:
	@./gradlew test

run:
	@bash -c "source .env; ./gradlew bootRun"

secret:
	@curl -s https://raw.githubusercontent.com/oursky/devsecops-secret/master/generate-secret.sh \
	  | bash -s -- \
	  -i .env.example -o .env
