package com.pyonpyontech.authservice.repository.customer_service_report_db;

import com.pyonpyontech.authservice.model.customer_service_report.CsrFindingArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrFindingDb extends JpaRepository<CsrFindingArea, Long> {
}
