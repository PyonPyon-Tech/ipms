package com.pyonpyontech.authservice.model.pest_control;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity @Table
public class Pesticide {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "active_ingredient", nullable = false)
    private String activeIngredient;
//
    @Column(name = "dosage", nullable = false)
    private String dosage;

    @Column(name = "application", nullable = false)
    private String application;

    @Column(name = "unit", nullable = false)
    private int unit;

    @OneToMany(mappedBy = "pesticide")
    private List<PesticideRequest> requestHistory;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "pesticide_id"), inverseJoinColumns = @JoinColumn(name = "pest_id"))
    private List<Pest> targetPests;
}
