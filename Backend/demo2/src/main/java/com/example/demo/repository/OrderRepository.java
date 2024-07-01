
package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Order;


public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select max(o.orderNo) FROM Order o")
    Integer findMaxOrderNo();

}
