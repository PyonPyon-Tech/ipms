package com.pyonpyontech.scheduleservice.repository.pest_control;

import com.pyonpyontech.scheduleservice.model.pest_control.Pest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PestDb extends JpaRepository<Pest, Long> {
}
