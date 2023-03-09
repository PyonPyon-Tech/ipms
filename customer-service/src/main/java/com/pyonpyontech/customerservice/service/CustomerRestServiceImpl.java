package com.pyonpyontech.customerservice.service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.customerservice.service.UserRestService;
import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.model.UserModel;
import com.pyonpyontech.customerservice.repository.customer_db.CustomerDb;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CustomerRestServiceImpl implements CustomerRestService {
    
    @Autowired
    private CustomerDb customerDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public Customer getCustomerById(Long id) {
        Optional<Customer> customer = customerDb.findById(id);
        if(customer.isPresent()) {
            return customer.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public List<Customer> getCustomerList() {
        return customerDb.findAll();
    }
    
    @Override
    public Customer createCustomer(Customer customer) {
        // Reset all fields that might've been supplied by user
        customer.getUser().setRole(0);
        customer.getUser().setIsEmployee(0);
        customer.getUser().setUuid(null);
        
        UserModel createdCustomerUser = userRestService.createUser(customer.getUser());
        
        customer.setUser(createdCustomerUser);
        Customer createdCustomer = customerDb.save(customer);
        
        return createdCustomer;
    }
    
    @Override
    public Customer updateCustomer(Customer updatedCustomer) {
        Customer customer = getCustomerById(updatedCustomer.getId());
        
        UserModel updatedCustomerUser = updatedCustomer.getUser();
        UserModel customerUser = customer.getUser();
        
        if(updatedCustomerUser.getName() != null)
            customerUser.setName(updatedCustomerUser.getName());
        
        if(updatedCustomerUser.getPassword() != null)
            customerUser.setPassword(jwtUserDetailsService.encrypt(updatedCustomerUser.getPassword()));
        
        customer.setUser(customerUser);
        Customer savedUpdatedCustomer = customerDb.save(customer);

        return savedUpdatedCustomer;
    }
}