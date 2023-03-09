package com.pyonpyontech.employeeservice.repository.pest_control.employee_db;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerDb extends JpaRepository<Manager, Long> {
}
