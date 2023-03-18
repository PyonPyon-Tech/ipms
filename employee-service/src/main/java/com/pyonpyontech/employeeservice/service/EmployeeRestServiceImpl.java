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
        technician.setSupervisor(getSupervisorById(technician.getSupervisor().getId()));
        
        UserModel createdTechnicianUser = userRestService.createUser(technician.getUser());
        
        technician.setUser(createdTechnicianUser);
        Technician createdTechnician = technicianDb.save(technician);
        
        return createdTechnician;
    }
    
    @Override
    public Technician updateTechnician(Long id, Technician updatedTechnician) {
        Technician targetTechnician = getTechnicianById(id);
        
        UserModel updatedTechnicianUser = updatedTechnician.getUser();
        UserModel targetTechnicianUser = targetTechnician.getUser();
        
        if(updatedTechnicianUser.getName() != null)
            targetTechnicianUser.setName(updatedTechnicianUser.getName());
        
        if(updatedTechnicianUser.getPassword() != null)
            targetTechnicianUser.setPassword(jwtUserDetailsService.encrypt(updatedTechnicianUser.getPassword()));
        
        if(updatedTechnicianUser.getIsActive() != null)
            targetTechnicianUser.setIsActive(updatedTechnicianUser.getIsActive());
        
        if(updatedTechnician.getBirthDate() != null)
            targetTechnician.setBirthDate(updatedTechnician.getBirthDate());
        
        if(updatedTechnician.getBirthLocation() != null)
            targetTechnician.setBirthLocation(updatedTechnician.getBirthLocation());
        
        if(updatedTechnician.getGender() != null)
            targetTechnician.setGender(updatedTechnician.getGender());
        
        if(updatedTechnician.getAddress() != null)
            targetTechnician.setAddress(updatedTechnician.getAddress());
        
        if(updatedTechnician.getContact() != null)
            targetTechnician.setContact(updatedTechnician.getContact());
        
        if(updatedTechnician.getSupervisor() != null)
            targetTechnician.setSupervisor(getSupervisorById(updatedTechnician.getSupervisor().getId()));

        targetTechnician.setUser(targetTechnicianUser);
        Technician savedUpdatedTechnician = technicianDb.save(targetTechnician);

        return savedUpdatedTechnician;
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
            map.put("reportType", report.getReportType());
            map.put("outlet", report.getOutlet());
            map.put("start", report.getStart());
            map.put("end", report.getEnd());
            technicianReportList.add(map);
        }
        return technicianReportList;
    }
    
    public List<Schedule> getTechnicianScheduleList(Long id) {
        return getTechnicianById(id).getSchedules();
    }
    
}