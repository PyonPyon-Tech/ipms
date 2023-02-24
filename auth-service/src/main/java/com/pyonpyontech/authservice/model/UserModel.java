package com.pyonpyontech.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Setter @Getter
@AllArgsConstructor @NoArgsConstructor
@Table(name = "user")
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class UserModel implements Serializable {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String uuid;

    @NotNull
    @Size(max = 50)
    @Column(name = "nama", nullable = false)
    private String name;

    @NotNull
    @Size(max = 50)
    @Column(name = "role", nullable = false)
    private int role;

    @NotNull
    @Size(max = 50)
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @NotNull
    @Column(name = "password", nullable = false)
    private String password;

    @NotNull
    @Column(name = "is_employee", nullable = false)
    private int isEmployee;

    @OneToMany(mappedBy = "user")
    private List<Notification> notifications;
}
