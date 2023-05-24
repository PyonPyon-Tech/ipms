package com.pyonpyontech.reportservice.repository;

import com.pyonpyontech.reportservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
}
