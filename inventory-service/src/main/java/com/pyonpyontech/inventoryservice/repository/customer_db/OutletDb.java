package com.pyonpyontech.inventoryservice.repository.customer_db;

import com.pyonpyontech.inventoryservice.model.customer.Outlet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutletDb extends JpaRepository<Outlet, Long> {
}
