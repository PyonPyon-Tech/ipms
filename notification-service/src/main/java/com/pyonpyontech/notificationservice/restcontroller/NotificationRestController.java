package com.pyonpyontech.notificationservice.restcontroller;

import java.security.Principal;
import java.util.*;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(NotificationRestController.class);


    @GetMapping
    private List<Notification> retrieveAllNotifications(@RequestParam("start") String start, @RequestParam("end") String end, Principal principal) {
        return notificationRestService.getNotificationBetween(principal.getName(), start, end);
    }

    @PostMapping("/{id}")
    private Map<String, Object> haveRead(Principal principal,@PathVariable("id") Long id){
        List<Long> notifications = new ArrayList<>();
        notifications.add(id);
        logger.info("Have read a notification with id: "+notifications.get(0));
        Map<String, Object> result = new HashMap<>();
        Integer count = notificationRestService.haveReadNotification(notifications);
        result.put("count", count);
        return result;
    }

    @PostMapping("/all")
    private Map<String, Object> haveReadAll(Principal principal){
        Map<String, Object> result = new HashMap<>();
        Integer count = notificationRestService.haveReadAllNotification(principal.getName());
        result.put("count", count);
        return result;
    }

    @GetMapping("/unread")
    private List<Notification> getUnread(Principal principal){
        return notificationRestService.getUnreadNotification(principal.getName());
    }

}