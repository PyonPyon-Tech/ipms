package com.pyonpyontech.dashboardservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CustomerVisitationDto {
    private Long completedVisitations; 
    private Long totalVisitations;
}
