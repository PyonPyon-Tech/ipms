package com.pyonpyontech.customerservice.restcontroller;

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

import com.pyonpyontech.customerservice.dto.PaginatedObject;

import java.util.Map;
import java.util.HashMap;

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.customerservice.model.customer.Outlet;
import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.customerservice.service.CustomerRestService;
import com.pyonpyontech.customerservice.service.UserRestService;

import java.security.Principal;

@Slf4j
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerRestController {
    @Autowired
    private CustomerRestService customerRestService;
    
    @Autowired
    private UserRestService userRestService;

    // Retrieve by ID
    @GetMapping(value = "/{id}")
    private Customer retrieveCustomer(@PathVariable("id") Long id) {
        try {
            return customerRestService.getCustomerById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with ID " + id + " not found.");
        }
    }
    
    // Filter, paged
    @GetMapping(value = "/filter")
    private PaginatedObject<Customer> filterCustomerPages(
            @RequestParam("name") String name, 
            @RequestParam("page") Long page,
            Principal principal) {
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();

        try {
            switch (role) {
                case 1:
                case 2:
                    return customerRestService.getFilteredPagedCustomer(name, page);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }
    
    // Retrieve all
    @GetMapping
    private List<Customer> retrieveAllCustomers() {
        return customerRestService.getCustomerList();
    }
    
    // Retrieve paginated
    @GetMapping("/pages/{page}")
    private PaginatedObject<Customer> retrieveAllCustomerPages(
            @PathVariable("page") Long page,
            Principal principal) {
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();

        try {
            switch (role) {
                case 1:
                case 2:
                    return customerRestService.getPagedCustomerList(page);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }
    
    // Create customer
    @PostMapping
    private Customer createCustomer(@Valid @RequestBody Customer customer, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Customer createdCustomer = customerRestService.createCustomer(customer);
                return createdCustomer;
            } catch(NullPointerException | DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    // Update customer
    @PutMapping(value = "/{id}")
    private Customer updateCustomer(@PathVariable("id") Long id, @Valid @RequestBody Customer updatedCustomer, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            if(id == null)
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Customer ID not supplied");
            
            if(updatedCustomer.getUser() == null)
                return customerRestService.getCustomerById(id);
            
            Customer savedUpdatedCustomer = customerRestService.updateCustomer(id, updatedCustomer);

            return savedUpdatedCustomer;
        }
    }
    
    // Retrieve Outlets by Customer ID
    @GetMapping(value = "/{id}/outlets")
    private List<Outlet> retrieveOutletsByCustomerId(@PathVariable("id") Long id) {
        try {
            return customerRestService.getOutletsByCustomerId(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with ID " + id + " not found.");
        }
    }
    
    // Create Outlet by Customer ID
    @PostMapping(value = "/{id}/outlets")
    private Outlet createOutletByCustomerId(@PathVariable("id") Long id, @Valid @RequestBody Outlet outlet, BindingResult bindingResult) {
        try {
            return customerRestService.createOutletByCustomerId(id, outlet);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer with ID " + id + " not found.");
        }
    }
    
    // Retrieve Outlet by Outlet ID
    @GetMapping(value = "/outlets/{id}")
    private Outlet retrieveOutletById(@PathVariable("id") Long id) {
        try {
            return customerRestService.getOutletById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer or outlet with the specified ID not found.");
        }
    }
    
    // Retrieve Outlet by Customer and Outlet ID
    @GetMapping(value = "/{customerId}/outlets/{outletId}")
    private Outlet updateOutletByCustomerId(@PathVariable("customerId") Long customerId, @PathVariable("outletId") Long outletId) {
        try {
            return customerRestService.getOutletByCustomerOutletId(customerId, outletId);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer or outlet with the specified ID not found.");
        }
    }
    
    // Update Outlet by Customer and Outlet ID
    @PutMapping(value = "/{customerId}/outlets/{outletId}")
    private Outlet updateOutletByCustomerId(@PathVariable("customerId") Long customerId, @PathVariable("outletId") Long outletId, @Valid @RequestBody Outlet outlet, BindingResult bindingResult) {
        try {
            return customerRestService.updateOutletByCustomerOutletId(customerId, outletId, outlet);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer or outlet with the specified ID not found.");
        }
    }
    
    // Retrieve Reports by Customer and Outlet ID
    @GetMapping(value = "/{customerId}/outlets/{outletId}/reports")
    private List<CsrReport> retrieveReportsByCustomerOutletId(@PathVariable("customerId") Long customerId, @PathVariable("outletId") Long outletId) {
        try {
            return customerRestService.getOutletReportsByCustomerOutletId(customerId, outletId);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer or outlet with the specified ID not found.");
        }
    }
    
    // Retrieve Reports by Customer ID
    @GetMapping(value = "/{id}/reports")
    private List<CsrReport> retrieveReportsByCustomerId(@PathVariable("id") Long id) {
        try {
            return customerRestService.getReportsByCustomerId(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer or outlet with the specified ID not found.");
        }
    }
}