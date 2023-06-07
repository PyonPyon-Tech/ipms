package com.pyonpyontech.dashboardservice.dto;

import com.pyonpyontech.dashboardservice.model.Period;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CustomerComplaintChartDto {
    private Period period;
    private Long totalComplaints;
    private List<OutletComplaintDto> listOutletComplaint;
}
