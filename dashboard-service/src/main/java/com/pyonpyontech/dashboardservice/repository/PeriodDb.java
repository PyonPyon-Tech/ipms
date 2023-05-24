package com.pyonpyontech.dashboardservice.repository;

import com.pyonpyontech.dashboardservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Indexed;
import org.springframework.stereotype.Repository;

import java.time.Month;
import java.util.List;
import java.util.Optional;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
    Optional<Period> findById(Long id);
    Optional<Period> findByMonthAndYear(Month month, Integer year);
    List<Period> findByYear(Integer year);
}
