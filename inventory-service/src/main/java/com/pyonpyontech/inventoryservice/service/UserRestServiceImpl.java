package com.pyonpyontech.inventoryservice.service;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.pyonpyontech.inventoryservice.model.UserModel;
import com.pyonpyontech.inventoryservice.repository.UserDb;

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