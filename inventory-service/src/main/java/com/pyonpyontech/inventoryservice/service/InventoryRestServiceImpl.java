package com.pyonpyontech.inventoryservice.service;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;
import java.util.NoSuchElementException;

import com.pyonpyontech.inventoryservice.service.UserRestService;

import com.pyonpyontech.inventoryservice.model.Period;
import com.pyonpyontech.inventoryservice.model.UserModel;
import com.pyonpyontech.inventoryservice.model.pest_control.Pest;
import com.pyonpyontech.inventoryservice.model.pest_control.Pesticide;
import com.pyonpyontech.inventoryservice.model.pest_control.PesticideRequest;
import com.pyonpyontech.inventoryservice.model.pest_control.employee.Technician;

import com.pyonpyontech.inventoryservice.repository.PeriodDb;
import com.pyonpyontech.inventoryservice.repository.pest_control.PestDb;
import com.pyonpyontech.inventoryservice.repository.pest_control.PesticideDb;
import com.pyonpyontech.inventoryservice.repository.pest_control.PesticideRequestDb;
import com.pyonpyontech.inventoryservice.repository.pest_control.employee_db.TechnicianDb;

import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.time.LocalDate;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class InventoryRestServiceImpl implements InventoryRestService {
    
    @Autowired
    private PesticideDb pesticideDb;
    
    @Autowired
    private PesticideRequestDb pesticideRequestDb;
    
    @Autowired
    private PestDb pestDb;
    
    @Autowired
    private PeriodDb periodDb;
    
    @Autowired
    private TechnicianDb technicianDb;
    
    @Autowired
    private UserRestService userRestService;
    
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    
    @Override
    public List<Pesticide> getPesticideList() {
        return pesticideDb.findAll();
    }
    
    @Override
    public Pesticide getPesticideById(Long id) {
        Optional<Pesticide> pesticide = pesticideDb.findById(id);
        if(pesticide.isPresent()) {
            return pesticide.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    @Override
    public Pesticide createPesticide(Pesticide pesticide) {
        // Reset all fields that might've been supplied by user
        pesticide.setId(null);
        
        List<Pest> realTargetPests = new ArrayList<>();
        
        for(Pest pest : pesticide.getTargetPests()) {
            realTargetPests.add(getPestById(pest.getId()));
        }
        
        pesticide.setTargetPests(realTargetPests);
        
        Pesticide createdPesticide = pesticideDb.save(pesticide);
        
        return createdPesticide;
    }

    @Override
    public Pesticide updatePesticide(Long id, Pesticide pesticide) {
        Pesticide targetPesticide = getPesticideById(id);
        
        if(pesticide.getName() != null)
            targetPesticide.setName(pesticide.getName());
        
        if(pesticide.getActiveIngredient() != null)
            targetPesticide.setActiveIngredient(pesticide.getActiveIngredient());
        
        if(pesticide.getTargets() != null)
            targetPesticide.setTargets(pesticide.getTargets());
        
        if(pesticide.getUnit() != null)
            targetPesticide.setUnit(pesticide.getUnit());
        
        if(pesticide.getStock() != null)
            targetPesticide.setStock(pesticide.getStock());
        
        if(pesticide.getTargetPests() != null) {
            List<Pest> realTargetPests = new ArrayList<>();
            
            for(Pest pest : pesticide.getTargetPests()) {
                realTargetPests.add(getPestById(pest.getId()));
            }
            
            targetPesticide.setTargetPests(realTargetPests);
        }
        
        Pesticide updatedPesticide = pesticideDb.save(targetPesticide);
        
        return updatedPesticide;
    }
    
    @Override
    public List<PesticideRequest> getPesticideRequestList() {
        return pesticideRequestDb.findAll();
    }
    
    @Override
    public PesticideRequest createPesticideRequest(PesticideRequest pesticideRequest) {
        // Reset all fields that might've been supplied by user
        pesticideRequest.setId(null);
        
        LocalDate currentDate = LocalDate.now();
        pesticideRequest.setRequestedAt(currentDate);
        pesticideRequest.setPeriod(getPeriodByMonthAndYear(currentDate.getMonthValue() - 1, currentDate.getYear()));
        
        Pesticide requestedPesticide = getPesticideById(pesticideRequest.getPesticide().getId());
        
        if(requestedPesticide.getStock() < pesticideRequest.getAmount())
            throw new IllegalStateException("There is not enough stock of the requested pesticide.");
        
        requestedPesticide.setStock(requestedPesticide.getStock() - pesticideRequest.getAmount());
        
        Pesticide savedRequestedPesticide = pesticideDb.save(requestedPesticide);
        
        pesticideRequest.setPesticide(savedRequestedPesticide);
        pesticideRequest.setRequester(getTechnicianById(pesticideRequest.getRequester().getId()));
        
        PesticideRequest createdPesticideRequest = pesticideRequestDb.save(pesticideRequest);
        
        return createdPesticideRequest;
    }
    
    private Pest getPestById(Long id) {
        Optional<Pest> pest = pestDb.findById(id);
        if(pest.isPresent()) {
            return pest.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Technician getTechnicianById(Long id) {
        Optional<Technician> technician = technicianDb.findById(id);
        if(technician.isPresent()) {
            return technician.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Period getPeriodById(Long id) {
        Optional<Period> period = periodDb.findById(id);
        if(period.isPresent()) {
            return period.get();
        } else {
            throw new NoSuchElementException();
        }
    }
    
    private Period getPeriodByMonthAndYear(Integer month, Integer year) {
        Optional<Period> period = periodDb.findByMonthAndYear(month, year);
        if(period.isPresent()) {
            return period.get();
        } else {
            throw new NoSuchElementException();
        }
    }
}