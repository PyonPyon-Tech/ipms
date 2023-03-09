# Integrated Pest Management System (IPMS)
---
## What is IPMS?
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac vehicula massa, ut consectetur purus. Morbi ac mi nec lorem fringilla facilisis ut non odio. Nullam diam risus, eleifend a enim sed, sollicitudin egestas sapien. Sed nibh velit, porttitor quis ex eget, tristique luctus ex. In maximus orci sed mauris vehicula, sed maximus nibh fermentum. Nam lacus arcu, pharetra sit amet congue ut, convallis ac mi. Quisque non sodales risus, nec pretium nulla. Cras laoreet dignissim nisl et vulputate. Morbi sit amet pellentesque odio. Sed pharetra sollicitudin nulla at pulvinar.

## Deployment
To deploy the app, you can either start each individual service with Gradle or all of them at once using Docker Compose. As of now, the Docker features are still not yet implemented, therefore you can run each service individually.

**Example** (`auth-service`):
```sh
cd auth-service
./gradlew bootRun
```

## REST API Plan
All API endpoints start with `/api/v1/`. Request bodies shall use JSON. Request body specifications to be determined.

###  Auth Service - `/authenticate`
* [x] `POST /`
    Authenticate given credentials. Return JWT if successful, 401 otherwise.
    **Request Example**
    ```json
    {
        "username": "someUsernameHere",
        "password": "somePlaintextPassword"
    }
    ```
    **Success Response Example**
    ```json
    {
        "token": "someJwtTokenHereForLaterUse"
    }
    ```

### Customer Service - `/customers`
* [x] `GET /`
Return all customers
    **Success Response Example**
    ```json
    [
    {
        "id": 1,
        "user": {
            "uuid": "someUuid1",
            "name": "BreadTalk",
            "role": 0,
            "username": "bread.talk",
            "password": "someHashedPassword1",
            "isEmployee": 0,
            "notifications": []
        }
    },
    {
        "id": 2,
        "user": {
            "uuid": "someUuid2",
            "name": "Subway",
            "role": 0,
            "username": "sub.way",
            "password": "someHashedPassword2",
            "isEmployee": 0,
            "notifications": []
        }
    },
    {
        "id": 3,
        "user": {
            "uuid": "someUuid3",
            "name": "Starbucks",
            "role": 0,
            "username": "starbuxoxo",
            "password": "someHashedPassword3",
            "isEmployee": 0,
            "notifications": []
        }
    }
    ]
    ```
* [x] `POST /`
Create new customer
    **Request Example**
    ```json
    {
        "user": {
            "name": "Starbucks",
            "username": "starbuxoxo",
            "password": "some-plaintext-password-here"
        }
    }
    ```
    **Success Response Example**
    ```json
    {
        "userUuid": "uuidOfUserOfCustomer",
        "id": 3
    }
    ```
* [x] `GET /{id}`
Return customer with id `id`.
    **Success Response Example**
    ```json
    {
        "id": 1,
        "user": {
            "uuid": "someUuid1",
            "name": "BreadTalk",
            "role": 0,
            "username": "bread.talk",
            "password": "someHashedPassword1",
            "isEmployee": 0,
            "notifications": []
        }
    }
    ```
* [x] `PUT /{id}`
Update customer with id `id`. The only fields that can be updated are `name` and `password`. Either one or both may be supplied. The example provided is a case where both fields are changed in one request. Note that supplying other fields beside those two will not update anything in the database.
    **Request Example**
    ```json
    {
        "id": 1,
        "user": {
            "name": "BreadTalk 2",
            "password": "some-plaintext-password-here"
        }
    }
    ```
    **Success Response Example**
    ```json
    {
        "id": 1,
        "user": {
            "uuid": "someUuid1",
            "name": "BreadTalk 2",
            "role": 0,
            "username": "bread.talk",
            "password": "newHashedPasswordBasedOnPlaintextInRequestBody",
            "isEmployee": 0,
            "notifications": []
        }
    }
    ```
* [ ] `GET /{id}/outlets`
Return outlets of customer with id `id`.
* [ ] `POST /{id}/outlets`
Create new outlet for customer with id `id`.
* [ ] `PUT /{id}/outlets/{outlet_id}`
Update outlet with id `outlet_id` for customer with id `id`.
* [ ] `GET /{id}/outlets/{outlet_id}/reports`
Return reports for outlets with id `outlet_id` of customer with id `id`.
* [ ] `GET /{id}/reports`
Return reports for customer with id `id`.
* [ ] `GET /{id}/feedbacks`
Return feedbacks for customer with id `id`.

### Report Service - `/reports`
* [ ] `GET /`
Return all reports
* [ ] `POST /`
Create new report
* [ ] `GET /{id}`
Return report with id `id`.
* [ ] `PUT /{id}`
Update report with id `id`.

### Employee Service - `/employees`
* [ ] `GET /`
Return all employees
* [ ] `POST /`
Create new employee
* [ ] `GET /{id}`
Return employees with id `id`.
* [ ] `PUT /{id}`
Update employees with id `id`.
* [ ] `GET /{id}/schedule`
Return schedule for employee with id `id`.

### Schedule Service - `/schedules`
* [ ] `GET /{id}`
Return schedule with id `id`.
* [ ] `GET /{id}/visitations`
Return all visitations for schedule with id `id`.
* [ ] `POST /{id}/visitations`
Create new visitation for schedule with id `id`.
* [ ] `GET /{id}/visitations/{period_month}-{period_year}`
Return all visitations with period with month `period_month` and year `period_year` for schedule with id `id`.

### Inventory Service - `/inventory`
* [ ] `GET /pesticides`
Return all pesticides
* [ ] `POST /pesticides`
Create new pesticide
* [ ] `GET /pesticides/{id}`
Return pesticides with id `id`.
* [ ] `PUT /pesticides/{id}`
Update pesticides with id `id`.

### Notification Service - `/notifications`
* [ ] `GET /`
Return all notifications
* [ ] `POST /`
Create new notification
* [ ] `GET /{id}`
Return notification with id `id`.
* [ ] `PUT /{id}`
Update notification with id `id`.