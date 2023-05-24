package com.pyonpyontech.reportservice.repository.customer_service_report_db;

import com.pyonpyontech.reportservice.model.customer_service_report.CsrArea;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CsrAreaDb extends JpaRepository<CsrArea, Long> {
    @Query(value =
            "SELECT * FROM csr_detail_area AS c " +
                    "WHERE c.report_id=:reportId" , nativeQuery = true)
    List<CsrArea> findByReportId(@Param("reportId") Long reportId);
}
