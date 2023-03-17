package com.pyonpyontech.inventoryservice.repository.pest_control;

import com.pyonpyontech.inventoryservice.model.pest_control.Pesticide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PesticideDb extends JpaRepository<Pesticide, Long> {
}
