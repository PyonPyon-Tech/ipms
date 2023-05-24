package com.pyonpyontech.employeeservice.repository.pest_control.employee_db;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

@Repository
public interface ManagerDb extends JpaRepository<Manager, Long> {
  @Query(value =
          "SELECT * FROM manager AS m WHERE m.user_id=(SELECT uuid FROM user as u WHERE u.username=:username)", nativeQuery = true)
  Optional<Manager> findByUsername(@Param("username") String username);
}
