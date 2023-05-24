package com.pyonpyontech.storageservice.repository.customer_db;

import com.pyonpyontech.storageservice.model.customer.Outlet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Repository
public interface OutletDb extends JpaRepository<Outlet, Long> {
    @Query(value =
        "SELECT * FROM outlet AS o " +
        "WHERE o.customer_id=:customerId AND o.id=:outletId " +
        "LIMIT 1", nativeQuery = true)
    Optional<Outlet> findByCustomerOutletId(@Param("customerId") Long customerId, @Param("outletId") Long outletId);
}
