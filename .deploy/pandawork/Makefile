.PHONY: secret

secret:
	@curl -s https://raw.githubusercontent.com/oursky/devsecops-secret/master/generate-secret.sh \
	  | bash -s -- \
	  -i ../../backend/.env.example -o .env
	@sed -i.bak 's/^APP_DATABASE_HOST/#&/' .env && rm .env.bak
	@echo 'APP_DATABASE_HOST=localhost' >> .env
	@sed -i.bak 's/^APP_AUTH_ENDPOINT/#&/' .env && rm .env.bak
	@echo 'APP_AUTH_ENDPOINT=http://localhost:8000' >> .env
