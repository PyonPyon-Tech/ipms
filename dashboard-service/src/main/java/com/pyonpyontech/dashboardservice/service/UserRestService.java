package com.pyonpyontech.dashboardservice.service;

import java.util.List;
import com.pyonpyontech.dashboardservice.model.UserModel;

import java.security.Principal;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);
    
    UserModel createUser(UserModel user);
    
    Integer getRole(Principal principal);
}