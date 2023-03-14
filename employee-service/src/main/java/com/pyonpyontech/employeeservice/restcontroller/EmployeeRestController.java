package com.pyonpyontech.employeeservice.restcontroller;

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

@Slf4j
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeRestController {
    @Autowired
    private EmployeeRestService employeeRestService;
    
    // Retrieve by ID
    @GetMapping(value = "/administrators/{id}")
    private Administrator retrieveAdministrator(@PathVariable("id") Long id) {
        try {
            return employeeRestService.getAdministratorById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Administrator with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping(value = "/administrators")
    private List<Administrator> retrieveAllAdministrators() {
        return employeeRestService.getAdministratorList();
    }
    
    // Create
    @PostMapping(value = "/administrators")
    private Administrator createAdministrator(@Valid @RequestBody Administrator administrator, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Administrator createdAdministrator = employeeRestService.createAdministrator(administrator);
                return createdAdministrator;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Retrieve by ID
    @GetMapping(value = "/supervisors/{id}")
    private Supervisor retrieveSupervisor(@PathVariable("id") Long id) {
        try {
            return employeeRestService.getSupervisorById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Supervisor with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping(value = "/supervisors")
    private List<Supervisor> retrieveAllSupervisors() {
        return employeeRestService.getSupervisorList();
    }
    
    // Create
    @PostMapping(value = "/supervisors")
    private Supervisor createSupervisor(@Valid @RequestBody Supervisor supervisor, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Supervisor createdSupervisor = employeeRestService.createSupervisor(supervisor);
                return createdSupervisor;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Retrieve all technicians under supervisor
    @GetMapping(value = "/supervisors/{id}/technicians")
    private List<Technician> retrieveAllSupervisorTechnicians(@PathVariable("id") Long id) {
        return employeeRestService.getSupervisorTechnicianList(id);
    }
    
    // Retrieve all outlets under supervisor
    @GetMapping(value = "/supervisors/{id}/outlets")
    private List<Outlet> retrieveAllSupervisorOutlets(@PathVariable("id") Long id) {
        return employeeRestService.getSupervisorOutletList(id);
    }
    
    // Retrieve by ID
    @GetMapping(value = "/technicians/{id}")
    private Technician retrieveTechnician(@PathVariable("id") Long id) {
        try {
            return employeeRestService.getTechnicianById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Technician with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping(value = "/technicians")
    private List<Technician> retrieveAllTechnicians() {
        return employeeRestService.getTechnicianList();
    }
    
    // Create
    @PostMapping(value = "/technicians")
    private Technician createTechnician(@Valid @RequestBody Technician technician, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Technician createdTechnician = employeeRestService.createTechnician(technician);
                return createdTechnician;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Retrieve all outlets under technician
    @GetMapping(value = "/technicians/{id}/outlets")
    private List<Outlet> retrieveAllTechnicianOutlets(@PathVariable("id") Long id) {
        return employeeRestService.getTechnicianOutletList(id);
    }
    
    // Retrieve all pesticide requests under technician
    @GetMapping(value = "/technicians/{id}/pesticide-requests")
    private List<PesticideRequest> retrieveAllTechnicianPesticideRequests(@PathVariable("id") Long id) {
        return employeeRestService.getTechnicianPesticideRequestList(id);
    }
    
    // Retrieve all reports under technician
    @GetMapping(value = "/technicians/{id}/reports")
    private List<Map<String, Object>> retrieveAllTechnicianReports(@PathVariable("id") Long id) {
        return employeeRestService.getTechnicianReportList(id);
    }
    
    // Retrieve all schedules for technician
    @GetMapping(value = "/technicians/{id}/schedules")
    private List<Schedule> retrieveAllTechnicianSchedules(@PathVariable("id") Long id) {
        return employeeRestService.getTechnicianScheduleList(id);
    }
    
}