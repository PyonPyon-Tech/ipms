package com.pyonpyontech.reportservice.repository.customer_service_report_db;

import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

@Repository
public interface CsrReportDb extends PagingAndSortingRepository<CsrReport, Long> {
    Page<CsrReport> findByPeriodIdAndTechnicianId(Long periodId, Long techId, Pageable pageable);
    Page<CsrReport> findByPeriodIdAndOutletId(Long periodId, Long outletId, Pageable pageable);
    Page<CsrReport> findByPeriodId(Long periodId, Pageable pageable);
    Page<CsrReport> findByPeriodIdAndOutletCustomerId(Long periodId, Long customerId,  Pageable pageable);
    Page<CsrReport> findByPeriodIdAndTechnicianSupervisorId(Long periodId, Long supId, Pageable pageable);
}
