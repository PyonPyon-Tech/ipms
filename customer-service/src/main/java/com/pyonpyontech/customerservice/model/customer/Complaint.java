package com.pyonpyontech.customerservice.model.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import com.pyonpyontech.customerservice.model.Period;
import com.pyonpyontech.customerservice.model.customer_service_report.CsrReport;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @Column(name = "content", nullable = false)
    private String content;

    @OneToOne(mappedBy = "complaint", optional = true)
    @JsonIncludeProperties({"id", "outlet", "date", "technician"})
    private CsrReport report;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    @JsonIncludeProperties({"id", "month", "year"})
    private Period period;
}
