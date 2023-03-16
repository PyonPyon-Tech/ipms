package com.pyonpyontech.inventoryservice.repository.pest_control;

import com.pyonpyontech.inventoryservice.model.pest_control.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleDb extends JpaRepository<Schedule, Long> {
}
