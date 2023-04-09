package com.pyonpyontech.reportservice.repository.pest_control;

import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleDb extends JpaRepository<Schedule, Long> {
    @Query(value = "SELECT * FROM schedule AS s WHERE s.technician_id=:technician AND s.period_id=:period", nativeQuery = true)
    Optional<Schedule> findByPeriodAndTechnician(@Param("technician") Long technician, @Param("period") Long period);
}
