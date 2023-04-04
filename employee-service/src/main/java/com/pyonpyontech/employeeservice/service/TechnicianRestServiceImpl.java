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

import com.pyonpyontech.employeeservice.repository.pest_control.employee_db.TechnicianDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import javax.transaction.Transactional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class TechnicianRestServiceImpl implements TechnicianRestService {
    
    @Autowired
    private TechnicianDb technicianDb;
    
    @Autowired
    private OutletDb outletDb;
    
    @Autowired
    private SupervisorRestService supervisorRestService;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
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
    public Technician getTechnicianByUsername(String username) {
        return technicianDb.findByUsername(username).orElse(null);
    }

    @Override
    public List<Technician> getTechnicianList() {
        return technicianDb.findAll();
    }
    
    @Override
    public Technician createTechnician(Technician technician) {
        // Reset all fields that might've been supplied by user
        if(technician.getUser().getRole() != 4){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        technician.setId(null);
        technician.setLastLogin(LocalDateTime.of(1900, 1, 1, 0, 0));
        technician.getUser().setRole(4);
        technician.getUser().setIsEmployee(1);
        technician.getUser().setUuid(null);
        technician.getUser().setIsActive(1);
        technician.setSupervisor(supervisorRestService.getSupervisorById(technician.getSupervisor().getId()));
        
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
            targetTechnician.setSupervisor(supervisorRestService.getSupervisorById(updatedTechnician.getSupervisor().getId()));

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

    @Override
    public Technician updateTechnicianOutlets(Long id, List<Outlet> newOutlets) {
        Set<Long> newOutletsIds = new HashSet<>();
        Set<Long> oldOutletsIds = new HashSet<>();
        List<Outlet> toBeSaved = new ArrayList<>();

        Technician technician = technicianDb.findById(id).orElse(null);
        if(technician == null){
            throw new NoSuchElementException("Tidak Ada Teknisi dengan id "+id);
        }
        List<Outlet> oldOutlet = technician.getOutlets();
        for(Outlet o: oldOutlet){
            oldOutletsIds.add(o.getId());
        }
        for(Outlet o: newOutlets){
            newOutletsIds.add(o.getId());
        }
        // Iterate oldOutlets, if their id not found in new, set technician to null
        for(Outlet o: oldOutlet){
            if(!newOutletsIds.contains(o.getId())){
                o.setTechnician(null);
                toBeSaved.add(o);
            }
        }
        for(Outlet o: newOutlets){
            if(!oldOutletsIds.contains(o.getId())){
                Outlet currOutlet = outletDb.findById(o.getId()).orElse(null);
                if(currOutlet == null){
                    throw new NoSuchElementException("Tidak ada outlet dengan id"+o.getId());
                }
                currOutlet.setTechnician(technician);
                toBeSaved.add(currOutlet);
            }
        }
        // Iterate newOutlets, if their id not found in old, set technician to technician
        outletDb.saveAll(toBeSaved);
        return technician;
    }

}