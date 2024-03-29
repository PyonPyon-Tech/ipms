package com.pyonpyontech.scheduleservice.model.pest_control;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "pesticide_id", nullable = false)
    @JsonIncludeProperties({"id", "name"})
    private Pesticide pesticide;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    @JsonIncludeProperties({"id"})
    private Technician requester;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    @JsonIncludeProperties({"id", "month", "year"})
    private Period period;

    @Column(name = "requested_at", nullable = false)
    private LocalDate requestedAt;

    @Column(name = "amount", nullable = false)
    private Integer amount;
}
