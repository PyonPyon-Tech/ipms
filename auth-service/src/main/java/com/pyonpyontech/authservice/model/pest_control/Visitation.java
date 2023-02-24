package com.pyonpyontech.authservice.model.pest_control;

import com.pyonpyontech.authservice.model.Period;
import com.pyonpyontech.authservice.model.customer.Outlet;
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
public class Visitation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @ManyToOne
    @JoinColumn(name = "outlet_id", nullable = false)
    private Outlet outlet;

    @Column(name = "date", nullable = false)
    private LocalDate date;

}
