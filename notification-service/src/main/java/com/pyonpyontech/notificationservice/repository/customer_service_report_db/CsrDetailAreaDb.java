package com.pyonpyontech.notificationservice.repository.customer_service_report_db;

import com.pyonpyontech.notificationservice.model.customer_service_report.CsrDetailArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrDetailAreaDb extends JpaRepository<CsrDetailArea, Long> {
}
