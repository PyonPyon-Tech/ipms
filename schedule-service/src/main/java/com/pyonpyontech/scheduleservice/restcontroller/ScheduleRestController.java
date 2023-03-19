package com.pyonpyontech.scheduleservice.restcontroller;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.DataIntegrityViolationException;

import lombok.extern.slf4j.Slf4j;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import com.pyonpyontech.scheduleservice.model.pest_control.Visitation;

import com.pyonpyontech.scheduleservice.service.ScheduleRestService;

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

    @PostMapping(value = "/{id}")
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
}