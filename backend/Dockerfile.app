FROM gradle:5.5-jdk8 as builder
WORKDIR /builder
ADD . /builder
RUN gradle --no-daemon -p app build -x test

FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=builder /builder/app/build/libs/app-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "app-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080
