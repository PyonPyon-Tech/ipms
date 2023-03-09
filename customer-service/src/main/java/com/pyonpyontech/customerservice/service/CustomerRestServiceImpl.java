package com.pyonpyontech.customerservice.service;

import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.repository.customer_db.CustomerDb;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CustomerRestServiceImpl implements CustomerRestService {
    
    @Autowired
    private CustomerDb customerDb;
    
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
}