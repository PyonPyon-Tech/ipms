package com.pyonpyontech.reportservice.repository.pest_control.employee_db;

import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.customer.Customer;
import com.pyonpyontech.reportservice.model.pest_control.employee.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupervisorDb extends JpaRepository<Supervisor, Long> {
    Supervisor findByUser(UserModel user);
}
