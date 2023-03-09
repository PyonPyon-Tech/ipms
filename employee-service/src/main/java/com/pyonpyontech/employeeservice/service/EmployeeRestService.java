package com.pyonpyontech.employeeservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Technician;

public interface EmployeeRestService {
    Administrator getAdministratorById(Long id);
    List<Administrator> getAdministratorList();
    Administrator createAdministrator(Administrator employee);
    Administrator updateAdministrator(Long id, Administrator updatedAdministrator);
}