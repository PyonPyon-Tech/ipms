package com.pyonpyontech.employeeservice.restcontroller;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Map;
import java.util.HashMap;

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Technician;
import com.pyonpyontech.employeeservice.model.pest_control.Schedule;
import com.pyonpyontech.employeeservice.model.customer.Outlet;
import com.pyonpyontech.employeeservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.employeeservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.employeeservice.model.pest_control.Schedule;

import com.pyonpyontech.employeeservice.service.EmployeeRestService;
import com.pyonpyontech.employeeservice.service.TechnicianRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/employees/technicians")
public class TechnicianRestController {
    
    @Autowired
    private EmployeeRestService employeeRestService;
    
    @Autowired
    private TechnicianRestService technicianRestService;

    // Retrieve by ID
    @GetMapping(value = "/{id}")
    private Technician retrieveTechnician(@PathVariable("id") Long id, Principal principal) {
        try {
            return technicianRestService.getTechnicianById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Technician with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping
    private List<Technician> retrieveAllTechnicians(Principal principal) {
        return technicianRestService.getTechnicianList();
    }
    
    // Create
    @PostMapping
    private Technician createTechnician(@Valid @RequestBody Technician technician, BindingResult bindingResult, Principal principal) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Technician createdTechnician = technicianRestService.createTechnician(technician);
                return createdTechnician;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Update by ID
    @PutMapping(value = "/{id}")
    private Technician updateTechnician(@PathVariable("id") Long id, @Valid @RequestBody Technician technician, BindingResult bindingResult, Principal principal) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Technician updatedTechnician = technicianRestService.updateTechnician(id, technician);
                return updatedTechnician;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Retrieve all outlets under technician
    @GetMapping(value = "/{id}/outlets")
    private List<Outlet> retrieveAllTechnicianOutlets(@PathVariable("id") Long id, Principal principal) {
        return technicianRestService.getTechnicianOutletList(id);
    }
    
    // Retrieve all pesticide requests under technician
    @GetMapping(value = "/{id}/pesticide-requests")
    private List<PesticideRequest> retrieveAllTechnicianPesticideRequests(@PathVariable("id") Long id, Principal principal) {
        return technicianRestService.getTechnicianPesticideRequestList(id);
    }
    
    // Retrieve all reports under technician
    @GetMapping(value = "/{id}/reports")
    private List<Map<String, Object>> retrieveAllTechnicianReports(@PathVariable("id") Long id, Principal principal) {
        return technicianRestService.getTechnicianReportList(id);
    }
    
    // Retrieve all schedules for technician
    @GetMapping(value = "/{id}/schedules")
    private List<Schedule> retrieveAllTechnicianSchedules(@PathVariable("id") Long id, Principal principal) {
        return technicianRestService.getTechnicianScheduleList(id);
    }
    
    @GetMapping(value = "/{technicianId}/schedules/{periodId}")
    private Schedule retrieveTechnicianSchedulesByPeriodAndPrincipal(@PathVariable("technicianId") Long technicianId, @PathVariable("periodId") Long periodId, Principal principal) {
        List<Schedule> schedules = technicianRestService.getTechnicianScheduleList(technicianId);
        Schedule schedule = new Schedule();
        for(Schedule s: schedules)  {
            if(s.getPeriod().getId() == periodId){
                return s;
            }
        }
        return schedule;
    }

    @GetMapping(value = "/schedules/{periodId}")
    private Schedule retrieveTechnicianSchedulesByPeriodAndPrincipal(@PathVariable("periodId") Long periodId, Principal principal) {
        Technician tech = technicianRestService.getTechnicianByUsername(principal.getName());
        List<Schedule> schedules = technicianRestService.getTechnicianScheduleList(tech.getId());
        Schedule schedule = new Schedule();
        for(Schedule s: schedules) {
            if(s.getPeriod().getId() - periodId == 0){
                schedule = s;
            }
        }
        return schedule;
    }

    @GetMapping(value = "/outlets")
    private List<Outlet> retrieveTechnicianOutlets(Principal principal) {
        Technician tech = technicianRestService.getTechnicianByUsername(principal.getName());
        
        if(tech == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        
        return technicianRestService.getTechnicianOutletList(tech.getId());
    }
    
    @PutMapping(value = "/{id}/outlets")
    private Technician updateOutlets(@PathVariable("id") Long id, @Valid @RequestBody List<Outlet> outlets, Principal principal) {
        return technicianRestService.updateTechnicianOutlets(id, outlets);
    }
}