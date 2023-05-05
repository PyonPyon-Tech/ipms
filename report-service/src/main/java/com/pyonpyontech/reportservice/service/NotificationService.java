package com.pyonpyontech.reportservice.service;

import com.pyonpyontech.reportservice.repository.NotificationDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class NotificationService {
    @Autowired
    private NotificationDb notificationDb;

    public void reportCreated(Long reportId){
        // Kasih ke customer dan supervisor
    }
}
