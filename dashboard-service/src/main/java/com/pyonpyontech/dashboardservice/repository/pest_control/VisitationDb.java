package com.pyonpyontech.dashboardservice.repository.pest_control;

import com.pyonpyontech.dashboardservice.model.pest_control.Visitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface VisitationDb extends JpaRepository<Visitation, Long> {
    List<Visitation> findAllByOutlet_Customer_User_Username(String username);
}
