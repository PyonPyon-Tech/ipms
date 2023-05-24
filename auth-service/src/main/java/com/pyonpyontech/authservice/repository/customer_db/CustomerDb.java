package com.pyonpyontech.authservice.repository.customer_db;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerDb extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUser(UserModel user);

}
