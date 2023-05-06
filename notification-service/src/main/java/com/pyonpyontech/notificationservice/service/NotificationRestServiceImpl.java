package com.pyonpyontech.notificationservice.service;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.notificationservice.model.UserModel;
import com.pyonpyontech.notificationservice.repository.UserDb;
import com.pyonpyontech.notificationservice.service.UserRestService;

import com.pyonpyontech.notificationservice.model.Notification;

import com.pyonpyontech.notificationservice.repository.NotificationDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class NotificationRestServiceImpl implements NotificationRestService {
    
    @Autowired
    private NotificationDb notificationDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private UserDb userDb;
    @Override
    public List<Notification> getNotificationBetween(String username, String start, String end) {
        UserModel userModel = userDb.findByUsername(username).get();
        List<Notification> notifications = notificationDb.findAllByUserAndDateBetween(userModel, LocalDate.parse(start), LocalDate.parse(end));
        return notifications;
    }
    @Override
    public List<Notification> getUnreadNotification(String username) {
        UserModel userModel = userDb.findByUsername(username).get();
        return notificationDb.findAllByUserAndIsSeen(userModel, 0);
    }

    @Override
    public Integer haveReadNotification(List<Long> notificationsId) {
        List<Notification> notifications = notificationDb.findByIdIn(notificationsId);
        for(Notification notification: notifications){
            if(notification.getIsSeen() == 0){
                notification.setIsSeen(1);
            }
        }
        return notificationDb.saveAll(notifications).size();
    }

    @Override
    public Integer haveReadAllNotification(String username) {
        UserModel userModel = userDb.findByUsername(username).get();
        List<Notification> notifications = notificationDb.findAllByUserAndIsSeen(userModel, 0);
        for(Notification notification: notifications){
            if(notification.getIsSeen() == 0){
                notification.setIsSeen(1);
            }
        }
        return notificationDb.saveAll(notifications).size();
    }
}