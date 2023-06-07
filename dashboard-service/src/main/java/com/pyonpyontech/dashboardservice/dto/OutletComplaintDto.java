package com.pyonpyontech.dashboardservice.dto;

import com.pyonpyontech.dashboardservice.model.customer.Outlet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class OutletComplaintDto {
    private Outlet outlet;
    private Long totalComplaints;
}
