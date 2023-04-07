package com.pyonpyontech.storageservice.repository.customer_service_report_db;

import com.pyonpyontech.storageservice.model.customer_service_report.CsrReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrReportDb extends JpaRepository<CsrReport, Long> {
}
