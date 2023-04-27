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
import com.pyonpyontech.employeeservice.service.SupervisorRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/employees/supervisors")
public class SupervisorRestController {
    
    @Autowired
    private EmployeeRestService employeeRestService;
    
    @Autowired
    private SupervisorRestService supervisorRestService;

    // Retrieve by ID
    @GetMapping(value = "/{id}")
    private Supervisor retrieveSupervisor(@PathVariable("id") Long id, Principal principal) {
        try {
            return supervisorRestService.getSupervisorById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Supervisor with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping
    private List<Supervisor> retrieveAllSupervisors(Principal principal) {
        return supervisorRestService.getSupervisorList();
    }

    // Create
    @PostMapping
    private Supervisor createSupervisor(@Valid @RequestBody Supervisor supervisor, BindingResult bindingResult, Principal principal) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Supervisor createdSupervisor = supervisorRestService.createSupervisor(supervisor);
                return createdSupervisor;
            } catch(NullPointerException | DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Update by ID
    @PutMapping(value = "/{id}")
    private Supervisor updateSupervisor(@PathVariable("id") Long id, @Valid @RequestBody Supervisor supervisor, BindingResult bindingResult, Principal principal) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Supervisor updatedSupervisor = supervisorRestService.updateSupervisor(id, supervisor);
                return updatedSupervisor;
            } catch(NullPointerException | DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Retrieve all technicians under supervisor
    @GetMapping(value = "/{id}/technicians")
    private List<Technician> retrieveAllSupervisorTechnicians(@PathVariable("id") Long id, Principal principal) {
        return supervisorRestService.getSupervisorTechnicianList(id);
    }

    @GetMapping(value = "/technicians")
    private List<Technician> retrieveAllSupervisorTechniciansByPrincipal(@RequestParam(required = false) Long period, Principal principal) {
        Supervisor supervisor = supervisorRestService.getSupervisorByUsername(principal.getName());
        if(period != null) {
          return supervisorRestService.getSupervisorTechnicianListByPeriod(supervisor.getId(), period);
        }
        return supervisorRestService.getSupervisorTechnicianList(supervisor.getId());
    }
    @GetMapping(value = "/outlets")
    private List<Outlet> retrieveOutletsForSupervisor(Principal principal) {
        Supervisor supervisor = supervisorRestService.getSupervisorByUsername(principal.getName());
        return supervisor.getOutlets();
    }
    
    // Retrieve all outlets under supervisor
    @GetMapping(value = "/{id}/outlets")
    private List<Outlet> retrieveAllSupervisorOutlets(@PathVariable("id") Long id, Principal principal) {
        return supervisorRestService.getSupervisorOutletList(id);
    }
    
    // Retrieve all schedules under supervisor
    @GetMapping(value = "/{id}/schedules")
    private List<Schedule> retrieveAllSupervisorSchedules(@PathVariable("id") Long id, @RequestParam(required = false) String approval, Principal principal) {
        if (approval == null) {
            return supervisorRestService.getSupervisorScheduleList(id, -1);
        }
        
        if (approval.equals("0"))
            return supervisorRestService.getSupervisorScheduleList(id, 0);
        else if (approval.equals("1"))
            return supervisorRestService.getSupervisorScheduleList(id, 1);
          
        return supervisorRestService.getSupervisorScheduleList(id, -1);
    }
    
    // Retrieve all schedules under supervisor 2
    @GetMapping(value = "/schedules")
    private List<Schedule> retrieveSupervisorOutlets(@RequestParam(required = false) String approval, Principal principal) { 
        Supervisor supervisor = supervisorRestService.getSupervisorByUsername(principal.getName());
        
        if(supervisor == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        
        Long id = supervisor.getId();
        
        if (approval == null) {
            return supervisorRestService.getSupervisorScheduleList(id, -1);
        }
        
        if (approval.equals("0"))
            return supervisorRestService.getSupervisorScheduleList(id, 0);
        else if (approval.equals("1"))
            return supervisorRestService.getSupervisorScheduleList(id, 1);
          
        return supervisorRestService.getSupervisorScheduleList(id, -1);
    }
}