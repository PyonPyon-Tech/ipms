package com.pyonpyontech.employeeservice.service;

import java.util.Map;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Manager;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.employeeservice.model.pest_control.employee.Technician;
import com.pyonpyontech.employeeservice.model.customer.Outlet;
import com.pyonpyontech.employeeservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.employeeservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.employeeservice.model.pest_control.Schedule;

public interface SupervisorRestService {
    Supervisor getSupervisorById(Long id);
    Supervisor getSupervisorByUsername(String username);
    List<Supervisor> getSupervisorList();
    Supervisor createSupervisor(Supervisor supervisor);
    Supervisor updateSupervisor(Long id, Supervisor updatedSupervisor);
    List<Technician> getSupervisorTechnicianList(Long id);
    List<Outlet> getSupervisorOutletList(Long id);
    List<Schedule> getSupervisorScheduleList(Long id, Integer isApproved);
}