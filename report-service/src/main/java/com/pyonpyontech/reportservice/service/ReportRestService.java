package com.pyonpyontech.reportservice.service;

import com.pyonpyontech.reportservice.dto.ReportFormDTO;
import com.pyonpyontech.reportservice.dto.SummaryReport;
import com.pyonpyontech.reportservice.dto.RequestFormDTO;
import com.pyonpyontech.reportservice.model.Period;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrArea;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.Pest;
import com.pyonpyontech.reportservice.model.pest_control.Pesticide;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import com.pyonpyontech.reportservice.repository.PeriodDb;
import com.pyonpyontech.reportservice.repository.customer_db.OutletDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrAreaDb;
import com.pyonpyontech.reportservice.repository.customer_service_report_db.CsrReportDb;
import com.pyonpyontech.reportservice.repository.pest_control.PestDb;
import com.pyonpyontech.reportservice.repository.pest_control.PesticideDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional
public class ReportRestService {
    @Autowired
    private CsrAreaDb csrAreaDb;
    @Autowired
    private PestDb pestDb;
    @Autowired
    private PesticideDb pesticideDb;
    @Autowired
    private CsrReportDb csrReportDb;
    @Autowired
    private OutletDb outletDb;
    @Autowired
    private PeriodDb periodDb;

    @PersistenceContext
    private EntityManager entityManager;

    public RequestFormDTO createRequestForm(){
        List<Outlet> outlets = outletDb.findAll();
        List<CsrArea> areas = csrAreaDb.findAll();
        List<Pest> pests = pestDb.findAll();
        List<Pesticide> pesticides = pesticideDb.findAll();
        return new RequestFormDTO(outlets, areas, pests, pesticides);
    }
    public CsrReport createReport(ReportFormDTO form){
        CsrReport report = form.withEntityManager(entityManager).toCsrReport();
        report = csrReportDb.save(report);
        return report;
    }

    public CsrReport detailReport(Long id){
        Optional<CsrReport> report = csrReportDb.findById(id);
        if(report.isEmpty()){
            throw new NoSuchElementException();
        }
        return report.get();
    }

    public SummaryReport summaryReport(Long id){
        Optional<CsrReport> report = csrReportDb.findById(id);
        if(report.isEmpty()){
            throw new NoSuchElementException();
        }
        return new SummaryReport(report.get());
    }

    public List<SummaryReport> summaryReportsByPeriod(Long id){
        Optional<Period> period = periodDb.findById(id);
        if(period.isEmpty()){
            throw new NoSuchElementException();
        }
        List<CsrReport> reports = period.get().getReports();
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports){
            summaryReports.add(new SummaryReport(report));
        }
        return summaryReports;
    }

    public List<SummaryReport> summaryReportsByPeriodAndTechnician(Long periodId, Long techId){
        List<CsrReport> reports = csrReportDb.findByPeriodIdAndTechnicianId(periodId, techId);
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports){
            summaryReports.add(new SummaryReport(report));
        }
        return summaryReports;
    }

    public List<SummaryReport> summaryReportsByPeriodAndSupervisor(Long periodId, Long supId){
        List<CsrReport> reports = csrReportDb.findByPeriodIdAndSupervisorId(periodId, supId);
        List<SummaryReport> summaryReports = new ArrayList<>();
        for(CsrReport report: reports){
            summaryReports.add(new SummaryReport(report));
        }
        return summaryReports;
    }

}