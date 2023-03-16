package com.pyonpyontech.scheduleservice.repository;

import com.pyonpyontech.scheduleservice.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDb extends JpaRepository<UserModel, Long> {
	Optional<UserModel> findByUuid(String uuid);

    Optional<UserModel> findByUsername(String username);
}
