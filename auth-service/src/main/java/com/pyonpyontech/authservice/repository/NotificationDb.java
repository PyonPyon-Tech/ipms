package com.pyonpyontech.authservice.repository;

import com.pyonpyontech.authservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
}
