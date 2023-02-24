package com.pyonpyontech.authservice.model.customer_service_report;

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
public class CsrCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "category", nullable = false)
    private String category;

    @Column(name = "type", nullable = false)
    private int type; // 0: Finding (has CSR Area), 1: Treatment, 2: Pests

    @OneToOne(mappedBy = "area")
    private CsrArea area;
}
