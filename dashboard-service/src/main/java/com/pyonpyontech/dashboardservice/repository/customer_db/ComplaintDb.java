package com.pyonpyontech.dashboardservice.repository.customer_db;

import com.pyonpyontech.dashboardservice.model.customer.Complaint;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Technician;
import com.pyonpyontech.dashboardservice.model.customer.Outlet;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface ComplaintDb extends JpaRepository<Complaint, Long> {
    List<Complaint> findAllByOutlet_Technician(Technician technician);
    List<Complaint> findAllByOutlet_Supervisor(Supervisor supervisor);
    Integer countByPeriodId(Long id);
    Integer countByPeriodIdAndReportTechnician(Long id, Technician technician);
    List<Complaint> findAllByOutlet(Outlet outlet);


}
