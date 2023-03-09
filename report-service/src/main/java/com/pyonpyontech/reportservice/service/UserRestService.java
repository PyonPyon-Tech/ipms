package com.pyonpyontech.reportservice.service;

import java.util.List;
import com.pyonpyontech.reportservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);

    UserModel getUserByUsername(String username);
}