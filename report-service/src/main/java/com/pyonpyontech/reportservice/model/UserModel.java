package com.pyonpyontech.reportservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.validation.constraints.Min;
import javax.validation.constraints.Max;
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

    @Size(max = 50)
    @Column(name = "nama", nullable = false)
    private String name;

    @Min(value = 0)
    @Max(value = 4)
    @Column(name = "role", nullable = false)
    private Integer role;

    @Size(max = 50)
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    @JsonIgnore
    private String password;

    @Min(value = 0)
    @Max(value = 1)
    @Column(name = "is_employee", nullable = false)
    private Integer isEmployee;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Notification> notifications;

    @Min(value = 0)
    @Max(value = 1)
    @Column(name = "is_active", nullable = false)
    private Integer isActive;
}
