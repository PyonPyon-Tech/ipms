package com.pyonpyontech.notificationservice.repository.pest_control.employee_db;

import com.pyonpyontech.notificationservice.model.pest_control.employee.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupervisorDb extends JpaRepository<Supervisor, Long> {
}
