package com.pyonpyontech.dashboardservice.service;

import java.util.*;

import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.pest_control.Pesticide;
import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.dto.*;

import org.springframework.beans.factory.annotation.Autowired;

public interface DashboardRestService {
    CustomerVisitationDto getVisitationsByCustomerUsername(String username);
    CustomerVisitationDto getVisitationsByEmployeeUsername(String username);
    CustomerComplaintDto getComplaintsByCustomerUsername(String username);
    CustomerComplaintDto getComplaintsByEmployeeUsername(String username);
    List<CsrReport> getRecentReportsByCustomerUsername(String username);
    List<Map<String, Integer>> getPestTrendsByUsername(String username);
    List<Pesticide> getLowStock();
    List<Integer> getComplaintTrend(String username, Integer year);

    List<CsrReport> getRecentReportsByEmployeeUsername(String username);
    List<CustomerComplaintChartDto> getComplaintChartByEmployeeUsername(String username);
}