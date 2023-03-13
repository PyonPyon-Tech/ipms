package com.pyonpyontech.reportservice.service;

import java.security.Principal;
import java.util.List;
import com.pyonpyontech.reportservice.model.UserModel;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);

    UserModel getUserByUsername(String username);

    Integer getRole(Principal principal);

    UserModel getTechnicianById(Long id);

    UserModel getSupervisorByTechnicianId(Long id);

    UserModel getSupervisorById(Long id);
}