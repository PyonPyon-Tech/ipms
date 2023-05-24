package com.pyonpyontech.scheduleservice.repository;

import com.pyonpyontech.scheduleservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
}
