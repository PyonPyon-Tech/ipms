package com.pyonpyontech.scheduleservice.model.pest_control;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.pyonpyontech.scheduleservice.model.Period;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.scheduleservice.model.pest_control.employee.Technician;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    @JsonIncludeProperties({"id", "month", "year"})
    private Period period;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    @JsonIncludeProperties("id")
    private Technician technician;

    @ManyToOne
    @JoinColumn(name = "supervisor_id", nullable = false)
    @JsonIncludeProperties("id")
    private Supervisor supervisor;

    @Column(name = "supervisor_comment")
    private String comment;
    
    @Min(value = 0)
    @Max(value = 1)
    @Column(name = "supervisor_approval")
    private Integer isApproved;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL)
    @JsonIncludeProperties({"id", "date", "outlet"})
    private List<Visitation> visitations;
}
