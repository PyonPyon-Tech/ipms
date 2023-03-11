package com.pyonpyontech.reportservice.restcontroller;

import com.pyonpyontech.reportservice.dto.SummaryReport;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.service.ReportRestService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/v1/reports/query")
public class QueryReportController {
    @Autowired
    private ReportRestService reportRestService;

    private static final Logger logger = LoggerFactory.getLogger(MutateReportController.class);

    // Retrieve by ID
    @GetMapping(value = "/detail/{id}")
    private CsrReport detailReport(@PathVariable("id") Long id, Principal principal) {
        try {
            logger.info(principal.getName());
            return reportRestService.detailReport(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Report with ID " + id + " not found.");
        }
    }
    @GetMapping(value = "/summary/{id}")
    private SummaryReport summaryReport(@PathVariable("id") Long id) {
        try {
            return reportRestService.summaryReport(id);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Report with ID " + id + " not found.");
        }
    }
}
