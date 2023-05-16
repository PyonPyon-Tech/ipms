package com.pyonpyontech.dashboardservice.repository.customer_service_report_db;

import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Technician;
import com.pyonpyontech.dashboardservice.model.customer.Customer;

@Repository
public interface CsrReportDb extends JpaRepository<CsrReport, Long> {
    Optional<CsrReport> findById(Long id);
    List<CsrReport> findAllByTechnician(Technician technician);
    List<CsrReport> findAllByOutlet_Customer(Customer customer);
}
