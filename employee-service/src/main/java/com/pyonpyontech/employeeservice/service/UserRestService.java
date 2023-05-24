package com.pyonpyontech.employeeservice.service;

import java.util.List;
import com.pyonpyontech.employeeservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);
    UserModel getUserByUsername(String username);
    
    UserModel createUser(UserModel user);
}