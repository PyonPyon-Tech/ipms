package com.pyonpyontech.reportservice.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import com.pyonpyontech.reportservice.repository.UserDb;

import com.pyonpyontech.reportservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.reportservice.repository.pest_control.employee_db.TechnicianDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
public class UserRestServiceImpl implements UserRestService {
    @Autowired
    private UserDb userDb;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private TechnicianDb technicianDb;
    @Autowired
    private SupervisorDb supervisorDb;
    @Override
    public UserModel getUserByUuid(String uuid) {
        Optional<UserModel> user = userDb.findByUuid(uuid);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public UserModel getUserByUsername(String username) {
        Optional<UserModel> user = userDb.findByUsername(username);
        if(user.isPresent()) {
            return user.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public Integer getRole(Principal principal) {
        String username = principal.getName();
        UserModel user = getUserByUsername(username);
        return user.getRole();
    }

    @Override
    public UserModel getTechnicianById(Long id) {
        Optional<Technician> technician = technicianDb.findById(id);
        if(technician.isEmpty()) {
            throw new NoSuchElementException();
        }
        return technician.get().getUser();
    }

    @Override
    public UserModel getSupervisorByTechnicianId(Long id) {
        Optional<Technician> technician = technicianDb.findById(id);
        if(technician.isEmpty()) {
            throw new NoSuchElementException();
        }
        return technician.get().getSupervisor().getUser();
    }

    @Override
    public UserModel getSupervisorById(Long id) {
        Optional<Supervisor> supervisor = supervisorDb.findById(id);
        if(supervisor.isEmpty()) {
            throw new NoSuchElementException();
        }
        return supervisor.get().getUser();
    }

}