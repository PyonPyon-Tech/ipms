package com.pyonpyontech.inventoryservice.repository.customer_service_report_db;

import com.pyonpyontech.inventoryservice.model.customer_service_report.CsrPesticideUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrPesticideUsageDb extends JpaRepository<CsrPesticideUsage, Long> {
}
