.PHONY: secret

secret:
	@curl -s https://raw.githubusercontent.com/oursky/devsecops-secret/master/generate-secret.sh \
	  | bash -s -- \
	  -i ../../backend/.env.example -o .env
