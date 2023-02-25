package com.pyonpyontech.authservice.model.customer;

import com.pyonpyontech.authservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.authservice.model.pest_control.Employee.Supervisor;
import com.pyonpyontech.authservice.model.pest_control.Employee.Technician;
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
public class Outlet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(name = "region", nullable = false)
    private String region;

    @Column(name = "address", nullable = false)
    private String address;

    @ManyToOne
    @JoinColumn(name="supervisor_id", nullable=false)
    private Supervisor supervisor;

    @ManyToOne
    @JoinColumn(name="technician_id")
    private Technician technician;

    @OneToMany(mappedBy = "outlet")
    private List<CsrReport> reports;
}
