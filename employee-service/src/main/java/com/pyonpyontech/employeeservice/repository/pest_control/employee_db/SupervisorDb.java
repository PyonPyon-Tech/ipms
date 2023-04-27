package com.pyonpyontech.employeeservice.repository.pest_control.employee_db;

import com.pyonpyontech.employeeservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

import java.util.Optional;

@Repository
public interface SupervisorDb extends JpaRepository<Supervisor, Long> {
    @Query(value =
            "SELECT * FROM supervisor AS s WHERE s.user_id=(SELECT uuid FROM user as u WHERE u.username=:username)", nativeQuery = true)
    Optional<Supervisor> findByUsername(@Param("username") String username);
}
