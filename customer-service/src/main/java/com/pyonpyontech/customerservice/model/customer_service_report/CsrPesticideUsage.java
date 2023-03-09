package com.pyonpyontech.customerservice.model.customer_service_report;

import com.pyonpyontech.customerservice.model.pest_control.Pesticide;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
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
