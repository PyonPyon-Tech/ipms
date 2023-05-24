package com.pyonpyontech.authservice.repository.pest_control.employee_db;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import com.pyonpyontech.authservice.model.pest_control.employee.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministratorDb extends JpaRepository<Administrator, Long> {
    Optional<Administrator> findByUser(UserModel user);

}
