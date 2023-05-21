package com.pyonpyontech.dashboardservice.restcontroller;

import com.pyonpyontech.dashboardservice.dto.CustomerComplaintDto;
import com.pyonpyontech.dashboardservice.dto.CustomerVisitationDto;
import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.service.DashboardRestService;
import com.pyonpyontech.dashboardservice.service.UserRestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@RequestMapping("/api/v1/dashboard/employee")
public class EmployeeDashboardRestController {
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

    @GetMapping(value = "/period")
    private Period retrievePeriod(Principal principal) {
        try {
            return dashboardRestService.getVisitationsByEmployeeUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }
    
}