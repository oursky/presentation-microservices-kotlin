# presentation-microservices-kotlin
Presentation code and material for micro-services with kotlin

[![master](https://img.shields.io/badge/travis-master-blue.svg)][travis-url][![TravisCI][travis-master-badge]][travis-url]

## Get Started
##### Generate secret
```
cd backend
make secret
```
##### Start servers
```
cd backend
docker-compose -p demo up
```
##### Testing api call
```
curl -vvv http://localhost:8080/auth/ping
curl -vvv http://localhost:8080/app/ping
```

<!-- Markdown link & img dfn's -->
[travis-url]: https://travis-ci.org/oursky/presentation-microservices-kotlin
[travis-master-badge]: https://travis-ci.org/oursky/presentation-microservices-kotlin.svg?branch=master
