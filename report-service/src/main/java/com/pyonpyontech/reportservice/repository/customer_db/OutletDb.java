package com.pyonpyontech.reportservice.repository.customer_db;

import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutletDb extends JpaRepository<Outlet, Long> {
    @Query(value = "SELECT * FROM outlet AS o WHERE o.id IN " +
                    "(SELECT outlet_id FROM visitation AS v WHERE v.schedule_id=:schedule) ORDER BY customer_id DESC", nativeQuery = true)
    List<Outlet> findBySchedule(@Param("schedule") Long schedule);
}
