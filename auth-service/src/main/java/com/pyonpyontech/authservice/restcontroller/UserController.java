package com.pyonpyontech.authservice.restcontroller;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import com.pyonpyontech.authservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.authservice.model.pest_control.employee.Manager;
import com.pyonpyontech.authservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.authservice.model.pest_control.employee.Technician;
import com.pyonpyontech.authservice.service.UserRestService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.authservice.security.JwtTokenUtil;
import com.pyonpyontech.authservice.dto.JwtRequestModel;
import com.pyonpyontech.authservice.dto.JwtResponseModel;
import com.pyonpyontech.authservice.service.JwtUserDetailsService;

import javax.persistence.criteria.CriteriaBuilder;
import java.security.Principal;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/v1/authenticate/user")
public class UserController {
    @Autowired
    private UserRestService userRestService;

    @GetMapping
    private UserDto getUserInformation(Principal principal){
        System.out.println(principal.getName());
        UserModel user = userRestService.getUserByUsername(principal.getName());
        switch (user.getRole()){
            case 0:
                Customer customer = userRestService.getCustomerByUuid(user.getUuid());
                return new UserDto(user.getUuid(), customer.getId(),user.getUsername(), user.getName(), user.getRole(), user.getIsEmployee(), user.getIsActive());
            case 1:
                Manager manager = userRestService.getManagerByUuid(user.getUuid());
                return new UserDto(user.getUuid(), manager.getId(), user.getUsername(), user.getName(), user.getRole(), user.getIsEmployee(), user.getIsActive());
            case 2:
                Administrator administrator = userRestService.getAdministratorByUuid(user.getUuid());
                return new UserDto(user.getUuid(), administrator.getId(),user.getUsername(), user.getName(), user.getRole(), user.getIsEmployee(), user.getIsActive());
            case 3:
                Supervisor supervisor = userRestService.getSupervisorByUuid(user.getUuid());
                return new UserDto(user.getUuid(), supervisor.getId(), user.getUsername(), user.getName(), user.getRole(), user.getIsEmployee(), user.getIsActive());
            case 4:
                Technician technician = userRestService.getTechnicianByUuid(user.getUuid());
                return new UserDto(user.getUuid(), technician.getId(), user.getUsername(), user.getName(), user.getRole(), user.getIsEmployee(), user.getIsActive());
            default:
                Customer default_ = userRestService.getCustomerByUuid(user.getUuid());
                return new UserDto(user.getUuid(), default_.getId(),user.getUsername(), user.getName(), user.getRole(), user.getIsEmployee(), user.getIsActive());
        }
    }
}

@Setter
@Getter
@AllArgsConstructor
class UserDto {
    private String  uuid;
    private Long id;
    private String username;
    private String name;
    private Integer role;
    private Integer isEmployee;
    private Integer isActive;
}