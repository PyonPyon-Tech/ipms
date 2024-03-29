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

public interface TechnicianRestService {
    Technician getTechnicianById(Long id);
    Technician getTechnicianByUsername(String username);
    List<Technician> getTechnicianList();
    Technician createTechnician(Technician technician);
    Technician updateTechnician(Long id, Technician updatedTechnician);
    List<Outlet> getTechnicianOutletList(Long id);
    List<PesticideRequest> getTechnicianPesticideRequestList(Long id);
    List<Map<String, Object>> getTechnicianReportList(Long id);
    List<Schedule> getTechnicianScheduleList(Long id);
    Technician updateTechnicianOutlets(Long id, List<Outlet> outlets);
}