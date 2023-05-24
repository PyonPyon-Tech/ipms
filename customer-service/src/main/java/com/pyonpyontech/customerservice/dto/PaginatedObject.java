package com.pyonpyontech.customerservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PaginatedObject<T> {
    private Long page;
    private List<T> data;
    private Long totalPages = 0L;
    private Long count = 0L;
}
