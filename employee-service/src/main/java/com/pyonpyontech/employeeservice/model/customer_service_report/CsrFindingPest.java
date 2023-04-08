package com.pyonpyontech.employeeservice.model.customer_service_report;

import com.pyonpyontech.employeeservice.model.pest_control.Pest;
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
public class CsrFindingPest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pest_id", nullable = false)
    private Pest pest;

    @ElementCollection
    @CollectionTable(name = "csr_finding_pest_recommendation", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "recommendation")
    private List<String> recommendations;
}
