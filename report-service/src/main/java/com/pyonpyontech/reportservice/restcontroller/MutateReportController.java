package com.pyonpyontech.reportservice.restcontroller;

import com.pyonpyontech.reportservice.dto.ReportFormDTO;
import com.pyonpyontech.reportservice.dto.RequestFormDTO;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.service.ReportRestService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/v1/reports/create")
public class MutateReportController {
    @Autowired
    private ReportRestService reportRestService;
    private static final Logger logger = LoggerFactory.getLogger(MutateReportController.class);

    @GetMapping
    private RequestFormDTO getFormData() {
        try {
            return reportRestService.createRequestForm();
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @PostMapping
    private Map<String, Object> createReport(@Valid @RequestBody ReportFormDTO form, BindingResult bindingResult) {
        logger.info("Create Report Called");
        if (bindingResult.hasFieldErrors()) {
            logger.error("Has field Error");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        }
        try {
            CsrReport report = reportRestService.createReport(form);
            log.info("Report Id:"+report.getId());
            HashMap<String, Object> responseMap = new HashMap<>();
            responseMap.put("id", report.getId());
            return responseMap;
        } catch (Exception e) {
            logger.error("error " + e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        }

    }

}
