package com.pyonpyontech.reportservice.service;

import java.security.Principal;
import java.util.List;
import com.pyonpyontech.reportservice.model.UserModel;
import org.springframework.security.core.userdetails.User;

public interface UserRestService {
    UserModel getUserByUuid(String uuid);

    UserModel getUserByUsername(String username);

    Integer getRole(Principal principal);

    UserModel getTechnicianById(Long id);

    UserModel getTechnicianByOutletId(Long id);

    UserModel getSupervisorByTechnicianId(Long id);

    UserModel getSupervisorById(Long id);

    UserModel getSupervisorByOutletId(Long id);

    UserModel getCustomerByOutletId(Long id);

    UserModel getCustomerById(Long id);

}