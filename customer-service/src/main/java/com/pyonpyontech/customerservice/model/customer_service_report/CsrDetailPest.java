package com.pyonpyontech.customerservice.model.customer_service_report;

import com.pyonpyontech.customerservice.model.pest_control.Pest;
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
public class CsrDetailPest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private CsrReport report;

    @ManyToOne
    @JoinColumn(name = "pest_id")
    private Pest pest;

    @Column(nullable = false)
    private String pestName;

    @Column(nullable = false)
    private int status;
}
