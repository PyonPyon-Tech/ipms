package com.pyonpyontech.customerservice.service;

import com.pyonpyontech.customerservice.repository.NotificationDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class NotificationService {
    @Autowired
    private NotificationDb notificationDb;

    public void complaint(Long customerId){
        // ini kasih ke manajer dan administrator, dan customer (sukses bikin complaint)
    }

    public void complaintReport(Long customerId, Long reportId){
        // ini kalau mau komplain report
        // kasih ke manajer, admin, supervisor dan technician, dan customer
    }
}
