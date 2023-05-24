package com.pyonpyontech.authservice.service;

import java.util.List;
import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import com.pyonpyontech.authservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.authservice.model.pest_control.employee.Manager;
import com.pyonpyontech.authservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.authservice.model.pest_control.employee.Technician;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);

    Customer getCustomerByUuid(String uuid);
    Administrator getAdministratorByUuid(String uuid);
    Manager getManagerByUuid(String uuid);
    Supervisor getSupervisorByUuid(String uuid);
    Technician getTechnicianByUuid(String uuid);

    UserModel createUser(UserModel user);
}