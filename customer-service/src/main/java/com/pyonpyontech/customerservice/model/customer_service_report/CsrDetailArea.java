package com.pyonpyontech.customerservice.model.customer_service_report;

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
public class CsrDetailArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private int number;
    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private CsrReport report;

    @Column(name = "finding", nullable = false)
    private String finding;

    @Column(name = "answer", nullable = false)
    private String answer;

}