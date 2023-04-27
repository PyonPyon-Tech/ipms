package com.pyonpyontech.notificationservice.repository.pest_control;

import com.pyonpyontech.notificationservice.model.pest_control.Pesticide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PesticideDb extends JpaRepository<Pesticide, Long> {
}
