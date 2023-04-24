package com.pyonpyontech.reportservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class CsrDetailArea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "area_id")
    private CsrArea area;

    @Column(nullable = false)
    private String displayNumber; // Bila detail tambahan, pakai "(+)"
    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    @JsonIgnore
    private CsrReport report;

    @Column(name = "finding", nullable = false)
    private String finding;

    @Min(value = 1) // 1: tidak ada, 2: Ya, 3: Tidak
    @Max(value = 3)
    @Column(name = "status", nullable = false)
    private Integer status;

    @ElementCollection
    @CollectionTable(name = "csr_detail_area_recommendation", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "recommendation")
    private List<String> recommendation;

    @ElementCollection
    @CollectionTable(name = "csr_detail_area_image", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "image_url")
    private List<String> imageUrls;
}
