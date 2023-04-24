package com.pyonpyontech.scheduleservice.dto;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.Map;
import java.util.HashMap;

@Setter
@Getter
public class VisitationTransferRequest {
    private Long visitation;
    private Long technician;
    
    public VisitationTransferRequest() {
        this.visitation = visitation;
        this.technician = technician;
    }
}
