package com.pyonpyontech.employeeservice.repository;

import com.pyonpyontech.employeeservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
}
