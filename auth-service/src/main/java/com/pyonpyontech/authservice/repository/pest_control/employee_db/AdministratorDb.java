package com.pyonpyontech.authservice.repository.pest_control.employee_db;

import com.pyonpyontech.authservice.model.pest_control.employee.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorDb extends JpaRepository<Administrator, Long> {
}
