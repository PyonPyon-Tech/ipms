package com.pyonpyontech.reportservice.dto;

import com.pyonpyontech.reportservice.model.Period;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.*;
import com.pyonpyontech.reportservice.model.pest_control.Pesticide;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class ReportFormDTO {
    private Long technicianId;
    private Long outletId;
    private Long periodId;
    private int reportType;
    private int visitationType;
    private LocalDateTime start;
    private LocalDateTime end;
    private String technicianSignature;
    private String picSignature;
    private String visitationPhoto;
    private List<DetailArea> detailAreas;
    private String detailActions;
    private List<DetailPest> detailPests;
    private List<PesticideUsage> pesticideUsages;

    private EntityManager em;
    /**
     * set Entity Manager used to create referenced entity
     * @return  this
     */
    public ReportFormDTO withEntityManager(EntityManager em){
        this.em = em;
        return  this;
    }
    /**
     * create new report based on form by linking each property with report and referenced entity
     * @return   new CsrReport
     */
    public CsrReport toCsrReport(){
        CsrReport report = new CsrReport();
        // set simple properties
        report.setReportType(this.reportType);
        report.setVisitationType(this.visitationType);
        report.setStart(this.start);
        report.setEnd(this.end);
        report.setTechnicianSignature(this.technicianSignature);
        report.setPicSignature(this.picSignature);
        report.setVisitationPhoto(this.visitationPhoto);

        // set detail action
//        report.setDetailAction(new CsrDetailAction());
//        report.getDetailAction().setAction(this.detailActions);
//        report.getDetailAction().setReport(report);

        // set referenced properties
        Outlet outletRef = em.getReference(Outlet.class, outletId);
        report.setOutlet(outletRef);
        Technician technicianRef = em.getReference(Technician.class, technicianId);
        report.setTechnician(technicianRef);
        Period periodRef = em.getReference(Period.class, periodId);
        report.setPeriod(periodRef);

        // set detail areas
        List<CsrDetailArea> csrDetailAreas = new ArrayList<>();
        for(DetailArea detail: this.detailAreas) {
            csrDetailAreas.add(detail
                    .toCsrDetailArea(report));
        }
        report.setDetailAreas(csrDetailAreas);

        // set detail pest
        List<CsrDetailPest> csrDetailPests = new ArrayList<>();
        for(DetailPest detail: this.detailPests){
            csrDetailPests.add(detail
                    .withEntityManager(em)
                    .toCsrDetailPest(report));
        }
        report.setDetailPests(csrDetailPests);

        // set pesticide usage
        List<CsrPesticideUsage> csrPesticideUsages = new ArrayList<>();
        for(PesticideUsage usage: this.pesticideUsages){
            csrPesticideUsages.add(usage
                    .withEntityManager(em)
                    .toCsrPesticideUsage(report));
        }
        report.setPesticideUsages(csrPesticideUsages);
        return report;
    }
}


@Setter
@Getter
class DetailArea {
    private int number;
    private String finding;
    private String answer;

     CsrDetailArea toCsrDetailArea(CsrReport report){
        CsrDetailArea detailArea = new CsrDetailArea();
//        detailArea.setNumber(this.number);
        detailArea.setFinding(this.finding);
//        detailArea.setAnswer(this.answer);
        detailArea.setReport(report);
        return detailArea;
    }
}

@Setter
@Getter
class DetailPest{
    private EntityManager em;
    private Long pestId;
    private String pestName;
    private Integer status;

    DetailPest withEntityManager(EntityManager em){
        this.em = em;
        return this;
    }
    CsrDetailPest toCsrDetailPest(CsrReport report){
        CsrDetailPest detailPest = new CsrDetailPest();
//        Pest pest = em.getReference(Pest.class, pestId);
//        detailPest.setPest(pest);
//        detailPest.setPestName(this.pestName);
        detailPest.setStatus(this.status);
        detailPest.setReport(report);
        return detailPest;
    }
}

@Setter
@Getter
class PesticideUsage{
    private Long pesticideId;
    private String amount;
    private EntityManager em;
    PesticideUsage withEntityManager(EntityManager em){
        this.em = em;
        return this;
    }
    CsrPesticideUsage toCsrPesticideUsage(CsrReport report){
        CsrPesticideUsage pesticideUsage = new CsrPesticideUsage();
        Pesticide pesticideRef = em.getReference(Pesticide.class, pesticideId);
        pesticideUsage.setPesticide(pesticideRef);
        pesticideUsage.setAmount(this.amount);
        pesticideUsage.setReport(report);
        return pesticideUsage;
    }
}