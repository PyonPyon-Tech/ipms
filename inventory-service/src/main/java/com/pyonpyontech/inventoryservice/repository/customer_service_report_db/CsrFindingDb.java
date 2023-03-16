package com.pyonpyontech.inventoryservice.repository.customer_service_report_db;

import com.pyonpyontech.inventoryservice.model.customer_service_report.CsrFinding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrFindingDb extends JpaRepository<CsrFinding, Long> {
}
