package com.pyonpyontech.reportservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.reportservice.model.customer.Feedback;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.reportservice.model.pest_control.Schedule;
import com.pyonpyontech.reportservice.model.pest_control.Visitation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Month;
import java.time.Year;
import java.util.List;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Period implements Serializable {
    private static final long serialVersionUID = 1L;
    // Ini untuk memudahkan dashboard service. Liat per periode

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "month", nullable = false)
    private Month month;

    @Column(name = "year", nullable = false)
    private Integer year;

    @OneToMany(mappedBy = "period")
    @JsonIgnore
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "period")
    @JsonIgnore
    private List<CsrReport> reports;

    @OneToMany(mappedBy = "period")
    @JsonIgnore
    private List<PesticideRequest> pesticideRequests;

    @OneToMany(mappedBy = "period")
    @JsonIgnore
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "period")
    @JsonIgnore
    private List<Visitation> visitations;
}