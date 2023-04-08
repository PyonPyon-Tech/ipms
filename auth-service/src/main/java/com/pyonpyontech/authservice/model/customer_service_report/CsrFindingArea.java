package com.pyonpyontech.authservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class CsrFindingArea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "area_id", nullable = false)
    private CsrArea area;

    @Column(nullable = false, name = "number") // allow alphanumeric (ex: 1, 1.a, A, etc.)
    private String displayNumber;

    @Column(name = "question", nullable = false)
    private String question;

    @ElementCollection
    @CollectionTable(name = "csr_finding_area_recommendation", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "recommendation")
    private List<String> recommendations;
}
