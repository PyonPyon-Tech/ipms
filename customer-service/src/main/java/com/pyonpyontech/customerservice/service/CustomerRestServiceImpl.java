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
import com.pyonpyontech.customerservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.customerservice.repository.customer_db.OutletDb;
import com.pyonpyontech.customerservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.customerservice.repository.pest_control.employee_db.TechnicianDb;
import org.springframework.beans.factory.annotation.Autowired;

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
    public List<Customer> getCustomerList() {
        return customerDb.findAll();
    }
    
    @Override
    public Customer createCustomer(Customer customer) {
        // Reset all fields that might've been supplied by user
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
    public Outlet createOutletByCustomerId(Long id, Outlet outlet) {
        // Reset all fields that might've been supplied by user
        outlet.setId(null);
        outlet.setReports(null);
        outlet.setIsActive(1);
        
        Customer targetCustomer = getCustomerById(id);
        
        outlet.setCustomer(targetCustomer);
        outlet.setSupervisor(getSupervisorById(outlet.getSupervisor().getId()));
        outlet.setTechnician(getTechnicianById(outlet.getTechnician().getId()));
        
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
        
        if(targetOutlet.getTechnician().getSupervisor().getId() != targetOutlet.getSupervisor().getId())
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
    
    private Supervisor getSupervisorById(Long id) {
        Optional<Supervisor> supervisor = supervisorDb.findById(id);
        if(supervisor.isPresent()) {
            return supervisor.get();
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
}