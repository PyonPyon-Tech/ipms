package com.pyonpyontech.inventoryservice.repository.pest_control.employee_db;

import com.pyonpyontech.inventoryservice.model.pest_control.employee.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupervisorDb extends JpaRepository<Supervisor, Long> {
}
