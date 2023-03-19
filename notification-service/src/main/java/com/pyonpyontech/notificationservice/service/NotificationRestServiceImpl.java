package com.pyonpyontech.notificationservice.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.NoSuchElementException;

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
    
    @Override
    public List<Notification> getNotificationList() {
        return notificationDb.findAll();
    }
    
    @Override
    public Notification getNotificationById(Long id) {
        Optional<Notification> notification = notificationDb.findById(id);
        if(notification.isPresent()) {
            return notification.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public Notification createNotification(Notification notification) {
        // Reset all fields that might've been supplied by user
        notification.setId(null);
        notification.setIsSeen(0);
        
        notification.setUser(userRestService.getUserByUuid(notification.getUser().getUuid()));
        
        Notification createdNotification = notificationDb.save(notification);
        
        return createdNotification;
    }

    @Override
    public Notification updateNotification(Long id, Notification notification) {
        Notification targetNotification = getNotificationById(id);
        
        if(notification.getUser() != null && notification.getUser().getUuid() != null)
            targetNotification.setUser(userRestService.getUserByUuid(notification.getUser().getUuid()));
        
        if(notification.getTitle() != null)
            targetNotification.setTitle(notification.getTitle());
        
        if(notification.getBody() != null)
            targetNotification.setBody(notification.getBody());
        
        if(notification.getIsSeen() != null && targetNotification.getIsSeen() != 1)
            targetNotification.setIsSeen(1);
        
        Notification updatedNotification = notificationDb.save(targetNotification);
        
        return updatedNotification;
    }
    
   
}