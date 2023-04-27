package com.pyonpyontech.storageservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.storageservice.model.pest_control.Pesticide;
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
public class CsrPesticideUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private CsrReport report;

    @ManyToOne
    @JoinColumn(name = "pesticide_id", nullable = false)
    private Pesticide pesticide;

    @Column
    private String amount;
}
