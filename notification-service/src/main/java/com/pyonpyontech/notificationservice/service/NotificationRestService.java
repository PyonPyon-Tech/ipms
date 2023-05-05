package com.pyonpyontech.notificationservice.service;

import java.util.Map;
import java.util.List;
import java.util.Optional;

import com.pyonpyontech.notificationservice.model.Notification;

import org.springframework.beans.factory.annotation.Autowired;

public interface NotificationRestService {
    List<Notification> getNotificationBetween(String username, String start, String end);

    Integer getUnreadNotification(String username);
}