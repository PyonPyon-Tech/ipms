package com.pyonpyontech.inventoryservice.service;

import java.util.List;
import com.pyonpyontech.inventoryservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);
    
    UserModel createUser(UserModel user);
}