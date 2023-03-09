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

import java.util.Map;
import java.util.HashMap;

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.service.CustomerRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerRestController {
    @Autowired
    private CustomerRestService customerRestService;

    // Retrieve by ID
    @GetMapping(value = "/{id}")
    private Customer retrieveCustomer(@PathVariable("id") Long id) {
        try {
            return customerRestService.getCustomerById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pasien with ID " + id + " not found.");
        }
    }
    
    // Retrieve all
    @GetMapping
    private List<Customer> retrieveAllCustomers() {
        return customerRestService.getCustomerList();
    }
    
    // Create customer
    @PostMapping
    private Map<String, Object> createCustomer(@Valid @RequestBody Customer customer, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Customer createdCustomer = customerRestService.createCustomer(customer);
                
                HashMap<String, Object> responseMap = new HashMap<>();
                responseMap.put("id", createdCustomer.getId());
                responseMap.put("userUuid", createdCustomer.getUser().getUuid());
                return responseMap;
            } catch(NullPointerException e) {
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
}