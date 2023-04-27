package com.pyonpyontech.scheduleservice.service;

import java.util.List;

import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;

public interface ScheduleRestService {
    Schedule getScheduleById(Long id);
    List<Visitation> getVisitationsByScheduleId(Long id);

    List<Visitation> getVisitationsBySchedulePeriodId(Long scheduleId, Long periodId);

    Schedule createSchedule(List<Visitation> visitations, Long periodId, String technicianUsername);
    List<Visitation> updateSchedule(List<Visitation> visitations);

    Visitation createVisitation(Long id, Visitation visitation);

    Period findPeriod(Long month, Long year);
    Schedule approveSchedule(Long technicianId, Long periodId, String comment, Integer isApproved);
    Visitation transferVisitation(Long visitationId, Long targetTechnicianId, String supervisorUsername);
}