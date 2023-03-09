package com.pyonpyontech.employeeservice.repository.customer_db;

import com.pyonpyontech.employeeservice.model.customer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDb extends JpaRepository<Feedback, Long> {
}
