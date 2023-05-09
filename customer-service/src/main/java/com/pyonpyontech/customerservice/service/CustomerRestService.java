package com.pyonpyontech.customerservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.customerservice.model.customer.Outlet;
import com.pyonpyontech.customerservice.model.customer.Customer;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.customerservice.dto.PaginatedObject;
import com.pyonpyontech.customerservice.model.customer.Complaint;
import com.pyonpyontech.customerservice.dto.CreateComplaintDto;

public interface CustomerRestService {
    Customer getCustomerById(Long id);
    PaginatedObject<Customer> getFilteredPagedCustomer(String query, Long page);
    List<Customer> getCustomerList();
    PaginatedObject<Customer> getPagedCustomerList(Long page);
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long id, Customer updatedCustomer);
    
    List<Outlet> getOutletsByCustomerId(Long id);
    Outlet getOutletById(Long id);
    Outlet getOutletByCustomerOutletId(Long customerId, Long outletId);
    Outlet createOutletByCustomerId(Long id, Outlet outlet);
    Outlet updateOutletByCustomerOutletId(Long customerId, Long outletId, Outlet updatedOutlet);
    
    List<CsrReport> getOutletReportsByCustomerOutletId(Long customerId, Long outletId);
    List<CsrReport> getReportsByCustomerId(Long id);
    List<CsrReport> getReports(String username);
    
    Complaint createComplaint(CreateComplaintDto complaint, String username);
    List<Complaint> getComplaints(String username);
    Complaint getComplaint(Long id, String username);
}