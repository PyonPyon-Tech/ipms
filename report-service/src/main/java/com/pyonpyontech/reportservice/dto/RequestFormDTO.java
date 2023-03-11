package com.pyonpyontech.reportservice.dto;

import com.pyonpyontech.reportservice.model.customer.Outlet;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrArea;
import com.pyonpyontech.reportservice.model.pest_control.Pest;
import com.pyonpyontech.reportservice.model.pest_control.Pesticide;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class RequestFormDTO {
    private List<Outlet> outlets;
    private List<CsrArea> areas;
    private List<Pest> pests;
    private List<Pesticide> pesticides;
}
