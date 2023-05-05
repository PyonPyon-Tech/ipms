package com.pyonpyontech.scheduleservice.service;

import com.pyonpyontech.scheduleservice.repository.NotificationDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class NotificationService {
    @Autowired
    private NotificationDb notificationDb;

    public void approveSchedule(Long id){
        // Ke Manajer, Admin, dan teknisi
    }

    public void rejectSchedule(Long id){
        // Ke Teknisi saja
    }

    public void reallocateVisitation(Long id){
        // Ke teknisi saja
    }
}
