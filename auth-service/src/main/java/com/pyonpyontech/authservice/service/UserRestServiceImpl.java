package com.pyonpyontech.authservice.service;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.pyonpyontech.authservice.model.UserModel;
import com.pyonpyontech.authservice.model.customer.Customer;
import com.pyonpyontech.authservice.model.pest_control.employee.Administrator;
import com.pyonpyontech.authservice.model.pest_control.employee.Manager;
import com.pyonpyontech.authservice.model.pest_control.employee.Supervisor;
import com.pyonpyontech.authservice.model.pest_control.employee.Technician;
import com.pyonpyontech.authservice.repository.UserDb;

import com.pyonpyontech.authservice.repository.customer_db.CustomerDb;
import com.pyonpyontech.authservice.repository.pest_control.employee_db.AdministratorDb;
import com.pyonpyontech.authservice.repository.pest_control.employee_db.ManagerDb;
import com.pyonpyontech.authservice.repository.pest_control.employee_db.SupervisorDb;
import com.pyonpyontech.authservice.repository.pest_control.employee_db.TechnicianDb;
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
    private CustomerDb customerDb;

    @Autowired
    private AdministratorDb administratorDb;

    @Autowired
    private ManagerDb managerDb;

    @Autowired
    private SupervisorDb supervisorDb;

    @Autowired
    private TechnicianDb technicianDb;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
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
    public Customer getCustomerByUuid(String uuid){
        Optional<Customer> customer = customerDb.findByUser(getUserByUuid(uuid));
        if(customer.isPresent()) {
            return customer.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public Administrator getAdministratorByUuid(String uuid) {
        Optional<Administrator> administrator = administratorDb.findByUser(getUserByUuid(uuid));
        if(administrator.isPresent()) {
            return administrator.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public Manager getManagerByUuid(String uuid) {
        Optional<Manager> manager = managerDb.findByUser(getUserByUuid(uuid));
        if(manager.isPresent()) {
            return manager.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public Supervisor getSupervisorByUuid(String uuid) {
        Optional<Supervisor> supervisor = supervisorDb.findByUser(getUserByUuid(uuid));
        if(supervisor.isPresent()) {
            return supervisor.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public Technician getTechnicianByUuid(String uuid) {
        Optional<Technician> technician = technicianDb.findByUser(getUserByUuid(uuid));
        if(technician.isPresent()) {
            return technician.get();
        } else {
            throw new NoSuchElementException();
        }
    }

    @Override
    public UserModel createUser(UserModel user) {
        Optional<UserModel> sameUsernameUserOptional = userDb.findByUsername(user.getUsername());
        boolean isSameUsernameExists = sameUsernameUserOptional.isPresent();
        
        if(isSameUsernameExists)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An account with the same username already exists.");
        
        String pass = jwtUserDetailsService.encrypt(user.getPassword());
        user.setPassword(pass);
        return userDb.save(user);
    }
  
}