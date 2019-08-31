# presentation-microservices-kotlin

[![master](https://img.shields.io/badge/travis-master-blue.svg)][travis-url][![TravisCI][travis-master-badge]][travis-url]

## Introduction

Build microservices wth Kotlin + Spring Boot

Presented at GDG Kotlin/Everywhere Hong Kong : A Day of Kotlin, 31st Aug 2019

Slides can be found [here].

Two backend services are created in this project, `auth` and `app` respectively. A microservice-based architecture can be achieved locally with docker-compose. We have also deployed them on Oursky's k8s cluster.

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
[here]: https://drive.google.com/file/d/1EkioxNMzPW2sfPd3s8Cn7GyNuC7_u4-N/view?usp=sharing
[AuthController]: /backend/auth/src/main/kotlin/com/oursky/presentation/microservices/kotlin/auth/controller/AuthController.kt
[PingController]: /backend/app/src/main/kotlin/com/oursky/presentation/microservices/kotlin/app/controller/PingController.kt
