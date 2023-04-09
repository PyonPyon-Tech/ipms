package com.pyonpyontech.storageservice.dto;

import lombok.Getter;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.Map;
import java.util.HashMap;

@Setter
@Getter
public class FileUploadResponse {
    @JsonIgnore
    private Integer successAmount;
    private Map<String, String> status;
    
    public String getStatusMessage() {
      return "Successfully uploaded " + this.successAmount + " file(s)";
    }

    public FileUploadResponse() {
        this.successAmount = 0;
        this.status = new HashMap<>();
    }
}
