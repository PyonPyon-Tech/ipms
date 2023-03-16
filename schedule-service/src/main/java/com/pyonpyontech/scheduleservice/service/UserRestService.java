package com.pyonpyontech.scheduleservice.service;

import java.util.List;
import com.pyonpyontech.scheduleservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);
    
    UserModel createUser(UserModel user);
}