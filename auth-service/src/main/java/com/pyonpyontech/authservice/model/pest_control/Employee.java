package com.pyonpyontech.authservice.model.pest_control;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Outlet;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Entity @Table
public class Employee {
    // TODO: KL UDH FIX, UBAH FETCH TYPE JADI LAZY AGAR PERFORMANYA TIDAK JELEK
    // TODO: KL UDH FIX, UBAH FETCH TYPE JADI LAZY AGAR PERFORMANYA TIDAK JELEK
    // TODO: KL UDH FIX, UBAH FETCH TYPE JADI LAZY AGAR PERFORMANYA TIDAK JELEK
    // TODO: KL UDH FIX, UBAH FETCH TYPE JADI LAZY AGAR PERFORMANYA TIDAK JELEK
    // TODO: KL UDH FIX, UBAH FETCH TYPE JADI LAZY AGAR PERFORMANYA TIDAK JELEK
    // TODO: KL UDH FIX, UBAH FETCH TYPE JADI LAZY AGAR PERFORMANYA TIDAK JELEK

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "birth_location", nullable = false)
    private String birthLocation;

    @Column(name = "gender", nullable = false)
    private int gender;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "last_login", nullable = false)
    private LocalDateTime lastLogin;

    @Column(name = "is_active", nullable = false)
    private int isActive;

    @OneToMany(mappedBy = "requester")
    private List<PesticideRequest> pesticideRequestHistory;

    @OneToMany(mappedBy = "supervisor")
    private List<Outlet> outletsAsSupervisor;

    @OneToMany(mappedBy = "technician")
    private List<Outlet> outletsAsTechnician;

    @OneToMany(mappedBy = "supervisorAsTechnician")
    private List<Employee> subordinatesAsSupervisor;

    @OneToMany(mappedBy = "technician")
    private List<Schedule> schedulesAsTechnician;

    @OneToMany(mappedBy = "supervisor")
    private List<Schedule> schedulesAsSupervisor;

    @ManyToOne
    @JoinColumn(name = "supervisor_id")
    private Employee supervisorAsTechnician;
}
