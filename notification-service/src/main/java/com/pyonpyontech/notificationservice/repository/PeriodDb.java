package com.pyonpyontech.notificationservice.repository;

import com.pyonpyontech.notificationservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
}
