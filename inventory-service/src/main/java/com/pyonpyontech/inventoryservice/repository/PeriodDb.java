package com.pyonpyontech.inventoryservice.repository;

import com.pyonpyontech.inventoryservice.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PeriodDb extends JpaRepository<Period, Long> {
  @Query(value =
          "SELECT * FROM period AS p " +
          "WHERE p.month=:month AND p.year=:year LIMIT 1", nativeQuery = true)
  Optional<Period> findByMonthAndYear(@Param("month") Integer month, @Param("year") Integer year);
}
