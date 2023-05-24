package com.pyonpyontech.reportservice.repository;

import com.pyonpyontech.reportservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
}
