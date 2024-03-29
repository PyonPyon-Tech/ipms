package com.pyonpyontech.storageservice.repository.pest_control.employee_db;

import com.pyonpyontech.storageservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicianDb extends JpaRepository<Technician, Long> {
}
