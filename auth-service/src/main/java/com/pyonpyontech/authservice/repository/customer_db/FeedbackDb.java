package com.pyonpyontech.authservice.repository.customer_db;

import com.pyonpyontech.authservice.model.customer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDb extends JpaRepository<Feedback, Long> {
}
