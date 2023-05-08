package com.pyonpyontech.notificationservice.repository.customer_db;

import com.pyonpyontech.notificationservice.model.customer.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintDb extends JpaRepository<Complaint, Long> {
}
