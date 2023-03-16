package com.pyonpyontech.inventoryservice.repository.pest_control;

import com.pyonpyontech.inventoryservice.model.pest_control.Visitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitationDb extends JpaRepository<Visitation, Long> {
    @Query(value =
            "SELECT * FROM visitation AS v " +
            "WHERE v.schedule_id=:scheduleId AND v.period_id=:periodId ", nativeQuery = true)
    List<Visitation> findBySchedulePeriodId(@Param("scheduleId") Long scheduleId, @Param("periodId") Long periodId);
}
