package com.pyonpyontech.employeeservice.service;

import java.util.*;

import com.pyonpyontech.employeeservice.repository.customer_db.OutletDb;
import com.pyonpyontech.employeeservice.service.UserRestService;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Technician;
import com.pyonpyontech.employeeservice.model.customer.Outlet;
import com.pyonpyontech.employeeservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.employeeservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.employeeservice.model.pest_control.Schedule;

import com.pyonpyontech.employeeservice.model.UserModel;

import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.AdministratorDb;
import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.ManagerDb;
import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.TechnicianDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class EmployeeRestServiceImpl implements EmployeeRestService {
    @Autowired
    private AdministratorDb administratorDb;
    
    @Autowired
    private AdministratorDb supervisorDb;
    
    @Autowired
    private AdministratorDb managerDb;
    
    @Autowired
    private AdministratorDb technicianDb;
    
    @Override
    public Integer verifyUsername(String username) {
        if(!managerDb.findByUsername(username).isPresent() &&
           !administratorDb.findByUsername(username).isPresent() &&
           !supervisorDb.findByUsername(username).isPresent() &&
           !technicianDb.findByUsername(username).isPresent()) 
            return 0;
            
        return 1;
    }
}