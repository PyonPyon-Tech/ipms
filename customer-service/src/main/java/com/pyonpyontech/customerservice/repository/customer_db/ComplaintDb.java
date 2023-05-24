package com.pyonpyontech.customerservice.repository.customer_db;

import com.pyonpyontech.customerservice.model.customer.Complaint;
import com.pyonpyontech.customerservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.customerservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface ComplaintDb extends JpaRepository<Complaint, Long> {
    List<Complaint> findAllByOutlet_Supervisor(Supervisor supervisor);
    List<Complaint> findAllByOutlet_Technician(Technician technician);
}
