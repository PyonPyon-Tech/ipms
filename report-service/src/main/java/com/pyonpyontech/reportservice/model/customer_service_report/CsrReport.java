package com.pyonpyontech.reportservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.reportservice.model.Period;
import com.pyonpyontech.reportservice.model.customer.Complaint;
import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.pest_control.Visitation;
import com.pyonpyontech.reportservice.model.pest_control.employee.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class CsrReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private int reportType;

    @Column(nullable = false)
    private int visitationType;

    @OneToOne
    @JoinColumn(name = "complaint_id")
    private Complaint complaint;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Technician technician;
    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    private Outlet outlet;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "pic_name", nullable = false)
    private String picName;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(name = "technician_signature", nullable = false)
    private String technicianSignature;

    @Column(name = "pic_signature", nullable = false)
    private String picSignature;

    @Column(name = "visitation_photo", nullable = false)
    private String visitationPhoto;

    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL)
    private List<CsrDetailArea> detailAreas;

    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL)
    private List<CsrDetailPest> detailPests;

    @OneToMany(mappedBy = "report",  cascade = CascadeType.ALL)
    private List<CsrPesticideUsage> pesticideUsages;
}
