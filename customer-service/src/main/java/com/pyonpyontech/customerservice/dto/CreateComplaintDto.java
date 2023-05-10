package com.pyonpyontech.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateComplaintDto {
    private Long id;
    private Long customer;
    private Long outlet;
    private String content;
    private Long report = null;
    private Long period;
}
