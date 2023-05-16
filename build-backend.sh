#!/bin/sh
cd auth-service && ./gradlew clean build -x test && cd ..
cd customer-service && ./gradlew clean build -x test && cd ..
cd employee-service && ./gradlew clean build -x test && cd ..
cd inventory-service && ./gradlew clean build -x test && cd ..
cd report-service && ./gradlew clean build -x test && cd ..
cd schedule-service && ./gradlew clean build -x test && cd ..
cd storage-service && ./gradlew clean build -x test && cd ..
