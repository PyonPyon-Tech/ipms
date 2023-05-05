package com.pyonpyontech.inventoryservice.repository.customer_db;

import com.pyonpyontech.inventoryservice.model.customer.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintDb extends JpaRepository<Complaint, Long> {
}
