package com.pyonpyontech.scheduleservice.model.pest_control.employee;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import com.pyonpyontech.scheduleservice.model.UserModel;
import com.pyonpyontech.scheduleservice.model.customer.Outlet;
import com.pyonpyontech.scheduleservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.scheduleservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.scheduleservice.model.pest_control.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity @Table
public class Technician implements Serializable {
    private static final long serialVersionUID = 1L;
    
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

    @Column(name = "last_login", nullable = false)
    private LocalDateTime lastLogin;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    @JsonIncludeProperties("id")
    private Supervisor supervisor;

    @OneToMany(mappedBy = "technician")
    @JsonIgnore
    private List<Outlet> outlets;

    @OneToMany(mappedBy = "requester")
    @JsonIgnore
    private List<PesticideRequest> pesticideRequestHistory;

    @OneToMany(mappedBy = "technician")
    @JsonIgnore
    private List<CsrReport> reports;

    @OneToMany(mappedBy = "technician")
    @JsonIgnore
    private List<Schedule> schedules;

    @Column(name = "region", nullable = false)
    private String region;
}
