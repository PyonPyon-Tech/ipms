package com.pyonpyontech.storageservice.service;

import java.util.List;
import com.pyonpyontech.storageservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);
    
    UserModel createUser(UserModel user);
}