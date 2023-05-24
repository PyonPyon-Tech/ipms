package com.pyonpyontech.inventoryservice.repository;

import com.pyonpyontech.inventoryservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
}
