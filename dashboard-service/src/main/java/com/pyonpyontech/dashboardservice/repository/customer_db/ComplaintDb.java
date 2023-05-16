package com.pyonpyontech.dashboardservice.repository.customer_db;

import com.pyonpyontech.dashboardservice.model.customer.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface ComplaintDb extends JpaRepository<Complaint, Long> {

}