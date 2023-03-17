package com.pyonpyontech.scheduleservice.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.scheduleservice.service.UserRestService;

import com.pyonpyontech.scheduleservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Manager;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import com.pyonpyontech.scheduleservice.model.customer.Outlet;
import com.pyonpyontech.scheduleservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.scheduleservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;

import com.pyonpyontech.scheduleservice.model.UserModel;

import com.pyonpyontech.scheduleservice.repository.pest_control.ScheduleDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.scheduleservice.repository.PeriodDb;
import com.pyonpyontech.scheduleservice.repository.customer_db.OutletDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ScheduleRestServiceImpl implements ScheduleRestService {

    @Autowired
    private ScheduleDb scheduleDb;
    
    @Autowired
    private VisitationDb visitationDb;
    
    @Autowired
    private PeriodDb periodDb;
    
    @Autowired
    private OutletDb outletDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public Schedule getScheduleById(Long id) {
        Optional<Schedule> schedule = scheduleDb.findById(id);
        if(schedule.isPresent()) {
            return schedule.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public List<Visitation> getVisitationsByScheduleId(Long id) {
        return getScheduleById(id).getVisitations();
    }
    
    @Override
    public Visitation createVisitation(Long id, Visitation visitation) {
        // Set object fields based on provided ID
        visitation.setOutlet(getOutletById(visitation.getOutlet().getId()));
        visitation.setPeriod(getPeriodById(visitation.getPeriod().getId()));
        visitation.setId(null);
        
        Schedule targetSchedule = getScheduleById(id);
        visitation.setSchedule(targetSchedule);
        
        Visitation createdVisitation = visitationDb.save(visitation);
        
        return createdVisitation;
    }
    
    @Override
    public List<Visitation> getVisitationsBySchedulePeriodId(Long scheduleId, Long periodId) {
        return visitationDb.findBySchedulePeriodId(scheduleId, periodId);
    }
    
    private Outlet getOutletById(Long id) {
        Optional<Outlet> outlet = outletDb.findById(id);
        if(outlet.isPresent()) {
            return outlet.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Period getPeriodById(Long id) {
        Optional<Period> period = periodDb.findById(id);
        if(period.isPresent()) {
            return period.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}