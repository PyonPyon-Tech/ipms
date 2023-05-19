package com.pyonpyontech.dashboardservice.repository;

import com.pyonpyontech.dashboardservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
}
