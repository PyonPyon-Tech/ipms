package com.pyonpyontech.dashboardservice.repository.customer_db;

import com.pyonpyontech.dashboardservice.model.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

@Repository
public interface CustomerDb extends JpaRepository<Customer, Long> {
    Page<Customer> findAll(Pageable pageable);
    
    @Query("SELECT c FROM Customer c WHERE LOWER(c.user.name) LIKE LOWER(CONCAT('%', ?1,'%'))")
    Page<Customer> filterAllByNameWithPagination(String query, Pageable pageable);
    
    Optional<Customer> findByUser_Username(String username);
}
