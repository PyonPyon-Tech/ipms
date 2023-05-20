package com.pyonpyontech.dashboardservice.service;

import java.util.*;

import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.model.customer.Customer;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.model.customer.Complaint;
import com.pyonpyontech.dashboardservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.dashboardservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.dashboardservice.repository.customer_service_report_db.CsrReportDb;
import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.dashboardservice.dto.*;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
@Transactional
public class DashboardRestServiceImpl implements DashboardRestService {
    
    @Autowired
    private CustomerDb customerDb;
    
    @Autowired
    private VisitationDb visitationDb;
    
    @Autowired
    private CsrReportDb csrReportDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public CustomerVisitationDto getVisitationsByCustomerUsername(String username) {
        List<Visitation> visitationList = visitationDb.findAllByOutlet_Customer_User_Username(username);
        
        CustomerVisitationDto customerVisitationData = new CustomerVisitationDto(Long.valueOf(0), Long.valueOf(0));
        LocalDate now = LocalDate.now();
        
        for (Visitation v : visitationList) {
            if (!v.getDate().getMonth().equals((new Date()).getMonth()))
                continue;
              
            customerVisitationData.setTotalVisitations(customerVisitationData.getTotalVisitations() + 1);
            if (now.isAfter(v.getDate()))
                customerVisitationData.setCompletedVisitations(customerVisitationData.getCompletedVisitations() + 1);
        }
        return customerVisitationData;
    }
    
    @Override
    public CustomerComplaintDto getComplaintsByCustomerUsername(String username) {
        List<Complaint> complaintList = getCustomerByUsername(username).getComplaints();
        List<Complaint> acknowledgedComplaintList = new ArrayList<>();
        
        for (Complaint c : complaintList)
          if (c.getIsAcknowledged() == 1)
            acknowledgedComplaintList.add(c);
        
        return new CustomerComplaintDto(
          Long.valueOf(acknowledgedComplaintList.size()), Long.valueOf(complaintList.size())
        );
    }
    
    @Override
    public List<CsrReport> getRecentReportsByCustomerUsername(String username) {
        List<CsrReport> reportList = csrReportDb.findAllByOutlet_Customer_User_Username(username);
        return reportList.subList(Math.max(reportList.size() - 5, 0), reportList.size());
    }
    
    private Customer getCustomerByUsername(String username) {
        Optional<Customer> customer = customerDb.findByUser_Username(username);
        if(customer.isPresent()) {
            return customer.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}