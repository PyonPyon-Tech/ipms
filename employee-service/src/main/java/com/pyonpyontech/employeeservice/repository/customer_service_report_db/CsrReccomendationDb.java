package com.pyonpyontech.employeeservice.repository.customer_service_report_db;

import com.pyonpyontech.employeeservice.model.customer_service_report.CsrRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsrReccomendationDb extends JpaRepository<CsrRecommendation, Long> {
}
