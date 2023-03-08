package com.pyonpyontech.authservice.model.pest_control;

import com.pyonpyontech.authservice.model.Period;
import com.pyonpyontech.authservice.model.pest_control.employee.Technician;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class PesticideRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pesticide_id", nullable = false)
    private Pesticide pesticide;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Technician requester;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @Column(name = "requested_at", nullable = false)
    private LocalDate requestedAt;

    @Column(name = "amount", nullable = false)
    private int amount;
}
