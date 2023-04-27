package com.pyonpyontech.inventoryservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.inventoryservice.model.Period;
import com.pyonpyontech.inventoryservice.model.customer.Feedback;
import com.pyonpyontech.inventoryservice.model.customer.Outlet;
import com.pyonpyontech.inventoryservice.model.pest_control.Visitation;
import com.pyonpyontech.inventoryservice.model.pest_control.employee.*;
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
    @JoinColumn(name = "feedback_id")
    @JsonIncludeProperties({"id", "content"})
    private Feedback feedback;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    @JsonIncludeProperties({"id", "month", "year"})
    private Period period;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    @JsonIncludeProperties({"id", "user"})
    private Technician technician;

    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    @JsonIncludeProperties({"id", "name"})
    private Outlet outlet;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "start_time", nullable = false)
    private LocalTime start;

    @Column(name = "end_time", nullable = false)
    private LocalTime end;

    @Column(name = "technician_signature", nullable = false)
    @JsonIgnore
    private String technicianSignature;

    @Column(name = "pic_signature", nullable = false)
    @JsonIgnore
    private String picSignature;

    @Column(name = "visitation_photo", nullable = false)
    @JsonIgnore
    private String visitationPhoto;

    @OneToMany(mappedBy = "report")
    @JsonIgnore
    private List<CsrDetailArea> detailAreas;

    @OneToMany(mappedBy = "report")
    @JsonIgnore
    private List<CsrDetailPest> detailPests;

    @OneToMany(mappedBy = "report")
    @JsonIgnore
    private List<CsrPesticideUsage> pesticideUsages;
}
