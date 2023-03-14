## REST API Plan
All API endpoints start with `/api/v1/`. Request bodies shall use JSON. Request body specifications to be determined.

### Report Service - `/reports`
* [x] `GET /create`

    Get data needed to create a report

* [x] `POST /create`

    Create new report
    Will check if the client is authorized

* [x] `GET /detail{id}`

    Return report with id `id`.
    Will check if the client is authorized

* [x] `GET /summary?period={period_id}`

    Get summaries based on period
    Will check if the client is authorized
