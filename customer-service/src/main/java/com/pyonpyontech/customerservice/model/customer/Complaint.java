package com.pyonpyontech.customerservice.model.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.customerservice.model.Period;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.customerservice.model.customer.Outlet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Complaint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonIncludeProperties({"id", "user"})
    private Customer customer;
    
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "time", nullable = false)
    private LocalTime time;
    
    @Min(value = 0)
    @Max(value = 1)
    @Column(name = "is_acknowledged")
    private Integer isAcknowledged;

    @Column(name = "content")
    private String content;

    @OneToOne(mappedBy = "complaint", optional = true)
    @JsonIncludeProperties({"id", "outlet", "date", "technician"})
    private CsrReport report;
    
    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    @JsonIncludeProperties({"id", "name"})
    private Outlet outlet;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    @JsonIncludeProperties({"id", "month", "year"})
    private Period period;
}

