package com.pyonpyontech.scheduleservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.scheduleservice.model.customer.Outlet;
import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;

import com.pyonpyontech.scheduleservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import com.pyonpyontech.scheduleservice.repository.pest_control.ScheduleDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.scheduleservice.repository.PeriodDb;
import com.pyonpyontech.scheduleservice.repository.customer_db.OutletDb;

import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.scheduleservice.repository.pest_control.employee_db.TechnicianDb;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
    private TechnicianDb technicianDb;
    @Autowired
    private OutletDb outletDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private EntityManager entityManager;
    
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
    public Schedule createSchedule(List<Visitation> visitations, Long periodId, String technicianUsername) {
        Optional<Technician> technicianOptional = technicianDb.findByUsername(technicianUsername);
        if(technicianOptional.isEmpty()){
            throw new NoSuchElementException();
        }
        Technician technician = technicianOptional.get();
        // check if a schedule with the same period had already exists
        Optional<Schedule> schedule = scheduleDb.findScheduleByPeriodAndTechnician(periodId, technician.getId());
        if(schedule.isPresent()){
            throw new DataIntegrityViolationException("Sudah ada data schedule!");
        }
        
        Period periodRef = entityManager.getReference(Period.class, periodId);
        
        for(Visitation scheduleVisitation : visitations)
            if(scheduleVisitation.getDate().getMonthValue() != periodRef.getMonth().getValue()) 
                throw new IllegalStateException("Terdapat kunjungan pada bulan yang tidak sesuai!");
        
        // end check
        Supervisor supervisor = technician.getSupervisor();

        Schedule newSchedule = new Schedule();
        newSchedule.setPeriod(periodRef);
        newSchedule.setTechnician(technician);
        newSchedule.setSupervisor(supervisor);
        // iterate over visitations
        List<Visitation> newVisitations = new ArrayList<>();
        for(Visitation visitation: visitations){
            Outlet outletRef = entityManager.getReference(Outlet.class, visitation.getOutlet().getId());
            Visitation newVisitation = new Visitation();
            newVisitation.setSchedule(newSchedule);
            newVisitation.setPeriod(periodRef);
            newVisitation.setOutlet(outletRef);
            newVisitation.setDate(visitation.getDate());
            newVisitations.add(newVisitation);
        }
        newSchedule.setVisitations(newVisitations);
        newSchedule.setIsApproved(0);
        newSchedule.setComment("");
        return scheduleDb.save(newSchedule);
    }
    
    @Override
    public Schedule approveSchedule(Long technicianId, Long periodId, String comment, Integer isApproved) {
        Schedule targetSchedule = getScheduleByTechnicianPeriodId(technicianId, periodId);
        
        targetSchedule.setComment(comment);
        targetSchedule.setIsApproved(isApproved);
        
        return scheduleDb.save(targetSchedule);
    }
    
    @Override
    public List<Visitation> updateSchedule(List<Visitation> visitations) {
        List<Visitation> toBeSaved = new ArrayList<>();
        for(Visitation v: visitations){
            Visitation currentVisitation = visitationDb.findById(v.getId()).orElse(null);
            if(currentVisitation == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
            System.out.println(v.getDate());
            currentVisitation.setDate(v.getDate());
            toBeSaved.add(currentVisitation);
        }
        return visitationDb.saveAll(toBeSaved);
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
    public Period findPeriod(Long month, Long year) {
        Period period = periodDb.findPeriod(month-1, year).orElse(null);
        if(period == null){
            throw new NoSuchElementException();
        }
        return period;
    }

    @Override
    public List<Visitation> getVisitationsBySchedulePeriodId(Long scheduleId, Long periodId) {
        return visitationDb.findBySchedulePeriodId(scheduleId, periodId);
    }
    
    private Schedule getScheduleByTechnicianPeriodId(Long technicianId, Long periodId) {
        Optional<Schedule> schedule = scheduleDb.findScheduleByPeriodAndTechnician(periodId, technicianId);
        if(schedule.isPresent()) {
            return schedule.get();
        } else {
            throw new NoSuchElementException();
        }
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