package com.pyonpyontech.notificationservice.restcontroller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.notificationservice.model.Notification;

import com.pyonpyontech.notificationservice.service.NotificationRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationRestController {
    @Autowired
    private NotificationRestService notificationRestService;
    
    @GetMapping
    private List<Notification> retrieveAllNotifications() {
        return notificationRestService.getNotificationList();
    }
    
    @PostMapping
    private Notification createNotification(@Valid @RequestBody Notification notification, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Notification createdNotification = notificationRestService.createNotification(notification);
                return createdNotification;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    @GetMapping("/{id}")
    private Notification retrieveNotification(@PathVariable("id") Long id) {
        return notificationRestService.getNotificationById(id);
    }
    
    @PutMapping("/{id}")
    private Notification updateNotification(@PathVariable("id") Long id, @Valid @RequestBody Notification notification, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Notification updatedNotification = notificationRestService.updateNotification(id, notification);
                return updatedNotification;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
}