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


    Return all customers.

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
            "notifications": [],
            "isActive": 1
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
            "notifications": [],
            "isActive": 1
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
            "notifications": [],
            "isActive": 1
        }
    }
    ]
    ```
* [x] `POST /`


    Create new customer.

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
            "notifications": [],
            "isActive": 1
        }
    }
    ```
* [x] `PUT /{id}`


    Update customer with id `id`. The only fields that can be updated are `name`, `password`, and `isActive`. Any combination of the three fields may be supplied. The example provided is a case where all three fields are changed in one request. Note that supplying other fields beside those three will not update anything in the database.

    **Request Example**
    ```json
    {
        "user": {
            "name": "BreadTalk 2",
            "password": "some-plaintext-password-here",
            "isActive": 0
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
            "notifications": [],
            "isActive": 0
        }
    }
    ```
* [x] `GET /{id}/outlets`


    Return outlets of customer with id `id`.

* [x] `POST /{id}/outlets`


    Create new outlet for customer with id `id`.

* [x] `GET /outlets/{outlet_id}`


    Return outlet with id `outlet_id`.

* [x] `GET /{id}/outlets/{outlet_id}`


    Return outlet with id `outlet_id` of customer with id `id`.

* [x] `PUT /{id}/outlets/{outlet_id}`


    Update outlet with id `outlet_id` for customer with id `id`. Any combination of the attributes may be changed; not all attributes have to be present.

* [x] `GET /{id}/outlets/{outlet_id}/reports`


    Return reports for outlets with id `outlet_id` of customer with id `id`.

* [x] `GET /{id}/reports`


    Return reports for customer with id `id`.
    

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

Employee role name could either be `administrators`, `supervisors`, or `technicians`.
* [x] `GET /{employee_role_name}/`


    Return all employees.

* [x] `POST /{employee_role_name}/`


    Create new employee.

* [x] `GET /{employee_role_name}/{id}`


    Return employees with id `id`.

* [x] `PUT /{employee_role_name}/{id}`


    Update employees with id `id`. Any combination of the attributes may be changed; not all attributes have to be present.

* [x] `GET /supervisors/{id}/technicians`


    Return technicians of supervisor with id `id`.
    
* [x] `GET /supervisors/{id}/outlets`


    Return outlets of supervisor with id `id`.

* [x] `GET /supervisors/{id}/schedules`


    Return schedules of technician with id `id`.
    
* [x] `GET /technicians/{id}/outlets`


    Return outlets of technician with id `id`.

* [x] `GET /technicians/{id}/pesticide-requests`


    Return pesticide requests of technician with id `id`.

* [x] `GET /technicians/{id}/reports`


    Return reports of technician with id `id`.
    
* [x] `GET /technicians/{id}/schedules`


    Return schedules of technician with id `id`.


### Schedule Service - `/schedules`
* [x] `GET /{id}`


    Return schedule with id `id`.

* [x] `GET /{id}/visitations`


    Return all visitations for schedule with id `id`.

* [x] `POST /{id}/visitations`


    Create new visitation for schedule with id `id`.

* [x] `GET /{id}/visitations?month={period_month}&year={period_year}`


    Return all visitations with period with month `period_month` and year `period_year` for schedule with id `id`.


### Inventory Service - `/inventory`
* [x] `GET /pesticides`


    Return all pesticides.

* [x] `POST /pesticides`


    Create new pesticide.

* [x] `GET /pesticides/{id}`


    Return pesticides with id `id`.

* [x] `PUT /pesticides/{id}`


    Update pesticides with id `id`.
    
* [x] `GET /pesticide-requests`


    Return all pesticide requests.    
    
* [x] `POST /pesticide-requests`


    Create new pesticide request. A successful request will automatically subtract the stock of the requested pesticide.


### Notification Service - `/notifications`
* [x] `GET /`


    Return all notifications.

* [x] `POST /`


    Create new notification.

* [x] `GET /{id}`


    Return notification with id `id`.

* [x] `PUT /{id}`


    Update notification with id `id`. Any combination of the attributes may be changed; not all attributes have to be present. `isSeen` may only be changed once, and only to the value `1`. Any other value will result it being changed to `1`.
