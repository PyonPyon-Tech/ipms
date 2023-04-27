package com.pyonpyontech.scheduleservice.restcontroller;

import java.security.Principal;
import java.util.*;
import javax.validation.Valid;

import com.pyonpyontech.scheduleservice.model.Period;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.DataIntegrityViolationException;

import lombok.extern.slf4j.Slf4j;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;

import com.pyonpyontech.scheduleservice.service.ScheduleRestService;
import com.pyonpyontech.scheduleservice.dto.VisitationTransferRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/schedules")
public class ScheduleRestController {
    @Autowired
    private ScheduleRestService scheduleRestService;
    
    // Retrieve by ID
    @GetMapping(value = "/{id}")
    private Schedule retrieveSchedule(@PathVariable("id") Long id) {
        try {
            return scheduleRestService.getScheduleById(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule with ID " + id + " not found.");
        }
    }
    
    // Retrieve visitations by schedule ID (optionally also period ID as request param)
    @GetMapping(value = "/{id}/visitations")
    private List<Visitation> retrieveScheduleVisitations(@PathVariable("id") Long id, @RequestParam(value = "period", required = false) Long period) {
        try {
            if(period == null)
                return scheduleRestService.getVisitationsByScheduleId(id);
            return scheduleRestService.getVisitationsBySchedulePeriodId(id, period);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Schedule with ID " + id + " not found.");
        }
    }
    
    // Create new visitation
    @PostMapping(value = "/{id}/visitations")
    private Visitation createVisitation(@PathVariable("id") Long id, @Valid @RequestBody Visitation visitation, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Visitation createdVisitation = scheduleRestService.createVisitation(id, visitation);
                return createdVisitation;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
            }
        }
    }

    @PostMapping(value = "/period/{id}")
    private Schedule createSchedule(@PathVariable("id") Long periodId, @Valid @RequestBody List<Visitation> visitations, BindingResult bindingResult,  Principal principal){
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                return scheduleRestService.createSchedule(visitations, periodId, principal.getName());
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,  e.getLocalizedMessage());
            }
        }
    }
    
    @PutMapping(value = "/visitations")
    private List<Visitation> updateSchedule(@Valid @RequestBody List<Visitation> visitations, BindingResult bindingResult,  Principal principal){
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                return scheduleRestService.updateSchedule(visitations);
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,  e.getLocalizedMessage());
            }
        }
    }

    @GetMapping(value = "/period/{month}/{year}")
    private Map<String, String> findPeriod(@PathVariable("month") Long month, @PathVariable("year") Long year ) {
        try {
            Map<String, String> result = new HashMap<>();
            Period period = scheduleRestService.findPeriod(month, year);
            result.put("id", "" + period.getId());
            result.put("month", period.getMonth().name());
            result.put("year", period.getYear().toString());
            return result;
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping(value = "/technicians/{technicianId}/period/{periodId}")
    private Schedule approveSchedule(@PathVariable("technicianId") Long technicianId, @PathVariable("periodId") Long periodId, @RequestBody Map<String, Object> payload) {
        return scheduleRestService.approveSchedule(technicianId, periodId, String.valueOf(payload.get("comment")), Integer.parseInt(String.valueOf(payload.get("isApproved"))));
    }
    
    @PostMapping(value = "/visitations/transfer")
    private Visitation transferVisitation(@Valid @RequestBody VisitationTransferRequest transferRequest, 
                                          Principal principal) {
        return scheduleRestService.transferVisitation(transferRequest.getVisitation(), 
                                                      transferRequest.getTechnician(), 
                                                      principal.getName());
    }
    

}