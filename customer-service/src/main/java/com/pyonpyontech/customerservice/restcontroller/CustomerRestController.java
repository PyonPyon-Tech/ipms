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

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.service.CustomerRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/customer")
public class CustomerRestController {
    @Autowired
    private CustomerRestService customerRestService;

    // Retrieve
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
}