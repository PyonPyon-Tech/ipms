FROM openjdk:19-alpine
ARG JAR_FILE=build/libs/inventory-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
RUN mkdir /log && chmod 777 /log
ENTRYPOINT ["java","-jar","/app.jar"]
