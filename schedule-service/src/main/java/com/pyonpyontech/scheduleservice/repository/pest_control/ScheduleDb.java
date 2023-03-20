package com.pyonpyontech.scheduleservice.repository.pest_control;

import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleDb extends JpaRepository<Schedule, Long> {
    @Query(value = "SELECT * FROM schedule AS s WHERE s.period_id=:period AND s.technician_id=:technician", nativeQuery = true)
    Optional<Schedule> findScheduleByPeriodAndTechnician(@Param("period") Long period, @Param("technician") Long technician);
}
