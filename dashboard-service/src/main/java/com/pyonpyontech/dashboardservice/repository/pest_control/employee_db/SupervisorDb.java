package com.pyonpyontech.dashboardservice.repository.pest_control.employee_db;

import com.pyonpyontech.dashboardservice.model.pest_control.employee.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupervisorDb extends JpaRepository<Supervisor, Long> {
    Optional<Supervisor> findByUser_Username(String username);
}
