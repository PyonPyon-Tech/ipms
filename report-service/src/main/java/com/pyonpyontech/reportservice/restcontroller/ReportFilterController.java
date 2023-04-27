package com.pyonpyontech.reportservice.restcontroller;

import com.pyonpyontech.reportservice.dto.ReportFilterDto;
import com.pyonpyontech.reportservice.model.UserModel;
import com.pyonpyontech.reportservice.service.ReportFilterService;
import com.pyonpyontech.reportservice.service.UserRestService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/api/v1/reports/filter")
public class ReportFilterController {
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);
    @Autowired
    private UserRestService userRestService;
    @Autowired
    private ReportFilterService reportFilterService;

    @GetMapping("")
    private ReportFilterDto getFilterItem(Principal principal) {
        UserModel user = userRestService.getUserByUsername(principal.getName());
        Integer role = user.getRole();
        try {
            ReportFilterDto result = new ReportFilterDto();
            switch (role) {
                case 0:
                    result = reportFilterService.byCustomer(user);
                    break;
                case 1:
                case 2:
                    result = reportFilterService.byManagerAndAdministrator(user);
                    break;
                case 3:
                    result = reportFilterService.bySupervisor(user);
                    break;
                case 4:
                    result = reportFilterService.byTechnician(user);
                    break;
            }
            return result;
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(e.getStatus());
        } catch (Exception e) {
            logger.error(e.getLocalizedMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getLocalizedMessage());
        }
    }
}
