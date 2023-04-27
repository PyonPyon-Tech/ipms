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
import com.pyonpyontech.employeeservice.model.Period;

import com.pyonpyontech.employeeservice.model.UserModel;

import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.SupervisorDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.LocalDate;
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
    public List<Technician> getSupervisorTechnicianListByPeriod(Long id, Long period) {
        List<Technician> technicianList = getSupervisorById(id).getSubordinates();
        List<Technician> returnedTechnicians = new ArrayList<>();
        for (Technician t : technicianList) {
            boolean isApproved = false;
            for (Schedule s : t.getSchedules()) 
                if (s.getPeriod().getId() == period) {
                    isApproved = true;
                    break;
                }

            if (isApproved)
                returnedTechnicians.add(t);
        }
        
        return returnedTechnicians;
    }
    
    @Override
    public List<Outlet> getSupervisorOutletList(Long id) {
        return getSupervisorById(id).getOutlets();
    }
    
    @Override
    public List<Schedule> getSupervisorScheduleList(Long id, Integer isApproved) {
        List<Schedule> schedules = getSupervisorById(id).getSchedules();
        
        Collections.sort(schedules, new Comparator<Schedule>(){
            public int compare(Schedule s1, Schedule s2) {
                Period s1Period = s1.getPeriod();
                Period s2Period = s2.getPeriod();
                
                LocalDate s1PeriodDate = LocalDate.of(s1Period.getYear(), s1Period.getMonth(), 1);
                LocalDate s2PeriodDate = LocalDate.of(s2Period.getYear(), s2Period.getMonth(), 1);
                
                if(!s1PeriodDate.isEqual(s2PeriodDate)) {
                    return s1PeriodDate.compareTo(s2PeriodDate);
                }
                
                String s1TechnicianName = s1.getTechnician().getUser().getName().toLowerCase();
                String s2TechnicianName = s2.getTechnician().getUser().getName().toLowerCase();
                
                return s1TechnicianName.compareTo(s2TechnicianName);
            }
        });
        
        if (isApproved == -1)
            return schedules;
        
        List<Schedule> filteredSchedules = new ArrayList<>();
        
        for (Schedule s : schedules)
            if (s.getIsApproved() == isApproved)
                filteredSchedules.add(s);
              
        return filteredSchedules;
    }
}