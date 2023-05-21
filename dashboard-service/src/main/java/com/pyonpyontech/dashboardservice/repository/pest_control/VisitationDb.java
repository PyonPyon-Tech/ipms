package com.pyonpyontech.dashboardservice.repository.pest_control;

import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.customer.Outlet;
import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.dashboardservice.model.pest_control.employee.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface VisitationDb extends JpaRepository<Visitation, Long> {
    List<Visitation> findAllByOutlet_Customer_User_Username(String username);
    List<Visitation> findAllByPeriodAndOutlet_Supervisor(Period period, Supervisor supervisor);
    List<Visitation> findAllByPeriodAndOutlet_Technician(Period period, Technician technician);

}
