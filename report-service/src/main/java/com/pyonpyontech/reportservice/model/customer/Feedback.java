package com.pyonpyontech.reportservice.model.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.reportservice.model.Period;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
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
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;


    @Column(name = "content")
    private String content;

    @OneToOne(mappedBy = "feedback")
    private CsrReport report;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;
}