package com.pyonpyontech.authservice.model.customer_service_report;

import com.pyonpyontech.authservice.model.Period;
import com.pyonpyontech.authservice.model.customer.Feedback;
import com.pyonpyontech.authservice.model.customer.Outlet;
import com.pyonpyontech.authservice.model.pest_control.Employee;
import com.pyonpyontech.authservice.model.pest_control.Visitation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class CsrReport {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "feedback_id")
    private Feedback feedback;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @OneToOne(mappedBy = "report")
    private Visitation visitation;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Employee technician;

    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    private Outlet outlet;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime start;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime end;

    @Column(name = "technician_signature", nullable = false)
    private String technicianSignature;

    @Column(name = "pic_signature", nullable = false)
    private String picSignature;

    @Column(name = "visitation_photo", nullable = false)
    private String visitationPhoto;

    @OneToMany(mappedBy = "report")
    private List<CsrDetail> details;

    @OneToMany(mappedBy = "report")
    private List<CsrPesticideUsage> pesticideUsages;
}
