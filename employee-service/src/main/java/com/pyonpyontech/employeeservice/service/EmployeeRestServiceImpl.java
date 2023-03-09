package com.pyonpyontech.employeeservice.service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.employeeservice.service.UserRestService;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Technician;

import com.pyonpyontech.employeeservice.model.UserModel;

import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.AdministratorDb;
import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.ManagerDb;
import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.TechnicianDb;

import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class EmployeeRestServiceImpl implements EmployeeRestService {
    
    @Autowired
    private AdministratorDb administratorDb;
    
    @Autowired
    private ManagerDb managerDb;
    
    @Autowired
    private SupervisorDb supervisorDb;
    
    @Autowired
    private TechnicianDb technicianDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public Administrator getAdministratorById(Long id) {
        return null;
    }
    
    @Override
    public List<Administrator> getAdministratorList() {
        return administratorDb.findAll();
    }
    
    @Override
    public Administrator createAdministrator(Administrator administrator) {
        return null;
    }
    
    @Override
    public Administrator updateAdministrator(Long id, Administrator updatedAdministrator) {
        return null;
    }
}