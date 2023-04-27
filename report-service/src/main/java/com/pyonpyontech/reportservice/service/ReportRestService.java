package com.pyonpyontech.reportservice.service;

import com.pyonpyontech.reportservice.dto.PaginatedObject;
import com.pyonpyontech.reportservice.dto.SummaryReport;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.*;
import com.pyonpyontech.reportservice.model.pest_control.Pesticide;
import com.pyonpyontech.reportservice.model.pest_control.Schedule;
import com.pyonpyontech.reportservice.repository.PeriodDb;
import com.pyonpyontech.reportservice.repository.customer_db.OutletDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrAreaDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrFindingPestDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.reportservice.repository.pest_control.PesticideDb;
import com.pyonpyontech.reportservice.repository.pest_control.ScheduleDb;
import com.pyonpyontech.reportservice.repository.pest_control.employee_db.TechnicianDb;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class ReportRestService {
    private static final Logger logger = LoggerFactory.getLogger(ReportRestService.class);

    @Autowired
    private CsrAreaDb csrAreaDb;
    @Autowired
    private CsrFindingPestDb findingPestDb;
    @Autowired
    private PesticideDb pesticideDb;
    @Autowired
    private CsrReportDb csrReportDb;
    @Autowired
    private OutletDb outletDb;
    @Autowired
    private ScheduleDb scheduleDb;
    @Autowired
    private PeriodDb periodDb;

    @Autowired
    private TechnicianDb technicianDb;

    @PersistenceContext
    private EntityManager entityManager;

    public Map<String, Object> createRequestForm(Long technician, Long period){
        Optional<Schedule> scheduleOpt = scheduleDb.findByPeriodAndTechnician(technician, period);
        if(scheduleOpt.isEmpty()){
            throw new NoSuchElementException("Anda belum punya jadwal di bulan ini");
        }
        List<Outlet> outlets = outletDb.findBySchedule(scheduleOpt.get().getId());
        List<CsrArea> areas = csrAreaDb.findAll();
        List<CsrFindingPest> pests = findingPestDb.findAll();
        List<Pesticide> pesticides = pesticideDb.findAll();
        Map<String, Object> result = new HashMap<>();
        result.put("outlets", outlets);
        result.put("areas", areas);
        result.put("pests", pests);
        result.put("pesticides",pesticides);
        return result;
    }
    public CsrReport createReport(CsrReport report){
        System.out.println(report.getEnd());
        for(CsrDetailArea detailArea: report.getDetailAreas()){
            detailArea.setReport(report);
        }
        for(CsrDetailPest detailPest: report.getDetailPests()){
            detailPest.setReport(report);
        }
        for(CsrPesticideUsage pesticideUsage: report.getPesticideUsages()){
            pesticideUsage.setReport(report);
        }
        return csrReportDb.save(report);
    }

    public CsrReport detailReport(Long id){
        Optional<CsrReport> report = csrReportDb.findById(id);
        if(report.isEmpty()){
            throw new NoSuchElementException();
        }
        CsrReport r = report.get();
        for(CsrDetailArea detailArea: r.getDetailAreas()){
            detailArea.getArea().setFindings(new ArrayList<>());
        }
        return r;
    }

    public PaginatedObject<SummaryReport> summaryReportsByPeriod(Long id, Long page){
        Pageable pageRequest = PageRequest.of((int) (page-1), 10, Sort.by("date").descending());
        Page<CsrReport> reports = csrReportDb.findByPeriodId(id, pageRequest);
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports.getContent()){
            summaryReports.add(new SummaryReport(report));
        }
        return new PaginatedObject<>(page, summaryReports, (long) reports.getTotalPages(), reports.getTotalElements());
    }

    public PaginatedObject<SummaryReport> summaryReportsByPeriodAndTechnician(Long periodId, Long techId, Long page){
        Pageable pageRequest = PageRequest.of((int) (page-1), 10, Sort.by("date").descending());
        Page<CsrReport> reports = csrReportDb.findByPeriodIdAndTechnicianId(periodId, techId, pageRequest);
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports.getContent()){
            summaryReports.add(new SummaryReport(report));
        }
        return new PaginatedObject<>(page, summaryReports, (long) reports.getTotalPages(), reports.getTotalElements());
    }

    public PaginatedObject<SummaryReport> summaryReportsByPeriodAndSupervisor(Long periodId, Long supId, Long page){
        Pageable pageRequest = PageRequest.of((int) (page-1), 10, Sort.by("date").descending());
        Page<CsrReport> reports = csrReportDb.findByPeriodIdAndTechnicianSupervisorId(periodId, supId, pageRequest);
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports.getContent()){
            summaryReports.add(new SummaryReport(report));
        }
        return new PaginatedObject<>(page, summaryReports, (long) reports.getTotalPages(), reports.getTotalElements());
    }

    public PaginatedObject<SummaryReport> summaryReportsByPeriodAndOutlet(Long periodId, Long outletId, Long page){
        Pageable pageRequest = PageRequest.of((int) (page-1), 10, Sort.by("date").descending());
        Page<CsrReport> reports = csrReportDb.findByPeriodIdAndOutletId(periodId, outletId, pageRequest);
        List<SummaryReport> summaryReports = new ArrayList<>();
        logger.info("Ada "+reports.getTotalElements()+" report");
        for(CsrReport report: reports.getContent()){
            summaryReports.add(new SummaryReport(report));
        }
        return new PaginatedObject<>(page, summaryReports, (long) reports.getTotalPages(), reports.getTotalElements());
    }

    public PaginatedObject<SummaryReport> summaryReportsByPeriodAndCustomer(Long periodId, Long customerId, Long page){
        Pageable pageRequest = PageRequest.of((int) (page-1), 10, Sort.by("date").descending());
        Page<CsrReport> reports = csrReportDb.findByPeriodIdAndOutletCustomerId(periodId, customerId, pageRequest);
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports.getContent()){
            summaryReports.add(new SummaryReport(report));
        }
        return new PaginatedObject<>(page, summaryReports, (long) reports.getTotalPages(), reports.getTotalElements());
    }

//    public PaginatedObject<CsrReport> getReportListByTechnicianId(Long technicianId){
//        List<CsrReport> reportsById = csrReportDb.findByTechnicianId(technicianId);
//        if(reportsById.isEmpty()) {
//            throw new NoSuchElementException();
//        }
//        return reportsById;
//    }

}
