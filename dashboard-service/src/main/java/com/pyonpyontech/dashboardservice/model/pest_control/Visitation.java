package com.pyonpyontech.dashboardservice.model.pest_control;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.dashboardservice.model.Period;
import com.pyonpyontech.dashboardservice.model.customer.Outlet;
import com.pyonpyontech.dashboardservice.model.customer_service_report.CsrReport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Visitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    @JsonIncludeProperties({"id", "month", "year"})
    private Period period;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    @JsonIncludeProperties("id")
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    @JsonIncludeProperties({"id", "name", "customer"})
    private Outlet outlet;

    @Column(name = "visit_date", nullable = false)
    private LocalDate date;
}
