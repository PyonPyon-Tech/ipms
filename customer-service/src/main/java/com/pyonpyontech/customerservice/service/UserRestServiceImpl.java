package com.pyonpyontech.customerservice.service;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;

import com.pyonpyontech.customerservice.model.UserModel;
import com.pyonpyontech.customerservice.repository.UserDb;

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
  
}