package com.pyonpyontech.authservice.model.customer_service_report;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.authservice.model.pest_control.Pest;
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
public class CsrDetailPest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "report_id", nullable = false)
    private CsrReport report;

    @Column(nullable = false)
    private String pest;

    @Column(nullable = false)
    private Integer status;

    @ElementCollection
    @CollectionTable(name = "csr_detail_pests_reccomendation", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "reccomendation")
    private List<String> reccomendations;

    @Column(name = "image_url")
    private String imageUrl;
}
