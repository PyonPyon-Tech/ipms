package com.pyonpyontech.storageservice.repository.pest_control;

import com.pyonpyontech.storageservice.model.pest_control.Pest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PestDb extends JpaRepository<Pest, Long> {
}
