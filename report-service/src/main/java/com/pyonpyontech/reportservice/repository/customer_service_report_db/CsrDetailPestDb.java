package com.pyonpyontech.reportservice.repository.customer_service_report_db;

import com.pyonpyontech.reportservice.model.customer_service_report.CsrDetailPest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrDetailPestDb extends JpaRepository<CsrDetailPest, Long> {
}
