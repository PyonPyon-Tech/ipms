package com.pyonpyontech.reportservice.restcontroller;

import com.pyonpyontech.reportservice.dto.ReportFormDTO;
import com.pyonpyontech.reportservice.dto.RequestFormDTO;
import com.pyonpyontech.reportservice.dto.SummaryReport;
import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.model.customer_service_report.CsrReport;
import com.pyonpyontech.reportservice.model.pest_control.employee.Technician;
import com.pyonpyontech.reportservice.service.ReportRestService;
import com.pyonpyontech.reportservice.service.UserRestServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
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
    @GetMapping("/create")
    private RequestFormDTO getFormData(Principal principal) {
        try {
            Integer role = userRestService.getRole(principal);
            if(role == 0) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            }
            return reportRestService.createRequestForm();
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
    @PostMapping("/create")
    private Map<String, Object> createReport(@Valid @RequestBody ReportFormDTO form, BindingResult bindingResult, Principal principal) {
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
        } catch (Exception e) {
            logger.error("error " + e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        }
    }
    @GetMapping(value = "/summary")
    private List<SummaryReport> summaryReport(
            @RequestParam(value = "period") Long period,
            @RequestParam(value = "technician", required = false) Long technician,
            @RequestParam(value = "supervisor", required = false) Long supervisor,
            Principal principal
    ) {
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();
        logger.info(username);
        try {
            switch (role){
                case 0: // customer
                    break;
                case 3: // supervisor
                    if(technician != null){
                        UserModel supervisorUser = userRestService.getSupervisorByTechnicianId(technician);
                        if(supervisorUser.getUsername().equals(username)){
                            return reportRestService.summaryReportsByPeriodAndTechnician(period, technician);
                        }
                    }
                    if(supervisor != null){
                        UserModel supervisorUser = userRestService.getSupervisorById(supervisor);
                        if(supervisorUser.getUsername().equals(username)){
                            return reportRestService.summaryReportsByPeriodAndSupervisor(period, supervisor);
                        }
                    }
                    break;
                case 4: // technician
                    if(technician != null){
                        UserModel technicianUser = userRestService.getTechnicianById(technician);
                        if(technicianUser.getUsername().equals(username)){
                            return reportRestService.summaryReportsByPeriodAndTechnician(period, technician);
                        }
                    }
                    break;
                default:
                    if(technician != null){
                        return reportRestService.summaryReportsByPeriodAndTechnician(period, technician);
                    }
                    if(supervisor != null){
                        return reportRestService.summaryReportsByPeriodAndSupervisor(period, supervisor);
                    }
                    return reportRestService.summaryReportsByPeriod(period);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch(NoSuchElementException e) {
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Report not found.");
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

            if(role == 0)
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
            if(role == 4){
                if(!author.getUser().getUsername().equals(principal.getName())){
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
                }
            }
            if(role == 3){
                if(author.getSupervisor().getUser().getUsername().equals(username)){
                    throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
                }
            }

            return report;
        } catch(NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Report with ID " + id + " not found.");
        }
    }
}
