package com.pyonpyontech.dashboardservice.restcontroller;

import com.pyonpyontech.dashboardservice.dto.CustomerComplaintChartDto;
import com.pyonpyontech.dashboardservice.dto.CustomerComplaintDto;
import com.pyonpyontech.dashboardservice.dto.CustomerVisitationDto;
import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.model.pest_control.Pesticide;
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
import java.util.Map;
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
            return dashboardRestService.getVisitationsByEmployeeUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }
    
    @GetMapping(value = "/complaints")
    private CustomerComplaintDto retrieveComplaints(Principal principal) {
        try {
            return dashboardRestService.getComplaintsByEmployeeUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }
    
    @GetMapping(value = "/recent-reports")
    private List<CsrReport> retrieveRecentReports(Principal principal) {
        try {
            return dashboardRestService.getRecentReportsByEmployeeUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }

    @GetMapping(value = "/complaints-charts")
    private List<CustomerComplaintChartDto> retrieveComplaintChart(Principal principal) {
        try {
            return dashboardRestService.getComplaintChartByEmployeeUsername(principal.getName());
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }

    @GetMapping(value = "/pest-trend")
    private List<Map<String, Integer>> retrievePestTrends(Principal principal){
        try {
            return dashboardRestService.getPestTrendsByUsername(principal.getName());
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found.");
        }
    }

    @GetMapping(value = "/complaints-trend")
    private List<Integer> retrieveComplaintTrend(Principal principal){
        try {
            return  dashboardRestService.getComplaintTrend(principal.getName(), 2023);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping(value = "/low-stock")
    private List<Pesticide> retrieveLowPesticide(){
        try {
            return  dashboardRestService.getLowStock();
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    
}