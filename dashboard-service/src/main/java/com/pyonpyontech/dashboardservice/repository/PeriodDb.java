package com.pyonpyontech.dashboardservice.repository;

import com.pyonpyontech.dashboardservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
    Optional<Period> findById(Long id);
}
