package com.pyonpyontech.notificationservice.service;

import java.util.Map;
import java.util.List;
import java.util.Optional;

import com.pyonpyontech.notificationservice.model.Notification;

import org.springframework.beans.factory.annotation.Autowired;

public interface NotificationRestService {
    List<Notification> getNotificationList();
    Notification getNotificationById(Long id);
    Notification createNotification(Notification notification);
    Notification updateNotification(Long id, Notification notification);
}