package com.pyonpyontech.dashboardservice.repository.pest_control.employee_db;

import com.pyonpyontech.dashboardservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnicianDb extends JpaRepository<Technician, Long> {
    Optional<Technician> findByUser_Username(String username);
}
