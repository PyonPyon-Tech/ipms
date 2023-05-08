package com.pyonpyontech.customerservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.customerservice.service.UserRestService;
import com.pyonpyontech.customerservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.customerservice.model.pest_control.employee.Technician;
import com.pyonpyontech.customerservice.model.customer.Outlet;
import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.customerservice.model.UserModel;
import com.pyonpyontech.customerservice.model.Period;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.customerservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.customerservice.repository.customer_db.OutletDb;
import com.pyonpyontech.customerservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.customerservice.repository.pest_control.employee_db.TechnicianDb;
import com.pyonpyontech.customerservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.customerservice.repository.customer_db.ComplaintDb;
import com.pyonpyontech.customerservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.customerservice.repository.PeriodDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.pyonpyontech.customerservice.dto.PaginatedObject;
import com.pyonpyontech.customerservice.model.customer.Complaint;
import com.pyonpyontech.customerservice.dto.CreateComplaintDto;

import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CustomerRestServiceImpl implements CustomerRestService {
    
    @Autowired
    private CustomerDb customerDb;
    
    @Autowired
    private OutletDb outletDb;
    
    @Autowired
    private SupervisorDb supervisorDb;
    
    @Autowired
    private TechnicianDb technicianDb;
    
    @Autowired
    private ComplaintDb complaintDb;
    
    @Autowired
    private PeriodDb periodDb;
    
    @Autowired
    private CsrReportDb csrReportDb;
  
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public Customer getCustomerById(Long id) {
        Optional<Customer> customer = customerDb.findById(id);
        if(customer.isPresent()) {
            return customer.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public PaginatedObject<Customer> getFilteredPagedCustomer(String query, Long page) {
        Pageable pageRequest = PageRequest.of((int) (page - 1), 10, Sort.by("user.name").ascending());
        Page<Customer> customers = customerDb.filterAllByNameWithPagination(query, pageRequest);
        List<Customer> customerList = new ArrayList<>();
        
        for(Customer customer : customers.getContent()){
            customerList.add(customer);
        }
        
        return new PaginatedObject<>(page, customerList, (long) customers.getTotalPages(), customers.getTotalElements());
    }
    
    @Override
    public List<Customer> getCustomerList() {
        return customerDb.findAll();
    }
    
    @Override
    public PaginatedObject<Customer> getPagedCustomerList(Long page){
        Pageable pageRequest = PageRequest.of((int) (page - 1), 10, Sort.by("user.name").ascending());
        Page<Customer> customers = customerDb.findAll(pageRequest);
        List<Customer> customerList = new ArrayList<>();
        
        for(Customer customer : customers.getContent()){
            customerList.add(customer);
        }
        
        return new PaginatedObject<>(page, customerList, (long) customers.getTotalPages(), customers.getTotalElements());
    }
    
    @Override
    public Customer createCustomer(Customer customer) {
        // Reset all fields that might've been supplied by user
        customer.setId(null);
        customer.getUser().setRole(0);
        customer.getUser().setIsEmployee(0);
        customer.getUser().setUuid(null);
        customer.getUser().setIsActive(1);
        
        UserModel createdCustomerUser = userRestService.createUser(customer.getUser());
        
        customer.setUser(createdCustomerUser);
        Customer createdCustomer = customerDb.save(customer);
        
        return createdCustomer;
    }
    
    @Override
    public Customer updateCustomer(Long id, Customer updatedCustomer) {
        Customer customer = getCustomerById(id);
        
        UserModel updatedCustomerUser = updatedCustomer.getUser();
        UserModel customerUser = customer.getUser();
        
        if(updatedCustomerUser.getName() != null)
            customerUser.setName(updatedCustomerUser.getName());
        
        if(updatedCustomerUser.getPassword() != null)
            customerUser.setPassword(jwtUserDetailsService.encrypt(updatedCustomerUser.getPassword()));
        
        if(updatedCustomer.getContact() != null)
            customer.setContact(updatedCustomer.getContact());
        
        if(updatedCustomerUser.getIsActive() != null)
            customerUser.setIsActive(updatedCustomerUser.getIsActive());
        
        customer.setUser(customerUser);
        Customer savedUpdatedCustomer = customerDb.save(customer);

        return savedUpdatedCustomer;
    }
    
    @Override
    public List<Outlet> getOutletsByCustomerId(Long id) {
        return getCustomerById(id).getOutlets();
    }
    
    @Override
    public Outlet getOutletByCustomerOutletId(Long customerId, Long outletId) {
        Optional<Outlet> outlet = outletDb.findByCustomerOutletId(customerId, outletId);
        if(outlet.isPresent()) {
            return outlet.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public Outlet getOutletById(Long id) {
        Optional<Outlet> outlet = outletDb.findById(id);
        if(outlet.isPresent()) {
            return outlet.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public Outlet createOutletByCustomerId(Long id, Outlet outlet) {
        // Reset all fields that might've been supplied by user
        outlet.setId(null);
        outlet.setReports(null);
        outlet.setIsActive(1);
        
        Customer targetCustomer = getCustomerById(id);
        
        outlet.setCustomer(targetCustomer);
        outlet.setSupervisor(getSupervisorById(outlet.getSupervisor().getId()));
        outlet.setTechnician(null);
        
        Outlet createdOutlet = outletDb.save(outlet);
        
        return createdOutlet;
    }
    
    @Override
    public Outlet updateOutletByCustomerOutletId(Long customerId, Long outletId, Outlet updatedOutlet) {
        // Reset all fields that might've been supplied by user
        Outlet targetOutlet = getOutletByCustomerOutletId(customerId, outletId);
        
        if(updatedOutlet.getCustomer() != null)
            targetOutlet.setCustomer(getCustomerById(updatedOutlet.getCustomer().getId()));
        
        if(updatedOutlet.getName() != null)
            targetOutlet.setName(updatedOutlet.getName());
        
        if(updatedOutlet.getRegion() != null)
            targetOutlet.setRegion(updatedOutlet.getRegion());
        
        if(updatedOutlet.getAddress() != null)
            targetOutlet.setAddress(updatedOutlet.getAddress());
        
        if(updatedOutlet.getSupervisor() != null)
            targetOutlet.setSupervisor(getSupervisorById(updatedOutlet.getSupervisor().getId()));
        
        if(updatedOutlet.getTechnician() != null)
            targetOutlet.setTechnician(getTechnicianById(updatedOutlet.getTechnician().getId()));
        
        if(updatedOutlet.getIsActive() != null)
            targetOutlet.setIsActive(updatedOutlet.getIsActive());
        
        if(targetOutlet.getTechnician() != null && !targetOutlet.getTechnician().getSupervisor().getId().equals(targetOutlet.getSupervisor().getId()))
            throw new IllegalStateException("Technician is not assigned to the provided supervisor!");
        
        Outlet savedUpdatedOutlet = outletDb.save(targetOutlet);
        
        return savedUpdatedOutlet;
    }
    
    @Override
    public List<CsrReport> getOutletReportsByCustomerOutletId(Long customerId, Long outletId) {
        return getOutletByCustomerOutletId(customerId, outletId).getReports();
    }
    
    @Override
    public List<CsrReport> getReportsByCustomerId(Long id) {
        List<CsrReport> reportList = new ArrayList<>();
        
        Customer targetCustomer = getCustomerById(id);
        
        for(Outlet outlet : targetCustomer.getOutlets())
            for(CsrReport csrReport : outlet.getReports())
                reportList.add(csrReport);
            
        return reportList;
    }
    
    @Override
    public List<Complaint> getComplaints(String username) {
        UserModel user = userRestService.getUserByUsername(username);
        List<Complaint> complaints = new ArrayList<>();
        
        if (user.getRole().equals(0)) {
            Customer customer = getCustomerByUsername(username);
            complaints = customer.getComplaints();
        } else if (user.getRole().equals(1) || user.getRole().equals(2)) {
            complaints = complaintDb.findAll();
        } else if (user.getRole().equals(3)) {
            Supervisor supervisor = getSupervisorByUsername(username);
            
            for (Technician t : supervisor.getSubordinates())
                for (CsrReport r : csrReportDb.findAllByTechnician(t))
                    if (r.getComplaint() != null)
                        complaints.add(r.getComplaint());
        } else if (user.getRole().equals(4)) {
            Technician technician = getTechnicianByUsername(username);
            
            for (CsrReport r : csrReportDb.findAllByTechnician(technician))
                if (r.getComplaint() != null)
                    complaints.add(r.getComplaint());
        }

        return complaints;
    }
    
    @Override
    public Complaint getComplaint(Long id, String username) {
        UserModel user = userRestService.getUserByUsername(username);
        Complaint complaint = getComplaintById(id);
        
        if (user.getRole() == 0 && !complaint.getCustomer().getUser().getUuid().equals(user.getUuid()))
            throw new IllegalStateException();
          
        if (user.getRole() == 3) {
            Supervisor supervisor = getSupervisorByUsername(username);
            boolean isAuthorized = false;
            
            techloop:
            for (Technician t : supervisor.getSubordinates())
                for (CsrReport r : csrReportDb.findAllByTechnician(t))
                    if (r.getId().equals(complaint.getReport().getId())) {
                        isAuthorized = true;
                        break techloop;
                    }
            
            if (!isAuthorized) throw new IllegalStateException();
        }
        
        if (user.getRole() == 4) {
            Technician technician = getTechnicianByUsername(username);
            boolean isAuthorized = false;
            
            for (CsrReport r : csrReportDb.findAllByTechnician(technician)) {
                if (r.getId().equals(complaint.getReport().getId())) {
                    isAuthorized = true;
                    break;
                }
            }
            
            if (!isAuthorized) throw new IllegalStateException();
        }
        
        return complaint;
    }
    
    @Override
    public Complaint createComplaint(CreateComplaintDto complaint, String username) {
        UserModel user = userRestService.getUserByUsername(username);
        
        if (!user.getRole().equals(0))
            throw new UnsupportedOperationException();
        
        Customer customer = getCustomerByUsername(username);
        Complaint createdComplaint = new Complaint();
        createdComplaint.setCustomer(customer);
        createdComplaint.setPeriod(getPeriodById(complaint.getPeriod()));
        createdComplaint.setContent(complaint.getContent());
        CsrReport targetReport = null;
        
        if (complaint.getReport() != null) {
            targetReport = getCsrReportById(complaint.getReport());
            
            if (!targetReport.getOutlet().getCustomer().getId().equals(customer.getId()))
                throw new UnsupportedOperationException();
            
            if (targetReport.getComplaint() != null)
                throw new IllegalStateException();
            
            createdComplaint.setReport(targetReport);
        }
        
        Complaint savedComplaint = complaintDb.save(createdComplaint);
        
        if (targetReport != null) {
            targetReport.setComplaint(savedComplaint);
            csrReportDb.save(targetReport);
        }

        return savedComplaint;
    }
    
    private Supervisor getSupervisorById(Long id) {
        Optional<Supervisor> supervisor = supervisorDb.findById(id);
        if(supervisor.isPresent()) {
            return supervisor.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Supervisor getSupervisorByUsername(String username) {
        Optional<Supervisor> supervisor = supervisorDb.findByUser_Username(username);
        if(supervisor.isPresent()) {
            return supervisor.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Technician getTechnicianByUsername(String username) {
        Optional<Technician> technician = technicianDb.findByUser_Username(username);
        if(technician.isPresent()) {
            return technician.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Technician getTechnicianById(Long id) {
        Optional<Technician> technician = technicianDb.findById(id);
        if(technician.isPresent()) {
            return technician.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Customer getCustomerByUsername(String username) {
        Optional<Customer> customer = customerDb.findByUser_Username(username);
        if(customer.isPresent()) {
            return customer.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Period getPeriodById(Long id) {
        Optional<Period> period = periodDb.findById(id);
        if(period.isPresent()) {
            return period.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private CsrReport getCsrReportById(Long id) {
        Optional<CsrReport> csrReport = csrReportDb.findById(id);
        if(csrReport.isPresent()) {
            return csrReport.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Complaint getComplaintById(Long id) {
        Optional<Complaint> complaint = complaintDb.findById(id);
        if(complaint.isPresent()) {
            return complaint.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}