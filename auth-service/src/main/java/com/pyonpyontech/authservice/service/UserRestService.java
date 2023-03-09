package com.pyonpyontech.authservice.service;

import java.util.List;
import com.pyonpyontech.authservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);
    
    UserModel createUser(UserModel user);
}