package com.pyonpyontech.reportservice.restcontroller;

import com.pyonpyontech.reportservice.dto.SummaryReport;
import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.service.ReportRestService;
import com.pyonpyontech.reportservice.service.UserRestServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/v1/reports/summary/{period}")
public class ReportSummaryController {
    @Autowired
    private ReportRestService reportRestService;
    @Autowired
    private UserRestServiceImpl userRestService;
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    @GetMapping
    private List<SummaryReport> summaryReports(
            @PathVariable("period") Long period,
            Principal principal){
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();
        logger.info(username+ " visits: /reports/summary/"+period);
        try {
            switch (role){
                case 1:
                case 2:
                    return reportRestService.summaryReportsByPeriod(period);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e){
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e){
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }

    @GetMapping(value = "/technician/{technician}")
    private List<SummaryReport> summaryReportByTechnician(
            @PathVariable("period") Long period,
            @PathVariable("technician") Long technician,
            Principal principal){
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();
        logger.info(username+ " visits: /reports/summary/"+period+"/technician/"+technician);
        try {
            switch (role){
                case 1:
                case 2:
                    return reportRestService.summaryReportsByPeriodAndTechnician(period, technician);
                case 3:
                    UserModel supervisorUser = userRestService.getSupervisorByTechnicianId(technician);
                    if(supervisorUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndTechnician(period, technician);
                    }
                    break;
                case 4:
                    UserModel technicianUser = userRestService.getTechnicianById(technician);
                    if(technicianUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndTechnician(period, technician);
                    }
                    break;
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e){
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e){
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }

    @GetMapping(value = "/supervisor/{supervisor}")
    private List<SummaryReport> summaryReportBySupervisor(
            @PathVariable("period") Long period,
            @PathVariable("supervisor") Long supervisor,
            Principal principal){
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();
        logger.info(username+ " visits: /reports/summary/"+period+"/supervisor/"+supervisor);
        try {
            switch (role){
                case 1:
                case 2:
                    return reportRestService.summaryReportsByPeriodAndSupervisor(period, supervisor);
                case 3:
                    UserModel supervisorUser = userRestService.getSupervisorById(supervisor);
                    if(supervisorUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndSupervisor(period, supervisor);
                    }
                    break;
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e){
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e){
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }

    @GetMapping(value = "/outlet/{outlet}")
    private List<SummaryReport> summaryReportByOutlet(
            @PathVariable("period") Long period,
            @PathVariable("outlet") Long outlet,
            Principal principal){
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();
        logger.info(username+ " visits: /reports/summary/"+period+"/outlet/"+outlet);
        try {
            switch (role){
                case 0:
                    UserModel customerUser = userRestService.getCustomerByOutletId(outlet);
                    if(customerUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndOutlet(period,outlet);
                    }
                    break;
                case 1:
                case 2:
                    return reportRestService.summaryReportsByPeriodAndOutlet(period, outlet);
                case 3:
                    UserModel supervisorUser = userRestService.getSupervisorByOutletId(outlet);
                    if(supervisorUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndOutlet(period, outlet);
                    }
                    break;
                case 4:
                    UserModel technicianUser = userRestService.getTechnicianByOutletId(outlet);
                    if(technicianUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndOutlet(period, outlet);
                    }
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e){
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e){
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }

    @GetMapping(value = "/customer/{customer}")
    private List<SummaryReport> summaryReportByCustomer(
            @PathVariable("period") Long period,
            @PathVariable("customer") Long customer,
            Principal principal){
        Integer role = userRestService.getRole(principal);
        String username = principal.getName();
        logger.info(username);
        try {
            switch (role){
                case 0:
                    UserModel customerUser = userRestService.getCustomerById(customer);
                    if(customerUser.getUsername().equals(username)){
                        return reportRestService.summaryReportsByPeriodAndCustomer(period, customer);
                    }
                    break;
                case 1:
                case 2:
                    return reportRestService.summaryReportsByPeriodAndCustomer(period, customer);
            }
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        } catch (ResponseStatusException e){
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e){
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }
}
