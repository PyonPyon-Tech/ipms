package com.pyonpyontech.employeeservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.employeeservice.model.Period;
import com.pyonpyontech.employeeservice.model.customer.Feedback;
import com.pyonpyontech.employeeservice.model.customer.Outlet;
import com.pyonpyontech.employeeservice.model.pest_control.Visitation;
import com.pyonpyontech.employeeservice.model.pest_control.employee.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class CsrReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private int reportType;

    @Column(nullable = false)
    private int visitationType;

    @OneToOne
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Technician technician;

    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    private Outlet outlet;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime start;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime end;

    @Column(name = "technician_signature", nullable = false)
    private String technicianSignature;

    @Column(name = "pic_signature", nullable = false)
    private String picSignature;

    @Column(name = "visitation_photo", nullable = false)
    private String visitationPhoto;

    @OneToMany(mappedBy = "report")
    private List<CsrDetailArea> detailAreas;

    @OneToMany(mappedBy = "report")
    private List<CsrDetailPest> detailPests;

    @OneToOne(mappedBy = "report")
    private CsrDetailAction detailAction;

    @OneToMany(mappedBy = "report")
    private List<CsrPesticideUsage> pesticideUsages;
}
