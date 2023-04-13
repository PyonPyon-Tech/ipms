package com.pyonpyontech.inventoryservice.restcontroller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Map;
import java.util.HashMap;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import com.pyonpyontech.inventoryservice.model.pest_control.Pesticide;
import com.pyonpyontech.inventoryservice.model.pest_control.PesticideRequest;

import com.pyonpyontech.inventoryservice.service.InventoryRestService;

@Slf4j
@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryRestController {
    @Autowired
    private InventoryRestService inventoryRestService;
    
    @GetMapping("/pesticides")
    private List<Pesticide> retrieveAllPesticides() {
        return inventoryRestService.getPesticideList();
    }
    
    @PostMapping("/pesticides")
    private Pesticide createPesticide(@Valid @RequestBody Pesticide pesticide, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Pesticide createdPesticide = inventoryRestService.createPesticide(pesticide);
                return createdPesticide;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    @GetMapping("/pesticides/{id}")
    private Pesticide retrievePesticide(@PathVariable("id") Long id) {
        return inventoryRestService.getPesticideById(id);
    }
    
    @PutMapping("/pesticides/{id}")
    private Pesticide updatePesticide(@PathVariable("id") Long id, @Valid @RequestBody Pesticide pesticide, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                Pesticide updatedPesticide = inventoryRestService.updatePesticide(id, pesticide);
                return updatedPesticide;
            } catch(NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch(DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
    
    @GetMapping("/pesticide-requests")
    private List<PesticideRequest> retrieveAllPesticideRequests() {
        return inventoryRestService.getPesticideRequestList();
    }
    
    @PostMapping("/pesticide-requests")
    private PesticideRequest createPesticideRequest(@Valid @RequestBody PesticideRequest pesticideRequest, BindingResult bindingResult) {
        if(bindingResult.hasFieldErrors()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
        } else {
            try {
                PesticideRequest createdPesticideRequest = inventoryRestService.createPesticideRequest(pesticideRequest);
                return createdPesticideRequest;
            } catch (NullPointerException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            } catch (DataIntegrityViolationException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Request body has invalid type or missing field.");
            }
        }
    }
}