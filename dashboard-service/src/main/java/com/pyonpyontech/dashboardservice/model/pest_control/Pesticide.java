package com.pyonpyontech.dashboardservice.model.pest_control;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.io.Serializable;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity @Table
public class Pesticide implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "active_ingredient", nullable = false)
    private String activeIngredient;

    @Column(name = "targets", nullable = false)
    private String targets;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "stock", nullable = false)
    private Integer stock;

    @OneToMany(mappedBy = "pesticide")
    @JsonIncludeProperties({"id", "requester", "requestedAt", "amount"})
    private List<PesticideRequest> requestHistory;

    @ManyToMany
    @JoinTable(joinColumns = @JoinColumn(name = "pesticide_id"), inverseJoinColumns = @JoinColumn(name = "pest_id"))
    @JsonIncludeProperties({"id", "name"})
    private List<Pest> targetPests;
}
