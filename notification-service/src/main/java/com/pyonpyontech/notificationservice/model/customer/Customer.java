package com.pyonpyontech.notificationservice.model.customer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.notificationservice.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
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
    
    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Complaint> complaints;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Outlet> outlets;
}
