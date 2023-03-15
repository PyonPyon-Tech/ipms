package com.pyonpyontech.reportservice.repository.customer_service_report_db;

import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CsrReportDb extends JpaRepository<CsrReport, Long> {
    @Query(value =
            "SELECT * FROM csr_report AS c " +
            "WHERE c.technician_id=:techId AND c.period_id=:periodId " +
            "ORDER BY end_time DESC", nativeQuery = true)
    List<CsrReport> findByPeriodIdAndTechnicianId(@Param("periodId") Long periodId, @Param("techId") Long techId);

    @Query(value =
            "SELECT * FROM csr_report AS c " +
            "WHERE c.period_id=:periodId AND c.technician_id IN " +
            "(SELECT id FROM technician AS t where t.supervisor_id =:supId) ORDER BY end_time DESC", nativeQuery = true)
    List<CsrReport> findByPeriodIdAndSupervisorId(@Param("periodId") Long periodId, @Param("supId") Long supId);

    @Query(value =
            "SELECT * FROM csr_report AS c WHERE c.period_id=:periodId AND c.outlet_id=:outletId " +
            "ORDER BY end_time DESC", nativeQuery = true)
    List<CsrReport> findByPeriodIdAndOutletId(@Param("periodId") Long periodId, @Param("outletId") Long outletId);

    @Query(value = "SELECT * FROM csr_report AS c WHERE c.period_id=:periodId AND c.outlet_id IN " +
            "(SELECT id FROM outlet As o WHERE o.customer_id=:customerId)  ORDER BY end_time DESC", nativeQuery = true)
    List<CsrReport> findByPeriodIdAndCustomerId(@Param("periodId") Long periodId, @Param("customerId") Long customerId);

}
