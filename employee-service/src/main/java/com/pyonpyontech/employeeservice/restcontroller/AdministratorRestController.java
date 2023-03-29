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
import com.pyonpyontech.employeeservice.service.AdministratorRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/employees/administrators")
public class AdministratorRestController {
  
    @Autowired
    private EmployeeRestService employeeRestService;
  
    @Autowired
    private AdministratorRestService administratorRestService;
    
    // Retrieve by ID
    @GetMapping(value = "/{id}")
    private Administrator retrieveAdministrator(@PathVariable("id") Long id, Principal principal) {
        try {
            return administratorRestService.getAdministratorById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Administrator with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping
    private List<Administrator> retrieveAllAdministrators(Principal principal) {
        return administratorRestService.getAdministratorList();
    }
    
    // Create
    @PostMapping
    private Administrator createAdministrator(@Valid @RequestBody Administrator administrator, BindingResult bindingResult, Principal principal) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Administrator createdAdministrator = administratorRestService.createAdministrator(administrator);
                return createdAdministrator;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Update by ID
    @PutMapping(value = "/{id}")
    private Administrator updateAdministrator(@PathVariable("id") Long id, @Valid @RequestBody Administrator administrator, BindingResult bindingResult, Principal principal) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Administrator updatedAdministrator = administratorRestService.updateAdministrator(id, administrator);
                return updatedAdministrator;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
}