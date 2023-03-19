package com.pyonpyontech.notificationservice.repository.customer_db;

import com.pyonpyontech.notificationservice.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerDb extends JpaRepository<Customer, Long> {
}
