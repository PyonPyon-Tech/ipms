@echo off

echo Starting auth service....
start cmd /c "title auth-service && cd auth-service && gradlew.bat bootRun && pause"

echo Starting customer service....
start cmd /c "title customer-service && cd customer-service && gradlew.bat bootRun && pause"

echo Starting employee service....
start cmd /c "title employee-service && cd employee-service && gradlew.bat bootRun && pause"

echo Starting inventory service....
start cmd /c "title inventory-service && cd inventory-service && gradlew.bat bootRun && pause"

echo Starting schedule service....
start cmd /c "title schedule-service && cd schedule-service && gradlew.bat bootRun && pause"

echo Starting storage service....
start cmd /c "title storage-service && cd storage-service && gradlew.bat bootRun && pause"

echo Starting report service....
start cmd /c "title report-service && cd report-service && gradlew.bat bootRun && pause"

echo Starting notification service....
start cmd /c "title notification-service && cd notification-service && gradlew.bat bootRun && pause"

echo Starting frontend service....
start cmd /c "title frontend-service && cd frontend-service && npm run dev && pause"

echo Started all services.