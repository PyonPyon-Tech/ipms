package com.pyonpyontech.employeeservice.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.NoSuchElementException;

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
        return null;
    }
    
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
    public List<Supervisor> getSupervisorList() {
        return supervisorDb.findAll();
    }
    
    @Override
    public Supervisor createSupervisor(Supervisor supervisor) {
        // Reset all fields that might've been supplied by user
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
        return null;
    }
    
    @Override
    public List<Technician> getSupervisorTechnicianList(Long id) {
        return getSupervisorById(id).getSubordinates();
    }
    
    @Override
    public List<Outlet> getSupervisorOutletList(Long id) {
        return getSupervisorById(id).getOutlets();
    }
    
    @Override
    public Technician getTechnicianById(Long id) {
        Optional<Technician> technician = technicianDb.findById(id);
        if(technician.isPresent()) {
            return technician.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public List<Technician> getTechnicianList() {
        return technicianDb.findAll();
    }
    
    @Override
    public Technician createTechnician(Technician technician) {
        // Reset all fields that might've been supplied by user
        technician.setId(null);
        technician.setLastLogin(LocalDateTime.of(1900, 1, 1, 0, 0));
        technician.getUser().setRole(3);
        technician.getUser().setIsEmployee(1);
        technician.getUser().setUuid(null);
        technician.getUser().setIsActive(1);
        
        UserModel createdTechnicianUser = userRestService.createUser(technician.getUser());
        
        technician.setUser(createdTechnicianUser);
        Technician createdTechnician = technicianDb.save(technician);
        
        return createdTechnician;
    }
    
    @Override
    public Technician updateTechnician(Long id, Technician updatedTechnician) {
        return null;
    }
    
    public List<Outlet> getTechnicianOutletList(Long id) {
        return getTechnicianById(id).getOutlets();
    }
    
    public List<PesticideRequest> getTechnicianPesticideRequestList(Long id) {
        return getTechnicianById(id).getPesticideRequestHistory();
    }
    
    public List<Map<String, Object>> getTechnicianReportList(Long id) {
        List technicianReportList = new ArrayList<>();
        for(CsrReport report : getTechnicianById(id).getReports()) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", report.getId());
            technicianReportList.add(map);
        }
        return technicianReportList;
    }
    
    public List<Schedule> getTechnicianScheduleList(Long id) {
        return getTechnicianById(id).getSchedules();
    }
    
}