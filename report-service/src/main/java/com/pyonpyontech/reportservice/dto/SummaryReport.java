package com.pyonpyontech.reportservice.dto;

import com.pyonpyontech.reportservice.model.Period;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Setter
@Getter
public class SummaryReport {

    private Long id;
    private Outlet outlet;
    private Technician technician;
    private Period period;
    private int reportType;
    private int visitationType;
    private LocalDate visitationDate;
    private LocalTime start;
    private LocalTime end;

    public SummaryReport(CsrReport report){
        this.id = report.getId();
        this.outlet = report.getOutlet();
        this.technician = report.getTechnician();
        this.period = report.getPeriod();
        this.reportType = report.getReportType();
        this.visitationType = report.getVisitationType();
        this.visitationDate = report.getDate();
        this.start = report.getStart();
        this.end = report.getEnd();
    } // To minimize size, as the detail is too big
}
