package com.pyonpyontech.customerservice.repository.customer_db;

import com.pyonpyontech.customerservice.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDb extends JpaRepository<Customer, Long> {
}
