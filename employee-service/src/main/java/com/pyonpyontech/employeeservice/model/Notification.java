package com.pyonpyontech.employeeservice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.Max;

import javax.persistence.*;
import java.time.Month;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_uuid", nullable = false)
    private UserModel user;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "topic", nullable = false)
    private String topic;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(name = "body", nullable = false, columnDefinition = "TEXT")
    private String body;
    
    @Min(value = 0)
    @Max(value = 1)
    @Column(name="seen", nullable = false)
    private Integer isSeen;
}
