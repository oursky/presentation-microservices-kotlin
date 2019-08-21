# presentation-microservices-kotlin
Presentation code and material for micro-services with kotlin

[![master](https://img.shields.io/badge/travis-master-blue.svg)][travis-url][![TravisCI][travis-master-badge]][travis-url]

## Get Started
##### Start the server
```
cd backend
make secret
make run
```
##### With docker-compose
```
cd backend
docker-compose -p demo up
```
##### With docker
```
cd backend
docker build -f Dockerfile.auth . -t demo-auth
docker run --rm -it -p 8080:8080 -t demo-auth
# OR
docker run --rm -it -p 8080:8080 $(docker build -f Dockerfile.auth -q .)
```
##### Testing api call
```
curl http://localhost:8080/healthcheck
```

<!-- Markdown link & img dfn's -->
[travis-url]: https://travis-ci.org/oursky/presentation-microservices-kotlin
[travis-master-badge]: https://travis-ci.org/oursky/presentation-microservices-kotlin.svg?branch=master
