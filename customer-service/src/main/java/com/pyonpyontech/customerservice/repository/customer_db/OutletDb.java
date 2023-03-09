package com.pyonpyontech.customerservice.repository.customer_db;

import com.pyonpyontech.customerservice.model.customer.Outlet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutletDb extends JpaRepository<Outlet, Long> {
}
