package com.pyonpyontech.inventoryservice.model.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.inventoryservice.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "visitation_frequency", nullable = true)
    private Integer visitationFrequency;

    @Column(name = "start_contract", nullable = false)
    private LocalDate startContract;

    @Column(name = "end_contract", nullable = false)
    private LocalDate endContract;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Complaint> complaints;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Outlet> outlets;
}
