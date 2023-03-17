package com.pyonpyontech.scheduleservice.repository.customer_db;

import com.pyonpyontech.scheduleservice.model.customer.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackDb extends JpaRepository<Feedback, Long> {
}
