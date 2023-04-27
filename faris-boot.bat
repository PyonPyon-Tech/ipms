@echo off

echo Starting auth service....
start cmd /c "title auth-service && java19 && cd auth-service && gradlew.bat bootRun && pause"

echo Starting customer service....
start cmd /c "title customer-service java19 && cd customer-service && gradlew.bat bootRun && pause"

echo Starting employee service....
start cmd /c "title employee-service && java19 && cd employee-service && gradlew.bat bootRun && pause"

echo Starting inventory service....
start cmd /c "title inventory-service && java19 && cd inventory-service && gradlew.bat bootRun && pause"

echo Starting schedule service....
start cmd /c "title schedule-service && java19 && cd schedule-service && gradlew.bat bootRun && pause"

echo Starting storage service....
start cmd /c "title storage-service && java19 && cd storage-service && gradlew.bat bootRun && pause"

echo Starting report service....
start cmd /c "title report-service && java19 && cd report-service && gradlew.bat bootRun && pause"

echo Starting frontend service....
start cmd /c "title frontend-service && cd frontend-service && npm run dev && pause"

echo Started all services.