package com.pyonpyontech.employeeservice.repository.pest_control.employee_db;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

@Repository
public interface AdministratorDb extends JpaRepository<Administrator, Long> {
  @Query(value =
          "SELECT * FROM administrator AS a WHERE a.user_id=(SELECT uuid FROM user as u WHERE u.username=:username)", nativeQuery = true)
  Optional<Administrator> findByUsername(@Param("username") String username);
}
