package com.pyonpyontech.customerservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.customerservice.model.customer.Customer;

public interface CustomerRestService {
    Customer getCustomerById(Long id);
    List<Customer> getCustomerList();
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long id, Customer updatedCustomer);
}