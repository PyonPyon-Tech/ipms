package com.pyonpyontech.notificationservice.repository;

import com.pyonpyontech.notificationservice.model.Notification;
import com.pyonpyontech.notificationservice.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotificationDb extends JpaRepository<Notification, Long> {
    List<Notification> findAllByUserAndIsSeen(UserModel user, Integer seen);
    List<Notification> findAllByUserAndDateBetween(UserModel user, LocalDate start, LocalDate end);
}
