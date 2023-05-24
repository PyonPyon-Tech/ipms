package com.pyonpyontech.customerservice.model.pest_control.employee;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.customerservice.model.UserModel;
import com.pyonpyontech.customerservice.model.customer.Outlet;
import com.pyonpyontech.customerservice.model.pest_control.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity @Table
public class Supervisor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "birth_location", nullable = false)
    private String birthLocation;

    @Column(name = "gender", nullable = false)
    private Integer gender;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "last_login", nullable = false)
    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "supervisor")
    @JsonIgnore
    private List<Technician> subordinates;

    @OneToMany(mappedBy = "supervisor")
    @JsonIgnore
    private List<Outlet> outlets;

    @OneToMany(mappedBy = "supervisor")
    @JsonIgnore
    private List<Schedule> schedules;
}
