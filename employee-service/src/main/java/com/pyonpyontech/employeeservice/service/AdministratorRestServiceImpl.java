package com.pyonpyontech.employeeservice.service;

import java.util.*;

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

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class AdministratorRestServiceImpl implements AdministratorRestService {
    
    @Autowired
    private AdministratorDb administratorDb;

    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public Administrator getAdministratorById(Long id) {
        Optional<Administrator> administrator = administratorDb.findById(id);
        if(administrator.isPresent()) {
            return administrator.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public List<Administrator> getAdministratorList() {
        return administratorDb.findAll();
    }
    
    @Override
    public Administrator createAdministrator(Administrator administrator) {
        if(administrator.getUser().getRole() != 2){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        // Reset all fields that might've been supplied by user
        administrator.setId(null);
        administrator.setLastLogin(LocalDateTime.of(1900, 1, 1, 0, 0));
        administrator.getUser().setRole(2);
        administrator.getUser().setIsEmployee(1);
        administrator.getUser().setUuid(null);
        administrator.getUser().setIsActive(1);
        
        UserModel createdAdministratorUser = userRestService.createUser(administrator.getUser());
        
        administrator.setUser(createdAdministratorUser);
        Administrator createdAdministrator = administratorDb.save(administrator);
        
        return createdAdministrator;
    }
    
    @Override
    public Administrator updateAdministrator(Long id, Administrator updatedAdministrator) {
        Administrator targetAdministrator = getAdministratorById(id);
        
        UserModel updatedAdministratorUser = updatedAdministrator.getUser();
        UserModel targetAdministratorUser = targetAdministrator.getUser();
        
        if(updatedAdministratorUser.getName() != null)
            targetAdministratorUser.setName(updatedAdministratorUser.getName());
        
        if(updatedAdministratorUser.getPassword() != null)
            targetAdministratorUser.setPassword(jwtUserDetailsService.encrypt(updatedAdministratorUser.getPassword()));
        
        if(updatedAdministratorUser.getIsActive() != null)
            targetAdministratorUser.setIsActive(updatedAdministratorUser.getIsActive());
        
        if(updatedAdministrator.getBirthDate() != null)
            targetAdministrator.setBirthDate(updatedAdministrator.getBirthDate());
        
        if(updatedAdministrator.getBirthLocation() != null)
            targetAdministrator.setBirthLocation(updatedAdministrator.getBirthLocation());
        
        if(updatedAdministrator.getGender() != null)
            targetAdministrator.setGender(updatedAdministrator.getGender());
        
        if(updatedAdministrator.getAddress() != null)
            targetAdministrator.setAddress(updatedAdministrator.getAddress());
        
        if(updatedAdministrator.getContact() != null)
            targetAdministrator.setContact(updatedAdministrator.getContact());

        targetAdministrator.setUser(targetAdministratorUser);
        Administrator savedUpdatedAdministrator = administratorDb.save(targetAdministrator);

        return savedUpdatedAdministrator;
    }
}