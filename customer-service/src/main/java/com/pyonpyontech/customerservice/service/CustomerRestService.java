package com.pyonpyontech.customerservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.customerservice.model.customer.Outlet;
import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;

public interface CustomerRestService {
    Customer getCustomerById(Long id);
    List<Customer> getCustomerList();
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long id, Customer updatedCustomer);
    
    List<Outlet> getOutletsByCustomerId(Long id);
    Outlet getOutletByCustomerOutletId(Long customerId, Long outletId);
    Outlet createOutletByCustomerId(Long id, Outlet outlet);
    Outlet updateOutletByCustomerOutletId(Long customerId, Long outletId, Outlet updatedOutlet);
    
    List<CsrReport> getOutletReportsByCustomerOutletId(Long customerId, Long outletId);
    List<CsrReport> getReportsByCustomerId(Long id);
}