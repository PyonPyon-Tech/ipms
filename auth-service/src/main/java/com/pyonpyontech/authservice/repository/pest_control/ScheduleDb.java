package com.pyonpyontech.authservice.repository.pest_control;

import com.pyonpyontech.authservice.model.pest_control.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleDb extends JpaRepository<Schedule, Long> {
}
