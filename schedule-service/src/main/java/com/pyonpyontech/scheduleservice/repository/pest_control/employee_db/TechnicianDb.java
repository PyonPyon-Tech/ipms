package com.pyonpyontech.scheduleservice.repository.pest_control.employee_db;

import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TechnicianDb extends JpaRepository<Technician, Long> {
    @Query(value =
            "SELECT * FROM technician AS t WHERE t.user_id=(SELECT uuid FROM user as u WHERE u.username=:username)", nativeQuery = true)
    Optional<Technician> findByUsername(@Param("username") String username);
}
