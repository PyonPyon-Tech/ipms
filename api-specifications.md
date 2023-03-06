# REST API Plan - IPMS
---
All API endpoints start with `/api/v1/`. Request bodies shall use JSON. Request body specifications to be determined.

##  Auth Service - `/authenticate`
* `POST /`
Authenticate given credentials. Return JWT if successful, 401 otherwise.

## Customer Service - `/customers`
* `GET /`
Return all customers
* `POST /`
Create new customer
* `GET /{id}`
Return customer with id `id`.
* `PUT /{id}`
Update customer with id `id`.
* `GET /{id}/outlets`
Return outlets of customer with id `id`.
* `POST /{id}/outlets`
Create new outlet for customer with id `id`.
* `PUT /{id}/outlets/{outlet_id}`
Update outlet with id `outlet_id` for customer with id `id`.
* `GET /{id}/reports`
Return reports for customer with id `id`.

## Report Service - `/reports`
* `GET /`
Return all reports
* `POST /`
Create new report
* `GET /{id}`
Return report with id `id`.
* `PUT /{id}`
Update report with id `id`.

## Employee Service - `/employees`
* `GET /`
Return all employees
* `POST /`
Create new employee
* `GET /{id}`
Return employees with id `id`.
* `PUT /{id}`
Update employees with id `id`.
* `GET /{id}/schedule`
Return schedule for employee with id `id`.

## Schedule Service - `/schedules`
* `GET /{id}`
Return schedule with id `id`.
* `GET /{id}/visitations`
Return all visitations for schedule with id `id`.
* `POST /{id}/visitations`
Create new visitation for schedule with id `id`.
* `GET /{id}/visitations/{period_month}-{period_year}`
Return all visitations with period with month `period_month` and year `period_year` for schedule with id `id`.

## Inventory Service - `/inventory`
* `GET /pesticides`
Return all pesticides
* `POST /pesticides`
Create new pesticide
* `GET /pesticides/{id}`
Return pesticides with id `id`.
* `PUT /pesticides/{id}`
Update pesticides with id `id`.

## Notification Service - `/notifications`
* `GET /`
Return all notifications
* `POST /`
Create new notification
* `GET /{id}`
Return notification with id `id`.
* `PUT /{id}`
Update notification with id `id`.