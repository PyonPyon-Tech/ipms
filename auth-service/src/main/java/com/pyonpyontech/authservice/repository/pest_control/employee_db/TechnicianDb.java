package com.pyonpyontech.authservice.repository.pest_control.employee_db;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import com.pyonpyontech.authservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnicianDb extends JpaRepository<Technician, Long> {
    Optional<Technician> findByUser(UserModel user);

}
