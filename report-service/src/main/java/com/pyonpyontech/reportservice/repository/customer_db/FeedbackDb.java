package com.pyonpyontech.reportservice.repository.customer_db;

import com.pyonpyontech.reportservice.model.customer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDb extends JpaRepository<Feedback, Long> {
}
