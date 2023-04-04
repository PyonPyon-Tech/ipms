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

import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.SupervisorDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class SupervisorRestServiceImpl implements SupervisorRestService {
    
    @Autowired
    private SupervisorDb supervisorDb;
    
    @Autowired
    private OutletDb outletDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public Supervisor getSupervisorById(Long id) {
        Optional<Supervisor> supervisor = supervisorDb.findById(id);
        if(supervisor.isPresent()) {
            return supervisor.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public Supervisor getSupervisorByUsername(String username) {
        Optional<Supervisor> supervisor = supervisorDb.findByUsername(username);
        if(supervisor.isEmpty()){
            throw new NoSuchElementException("No supervisor with username "+username);
        }
        return supervisor.get();
    }
    
    @Override
    public List<Supervisor> getSupervisorList() {
        return supervisorDb.findAll();
    }
    
    @Override
    public Supervisor createSupervisor(Supervisor supervisor) {
        // Reset all fields that might've been supplied by user
        if(supervisor.getUser().getRole() != 3){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        supervisor.setId(null);
        supervisor.setLastLogin(LocalDateTime.of(1900, 1, 1, 0, 0));
        supervisor.getUser().setRole(3);
        supervisor.getUser().setIsEmployee(1);
        supervisor.getUser().setUuid(null);
        supervisor.getUser().setIsActive(1);
        
        UserModel createdSupervisorUser = userRestService.createUser(supervisor.getUser());
        
        supervisor.setUser(createdSupervisorUser);
        Supervisor createdSupervisor = supervisorDb.save(supervisor);
        
        return createdSupervisor;
    }
    
    @Override
    public Supervisor updateSupervisor(Long id, Supervisor updatedSupervisor) {
        Supervisor targetSupervisor = getSupervisorById(id);
        
        UserModel updatedSupervisorUser = updatedSupervisor.getUser();
        UserModel targetSupervisorUser = targetSupervisor.getUser();
        
        if(updatedSupervisorUser.getName() != null)
            targetSupervisorUser.setName(updatedSupervisorUser.getName());
        
        if(updatedSupervisorUser.getPassword() != null)
            targetSupervisorUser.setPassword(jwtUserDetailsService.encrypt(updatedSupervisorUser.getPassword()));
        
        if(updatedSupervisorUser.getIsActive() != null)
            targetSupervisorUser.setIsActive(updatedSupervisorUser.getIsActive());
        
        if(updatedSupervisor.getBirthDate() != null)
            targetSupervisor.setBirthDate(updatedSupervisor.getBirthDate());
        
        if(updatedSupervisor.getBirthLocation() != null)
            targetSupervisor.setBirthLocation(updatedSupervisor.getBirthLocation());
        
        if(updatedSupervisor.getGender() != null)
            targetSupervisor.setGender(updatedSupervisor.getGender());
        
        if(updatedSupervisor.getAddress() != null)
            targetSupervisor.setAddress(updatedSupervisor.getAddress());
        
        if(updatedSupervisor.getContact() != null)
            targetSupervisor.setContact(updatedSupervisor.getContact());
        
        if(updatedSupervisor.getRegion() != null)
            targetSupervisor.setRegion(updatedSupervisor.getRegion());

        targetSupervisor.setUser(targetSupervisorUser);
        Supervisor savedUpdatedSupervisor = supervisorDb.save(targetSupervisor);

        return savedUpdatedSupervisor;
    }
    
    @Override
    public List<Technician> getSupervisorTechnicianList(Long id) {
        return getSupervisorById(id).getSubordinates();
    }
    
    @Override
    public List<Outlet> getSupervisorOutletList(Long id) {
        return getSupervisorById(id).getOutlets();
    }
    
    public List<Schedule> getSupervisorScheduleList(Long id) {
        return getSupervisorById(id).getSchedules();
    }
}