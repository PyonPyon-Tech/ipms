package com.pyonpyontech.reportservice.repository.pest_control.employee_db;

import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TechnicianDb extends JpaRepository<Technician, Long> {
    Optional<Technician> findByUser(UserModel user);

}
