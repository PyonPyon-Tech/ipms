package com.pyonpyontech.inventoryservice.repository.customer_db;

import com.pyonpyontech.inventoryservice.model.customer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDb extends JpaRepository<Feedback, Long> {
}
