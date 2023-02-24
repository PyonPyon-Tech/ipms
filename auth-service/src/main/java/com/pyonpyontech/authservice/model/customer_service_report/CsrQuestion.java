package com.pyonpyontech.authservice.model.customer_service_report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class CsrQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CsrCategory category;

    @Column(name = "number", nullable = false)
    private String number; // untuk no 1, 2, 3, atau a, b, c, thus pakai string

    @Column(name = "question", nullable = false)
    private String question;

    @Column(name = "answer_type", nullable = false)
    private int answerType; // 0: tidak ada/ya/tidak, 1: integer/angka, 2: text, 3: hama
}
