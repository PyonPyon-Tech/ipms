package com.pyonpyontech.scheduleservice.repository;

import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
    @Query(value = "SELECT * FROM period AS p WHERE p.month=:month AND p.year=:year", nativeQuery = true)
    Optional<Period> findPeriod(@Param("month") Long month, @Param("year") Long year);
}
