package com.pyonpyontech.reportservice.service;

import com.pyonpyontech.reportservice.dto.LabelValue;
import com.pyonpyontech.reportservice.dto.ReportFilterDto;
import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.customer.Customer;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import com.pyonpyontech.reportservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.reportservice.repository.customer_db.OutletDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.reportservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.reportservice.repository.pest_control.employee_db.TechnicianDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ReportFilterService {
    @Autowired
    private CsrReportDb csrReportDb;
    @Autowired
    private CustomerDb customerDb;
    @Autowired
    private SupervisorDb supervisorDb;
    @Autowired
    private TechnicianDb technicianDb;
    @Autowired
    private OutletDb outletDb;

    public ReportFilterDto byCustomer(UserModel user){
        ReportFilterDto result = new ReportFilterDto();
        List<LabelValue> outlet = new ArrayList<>();
        Customer customer = customerDb.findByUser(user);
        for (Outlet o: customer.getOutlets()){
            outlet.add(new LabelValue(o.getName(), o.getId()));
        }
        result.setOutlet(outlet);
        return result;
    }
    public ReportFilterDto byManagerAndAdministrator(UserModel user){
        ReportFilterDto result = new ReportFilterDto();
        for (Outlet o: outletDb.findAll()){
            result.getOutlet().add(new LabelValue(o.getName(), o.getId()));
        }
        for(Customer c: customerDb.findAll()){
            result.getCustomer().add(new LabelValue(c.getUser().getName(), c.getId()));
        }
        for(Supervisor s: supervisorDb.findAll()){
            result.getSupervisor().add(new LabelValue(s.getUser().getName(), s.getId()));
        }
        for(Technician t: technicianDb.findAll()){
            result.getTechnician().add(new LabelValue(t.getUser().getName(), t.getId()));
        }
        return result;
    }

    public ReportFilterDto bySupervisor(UserModel user){
        ReportFilterDto result = new ReportFilterDto();
        Supervisor supervisor = supervisorDb.findByUser(user);
        for(Technician t: supervisor.getSubordinates()){
            result.getTechnician().add(new LabelValue(t.getUser().getName(), t.getId()));
            for(Outlet o: t.getOutlets()){
                result.getOutlet().add(new LabelValue(o.getName(), o.getId()));
            }
        }
        return result;
    }
    public ReportFilterDto byTechnician(UserModel user){
        ReportFilterDto result = new ReportFilterDto();
        Technician technician = technicianDb.findByUser(user).get();
        for(Outlet o: technician.getOutlets()){
            result.getOutlet().add(new LabelValue(o.getName(), o.getId()));
        }
        return result;
    }
}
