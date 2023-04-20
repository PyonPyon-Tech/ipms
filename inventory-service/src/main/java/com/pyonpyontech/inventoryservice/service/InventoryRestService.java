package com.pyonpyontech.inventoryservice.service;

import java.util.Map;
import java.util.List;
import java.util.Optional;

import com.pyonpyontech.inventoryservice.model.pest_control.Pesticide;
import com.pyonpyontech.inventoryservice.model.pest_control.PesticideRequest;

import org.springframework.beans.factory.annotation.Autowired;

public interface InventoryRestService {
    List<Pesticide> getPesticideList();
    Pesticide getPesticideById(Long id);
    Pesticide createPesticide(Pesticide pesticide);
    Pesticide updatePesticide(Long id, Pesticide pesticide);
    
    List<PesticideRequest> getPesticideRequestList();
    List<PesticideRequest> createPesticideRequest(List<PesticideRequest> lstPesticideRequest);
}