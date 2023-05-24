package com.pyonpyontech.dashboardservice.repository.pest_control;

import com.pyonpyontech.dashboardservice.model.pest_control.PesticideRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PesticideRequestDb extends JpaRepository<PesticideRequest, Long> {
}
