package com.pyonpyontech.customerservice.repository.customer_service_report_db;

import com.pyonpyontech.customerservice.model.customer_service_report.CsrDetailArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrDetailAreaDb extends JpaRepository<CsrDetailArea, Long> {
}
