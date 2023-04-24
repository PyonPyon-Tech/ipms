package com.pyonpyontech.reportservice.restcontroller;

import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import com.pyonpyontech.reportservice.repository.pest_control.employee_db.TechnicianDb;
import com.pyonpyontech.reportservice.service.ReportRestService;
import com.pyonpyontech.reportservice.service.UserRestServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/v1/reports")
public class ReportController {
    @Autowired
    private ReportRestService reportRestService;
    @Autowired
    private UserRestServiceImpl userRestService;
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);
    @GetMapping("/{technician}/{period}")
    private Map<String, Object> getFormData(@PathVariable("technician") Long technician, @PathVariable("period") Long period, Principal principal) {
        try {
            Integer role = userRestService.getRole(principal);
            if(role == 0) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            return reportRestService.createRequestForm(technician, period);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PostMapping("")
    private Map<String, Object> createReport(@RequestBody CsrReport form, BindingResult bindingResult, Principal principal) {
        logger.info("Create Report Called");
        if (bindingResult.hasFieldErrors()) {
            logger.error("Has field Error");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        }
        try {
            Integer role = userRestService.getRole(principal);
            if(role != 4) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            CsrReport report = reportRestService.createReport(form);
            log.info("Create Report with Id: "+report.getId());
            HashMap<String, Object> responseMap = new HashMap<>();
            responseMap.put("id", report.getId());
            return responseMap;
        } catch (ResponseStatusException e) {
            logger.error("error " + e.getLocalizedMessage());
            throw new ResponseStatusException(e.getStatus(), e.getLocalizedMessage());
        }
    }
    @GetMapping(value = "/detail/{id}")
    private CsrReport detailReport(@PathVariable("id") Long id, Principal principal) {
        try {
            String username = principal.getName();
            UserModel loggedInUser = userRestService.getUserByUsername(username);
            Integer role = loggedInUser.getRole();

            CsrReport report = reportRestService.detailReport(id);
            Technician author = report.getTechnician();

            if(role == 0){
                if(report.getOutlet().getCustomer().getUser().getUsername().equals(username)){
                    return report;
                }
            }
            if(role == 1 || role == 2){
                return report;
            }
            if(role == 3){
                if(author.getSupervisor().getUser().getUsername().equals(username)){
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
                }
            }
            if(role == 4){
                if(author.getUser().getUsername().equals(principal.getName())){
                    return report;
                }
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Report with ID " + id + " not found.");
        }
    }

//    @GetMapping(value = "/technicians")
//    private List<CsrReport> retrieveAllTechniciansReports(Principal principal) {
//        UserModel user = userRestService.getUserByUsername(principal.getName());
//        Technician technician = userRestService.getTechnicianByUuid(user.getUuid());
//        return reportRestService.getReportListByTechnicianId(technician.getId());
//    }
}