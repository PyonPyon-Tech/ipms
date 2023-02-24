package com.pyonpyontech.authservice.model.customer_service_report;

import com.pyonpyontech.authservice.model.UserModel;
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
public class CsrArea {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "area", nullable = false)
    private String area;

    @OneToOne
    @JoinColumn(name = "category_id")
    private CsrCategory category;

    @OneToMany(mappedBy = "area")
    private List<CsrReccomendation> reccomendations;
}
