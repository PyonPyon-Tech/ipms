package com.pyonpyontech.authservice.model;

import com.pyonpyontech.authservice.model.customer.Feedback;
import com.pyonpyontech.authservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.authservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.authservice.model.pest_control.Schedule;
import com.pyonpyontech.authservice.model.pest_control.Visitation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Month;
import java.time.Year;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Period {
    // Ini untuk memudahkan dashboard service. Liat per periode

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "month", nullable = false)
    private Month month;

    @Column(name = "year", nullable = false)
    private Year year;

    @OneToMany(mappedBy = "period")
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "period")
    private List<CsrReport> reports;

    @OneToMany(mappedBy = "period")
    private List<PesticideRequest> pesticideRequests;

    @OneToMany(mappedBy = "period")
    private List<Schedule> schedules;

    @OneToMany(mappedBy = "period")
    private List<Visitation> visitations;
}