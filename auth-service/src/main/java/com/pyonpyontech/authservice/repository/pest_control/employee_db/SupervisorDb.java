package com.pyonpyontech.authservice.repository.pest_control.employee_db;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import com.pyonpyontech.authservice.model.pest_control.employee.Supervisor;
import net.bytebuddy.implementation.bind.annotation.Super;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupervisorDb extends JpaRepository<Supervisor, Long> {
    Optional<Supervisor> findByUser(UserModel user);

}
