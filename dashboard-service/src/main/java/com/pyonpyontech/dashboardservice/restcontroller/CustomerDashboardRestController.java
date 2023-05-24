package com.pyonpyontech.dashboardservice.restcontroller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.*;
import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.service.*;
import com.pyonpyontech.dashboardservice.dto.*;

import lombok.extern.slf4j.Slf4j;

import java.security.Principal;

@Slf4j
@RestController
@RequestMapping("/api/v1/dashboard/customers")
public class CustomerDashboardRestController {
    @Autowired
    private DashboardRestService dashboardRestService;
    
    @Autowired
    private UserRestService userRestService;
    
    @GetMapping(value = "/visitations")
    private CustomerVisitationDto retrieveVisitations(Principal principal) {
        try {
            return dashboardRestService.getVisitationsByCustomerUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }
    
    @GetMapping(value = "/complaints")
    private CustomerComplaintDto retrieveComplaints(Principal principal) {
        try {
            return dashboardRestService.getComplaintsByCustomerUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }
    
    @GetMapping(value = "/recent-reports")
    private List<CsrReport> retrieveRecentReports(Principal principal) {
        try {
            return dashboardRestService.getRecentReportsByCustomerUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }
}