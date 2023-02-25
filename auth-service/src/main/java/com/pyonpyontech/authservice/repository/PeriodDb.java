package com.pyonpyontech.authservice.repository;

import com.pyonpyontech.authservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
}
