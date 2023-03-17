package com.pyonpyontech.inventoryservice.repository;

import com.pyonpyontech.inventoryservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
}
