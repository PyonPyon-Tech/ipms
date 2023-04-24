package com.pyonpyontech.reportservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class ReportFilterDto {
    private List<LabelValue> customer = new ArrayList<>();
    private List<LabelValue> outlet = new ArrayList<>();
    private List<LabelValue> supervisor  = new ArrayList<>();
    private List<LabelValue> technician = new ArrayList<>();
}

