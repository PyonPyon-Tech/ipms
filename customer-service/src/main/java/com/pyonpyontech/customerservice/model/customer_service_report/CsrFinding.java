package com.pyonpyontech.customerservice.model.customer_service_report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class CsrFinding {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private CsrArea area;

    @Column(nullable = false)
    private int number;

    @Column(name = "question", nullable = false)
    private String question;

    @OneToMany(mappedBy = "finding")
    private List<CsrRecommendation> reccomendations;
}