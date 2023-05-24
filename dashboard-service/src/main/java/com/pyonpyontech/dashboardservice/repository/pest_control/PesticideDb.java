package com.pyonpyontech.dashboardservice.repository.pest_control;

import com.pyonpyontech.dashboardservice.model.pest_control.Pesticide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PesticideDb extends JpaRepository<Pesticide, Long> {
    List<Pesticide> findByStockLessThan(Integer stock);
}
