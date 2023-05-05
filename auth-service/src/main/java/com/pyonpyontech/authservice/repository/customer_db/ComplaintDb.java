package com.pyonpyontech.authservice.repository.customer_db;

import com.pyonpyontech.authservice.model.customer.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintDb extends JpaRepository<Complaint, Long> {
}
