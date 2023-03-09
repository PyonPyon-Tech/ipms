package com.pyonpyontech.customerservice.service;

import java.util.List;
import com.pyonpyontech.customerservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);

    UserModel getUserByUsername(String username);
}