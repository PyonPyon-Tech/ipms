package com.pyonpyontech.scheduleservice.repository;

import com.pyonpyontech.scheduleservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
}
