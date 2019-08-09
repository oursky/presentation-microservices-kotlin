FROM gradle:5.5-jdk8 as builder
WORKDIR /builder
ADD . /builder
RUN gradle build --stacktrace

FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=builder /builder/build/libs/ToDo-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "ToDo-0.0.1-SNAPSHOT.jar"]
EXPOSE 8080
