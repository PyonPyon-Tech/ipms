package com.pyonpyontech.authservice.restcontroller;

import com.pyonpyontech.authservice.model.UserModel;
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
        return new UserDto(user.getUsername(), user.getName(), user.getRole());
    }
}

@Setter
@Getter
@AllArgsConstructor
class UserDto {
    private String username;
    private String name;
    private Integer role;
}