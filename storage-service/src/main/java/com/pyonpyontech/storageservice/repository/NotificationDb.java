package com.pyonpyontech.storageservice.repository;

import com.pyonpyontech.storageservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
}
