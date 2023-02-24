package com.pyonpyontech.authservice.model.pest_control;

import com.pyonpyontech.authservice.model.Period;
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
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "period_id", nullable = false)
    private Period period;

    @ManyToOne
    @JoinColumn(name = "technician_id", nullable = false)
    private Employee technician;

    @ManyToOne
    @JoinColumn(name = "supervisor_id", nullable = false)
    private Employee supervisor;

    @Column(name = "supervisor_comment")
    private String comment;

    @Column(name = "supervisor_approval")
    private int isApproved;

    @OneToMany(mappedBy = "schedule")
    private List<Visitation> visitations;
}
