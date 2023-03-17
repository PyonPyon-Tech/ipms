package com.pyonpyontech.scheduleservice.service;

import java.util.Map;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.scheduleservice.model.customer.Outlet;
import com.pyonpyontech.scheduleservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.scheduleservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;
import com.pyonpyontech.scheduleservice.model.Period;

public interface ScheduleRestService {
    Schedule getScheduleById(Long id);
    List<Visitation> getVisitationsByScheduleId(Long id);
    List<Visitation> getVisitationsBySchedulePeriodId(Long scheduleId, Long periodId);
    Visitation createVisitation(Long id, Visitation visitation);
}