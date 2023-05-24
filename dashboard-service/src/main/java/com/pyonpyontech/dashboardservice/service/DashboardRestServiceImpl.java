package com.pyonpyontech.dashboardservice.service;

import java.time.Month;
import java.util.*;

import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.UserModel;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrDetailPest;
import com.pyonpyontech.dashboardservice.model.pest_control.Pesticide;
import com.pyonpyontech.dashboardservice.model.customer.Outlet;
import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.model.customer.Customer;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.dashboardservice.model.customer.Complaint;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Technician;
import com.pyonpyontech.dashboardservice.repository.PeriodDb;
import com.pyonpyontech.dashboardservice.repository.UserDb;
import com.pyonpyontech.dashboardservice.repository.customer_db.ComplaintDb;
import com.pyonpyontech.dashboardservice.repository.customer_service_report_db.CsrDetailPestDb;
import com.pyonpyontech.dashboardservice.repository.pest_control.PesticideDb;
import com.pyonpyontech.dashboardservice.repository.pest_control.VisitationDb;
import com.pyonpyontech.dashboardservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.dashboardservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.dashboardservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.dashboardservice.repository.pest_control.employee_db.TechnicianDb;
import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.dashboardservice.dto.*;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
@Transactional
public class DashboardRestServiceImpl implements DashboardRestService {
    @Autowired
    private CustomerDb customerDb;
    
    @Autowired
    private VisitationDb visitationDb;

    @Autowired
    private ComplaintDb complaintDb;

    @Autowired
    private UserDb userDb;

    @Autowired
    private SupervisorDb supervisorDb;

    @Autowired
    private TechnicianDb technicianDb;

    @Autowired
    private PeriodDb periodDb ;

    @Autowired
    private CsrReportDb csrReportDb;

    @Autowired
    private CsrDetailPestDb csrDetailPestDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private PesticideDb pesticideDb;
    
    @Override
    public CustomerVisitationDto getVisitationsByCustomerUsername(String username) {
        Customer customer = getCustomerByUsername(username);
        Date today = new Date();
        Period period = getPeriodByDate(today);
        List<Visitation> visitationList = visitationDb.findAllByPeriodAndOutlet_Customer(period, customer);
        List<CsrReport> csrReportsList = csrReportDb.findAllByPeriodAndOutlet_Customer(period, customer);
        
        CustomerVisitationDto customerVisitationData = new CustomerVisitationDto(Long.valueOf(0), Long.valueOf(0));

        customerVisitationData.setCompletedVisitations((long) csrReportsList.size());
        customerVisitationData.setTotalVisitations((long) visitationList.size());
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
        List<CsrReport> latestReportList = reportList.subList(Math.max(reportList.size() - 5, 0), reportList.size());
        Collections.reverse(latestReportList);
        
        return latestReportList;
    }

    public List<CsrReport> getRelatedReport(String username, Period period){
        UserModel user = userDb.findByUsername(username).get();
        switch (user.getRole()){
            case 1:
            case 2:
                return csrReportDb.findAllByPeriodId(period.getId());
            case 3:
                Supervisor supervisor = supervisorDb.findByUser_Username(username).get();
                return csrReportDb.findAllByPeriodAndTechnician_Supervisor(period, supervisor);
            case 4:
                Technician technician = technicianDb.findByUser_Username(username).get();
                return csrReportDb.findAllByPeriodAndTechnician(period, technician);
            default:
                return new ArrayList<>();
        }
    }

    @Override
    public List<Map<String, Integer>> getPestTrendsByUsername(String username) {
        List<Map<String, Integer>> result = new ArrayList<>();
        // find flies, rodent, cockroach, others
        List<Period> periods = periodDb.findByYear(2023);
        for(Period period: periods){
            int flies = 0;
            int rodent = 0;
            int cocroach = 0;
            int others = 0;

            List<CsrDetailPest> pests = new ArrayList<>();
            List<CsrReport> reports = this.getRelatedReport(username, period);
            for(CsrReport report: reports){
                pests.addAll(report.getDetailPests());
            }
            for(CsrDetailPest detailPest : pests){
                String pest = detailPest.getPest().toLowerCase();
                if(pest.contains("nyamuk") || pest.contains("lalat")){
                    flies++;
                } else if (pest.contains("tikus")) {
                    rodent++;
                }else if(pest.contains("kecoa")){
                    cocroach++;
                }else{
                    others++;
                }
            }
            Map<String, Integer> x = new HashMap<>();
            x.put("flies", flies);
            x.put("rodent", rodent);
            x.put("cockroach", cocroach);
            x.put("others", others);
            result.add(x);
        }
        return result;
    }

    @Override
    public List<Pesticide> getLowStock() {
        return pesticideDb.findByStockLessThan(10);
    }

    @Override
    public List<Integer> getComplaintTrend(String username, Integer year) {
        UserModel user = userDb.findByUsername(username).get();
        List<Period> periods = periodDb.findByYear(year);
        List<Integer> results = new ArrayList<>();
        for(Period period: periods){
            switch (user.getRole()){
                case 1:
                case 2:
                    results.add(complaintDb.countByPeriodId(period.getId()));
                    break;
                case 3:
                    Supervisor supervisor = supervisorDb.findByUser_Username(username).get();
                    int num = 0;
                    for(Technician technician: supervisor.getSubordinates()){
                        num += complaintDb.countByPeriodIdAndReportTechnician(period.getId(),technician );
                    }
                    results.add(num);
                    break;
                case 4:
                    Technician technician = technicianDb.findByUser_Username(username).get();
                    results.add(complaintDb.countByPeriodIdAndReportTechnician(period.getId(), technician));
                    break;
            }
        }
        return results;
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
    public CustomerVisitationDto getVisitationsByEmployeeUsername(String username) {
        Date today = new Date();
        CustomerVisitationDto customerVisitationData = new CustomerVisitationDto(Long.valueOf(0), Long.valueOf(0));
        UserModel user = getEmployeeByUsername(username);
        Period period = getPeriodByDate(today);

        if (user.getRole() == 1 || user.getRole() == 2 ) {
            customerVisitationData.setTotalVisitations(Long.valueOf(period.getVisitations().size()));
            customerVisitationData.setCompletedVisitations(Long.valueOf(period.getReports().size()));
        } else if (user.getRole() == 3) {
            Supervisor supervisor = getSupervisorByUsername(username);
            List<Outlet> supervisorOutlets = supervisor.getOutlets();

            long totalVisitation = 0;
            long completedVisitation = 0;

            for (Visitation v : period.getVisitations()){
                if (supervisorOutlets.contains(v.getOutlet())){
                    totalVisitation += 1;
                }
            }

            for (CsrReport r : period.getReports()){
                if (supervisorOutlets.contains(r.getOutlet())){
                    completedVisitation += 1;
                }
            }

            customerVisitationData.setTotalVisitations(totalVisitation);
            customerVisitationData.setCompletedVisitations(completedVisitation);
        } else if (user.getRole() == 4){
            Technician technician = getTechnicianByUsername(username);
            List<Outlet> technicianOutlets = technician.getOutlets();

            long totalVisitation = 0;
            long completedVisitation = 0;

            for (Visitation v : period.getVisitations()){
                if (technicianOutlets.contains(v.getOutlet())){
                    totalVisitation += 1;
                }
            }

            for (CsrReport r : period.getReports()){
                if (technicianOutlets.contains(r.getOutlet())){
                    completedVisitation += 1;
                }
            }

            customerVisitationData.setTotalVisitations(totalVisitation);
            customerVisitationData.setCompletedVisitations(completedVisitation);
        } else {
            throw new NoSuchElementException();
        }
        return customerVisitationData;
    }

    @Override
    public CustomerComplaintDto getComplaintsByEmployeeUsername(String username) {
        UserModel user = getEmployeeByUsername(username);
        List<Complaint> complaintList = new ArrayList<>();
        List<Complaint> acknowledgedComplaintList = new ArrayList<>();

        if (user.getRole() == 1 || user.getRole() == 2 ) {
            complaintList = complaintDb.findAll();
        } else if (user.getRole() == 3) {
            Supervisor supervisor = getSupervisorByUsername(username);
            complaintList.addAll(complaintDb.findAllByOutlet_Supervisor(supervisor));
        } else if (user.getRole() == 4) {
            Technician technician = getTechnicianByUsername(username);
            complaintList.addAll(complaintDb.findAllByOutlet_Technician(technician));
        }

        for (Complaint c : complaintList)
            if (c.getIsAcknowledged() == 1)
                acknowledgedComplaintList.add(c);

        return new CustomerComplaintDto(
                Long.valueOf(acknowledgedComplaintList.size()), Long.valueOf(complaintList.size())
        );
    }

    @Override
    public List<CsrReport> getRecentReportsByEmployeeUsername(String username) {
        UserModel user = getEmployeeByUsername(username);
        List<CsrReport> reportList;

        if (user.getRole() == 1 || user.getRole() == 2 ) {
            reportList = csrReportDb.findAll();
        } else if (user.getRole() == 3) {
            Supervisor supervisor = getSupervisorByUsername(username);
            reportList = csrReportDb.findAllByTechnician_Supervisor(supervisor);
        } else if (user.getRole() == 4){
            Technician technician = getTechnicianByUsername(username);
            reportList = csrReportDb.findAllByTechnician(technician);
        } else {
            throw new NoSuchElementException();
        }
        
        List<CsrReport> latestReportList = reportList.subList(Math.max(reportList.size() - 5, 0), reportList.size());
        Collections.reverse(latestReportList);
        
        return latestReportList;
    }

    @Override
    public List<CustomerComplaintChartDto> getComplaintChartByEmployeeUsername(String username) {
        UserModel user = getEmployeeByUsername(username);
        List<CustomerComplaintChartDto> customerComplaintChartData = new ArrayList<>();

        if (user.getRole() == 1 || user.getRole() == 2 ) {
//            reportList = csrReportDb.findAll();
        } else if (user.getRole() == 3) {
            Supervisor supervisor = getSupervisorByUsername(username);
//            reportList = csrReportDb.findAllByTechnician_Supervisor(supervisor);
        }

        return customerComplaintChartData;
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

    private Technician getTechnicianByUsername(String username) {
        Optional<Technician> user = technicianDb.findByUser_Username(username);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}