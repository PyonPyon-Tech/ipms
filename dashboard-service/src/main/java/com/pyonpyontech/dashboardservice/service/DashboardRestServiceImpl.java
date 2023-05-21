package com.pyonpyontech.dashboardservice.service;

import java.time.Month;
import java.util.*;

import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.UserModel;
import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.model.customer.Customer;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.model.customer.Complaint;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.dashboardservice.repository.PeriodDb;
import com.pyonpyontech.dashboardservice.repository.UserDb;
import com.pyonpyontech.dashboardservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.dashboardservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.dashboardservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.dashboardservice.repository.pest_control.employee_db.SupervisorDb;
import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.dashboardservice.dto.*;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.User;
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
    private UserDb userDb;

    @Autowired
    private SupervisorDb supervisorDb;
    @Autowired
    private PeriodDb periodDb ;

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

    @Override
    public Period getVisitationsByEmployeeUsername(String username) {
        Date today = new Date();
        CustomerVisitationDto customerVisitationData = new CustomerVisitationDto(Long.valueOf(0), Long.valueOf(0));
        UserModel user = getEmployeeByUsername(username);
        Period period = getPeriodByDate(today);

        if (user.getRole() == 1 || user.getRole() == 2 ) {
            customerVisitationData.setTotalVisitations(Long.valueOf(period.getVisitations().size()));
            customerVisitationData.setCompletedVisitations(Long.valueOf(period.getReports().size()));
        } else if (user.getRole() == 3) {
            Supervisor supervisor = getSupervisorByUsername(username);

            for (Visitation v : period.getVisitations()){

            }



        } else if (user.getRole() == 4){

        } else {
            throw new NoSuchElementException();
        }

        return getPeriodByDate(today);


//
//        return customerVisitationData;
    }
    private Period getPeriodByDate(Date date) {
        Optional<Period> period = periodDb.findByMonthAndYear(Month.of(date.getMonth()+1), date.getYear() + 1900);
        if(period.isPresent()) {
            return period.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    private UserModel getEmployeeByUsername(String username) {
        Optional<UserModel> user = userDb.findByUsername(username);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    private Supervisor getSupervisorByUsername(String username) {
        Optional<Supervisor> user = supervisorDb.findByUser_Username(username);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}