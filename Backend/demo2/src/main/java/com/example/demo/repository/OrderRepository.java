
package com.example.demo.repository;

import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Order;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("select max(o.orderNo) FROM Order o")
    Integer findMaxOrderNo();

    @Query("SELECT new com.example.demo.entity.Order(o.id, o.orderDate, o.deliveryDate, o.price, o.deliveryStatus, o.productId, o.orderNo, o.quantity) " +
            "FROM Order o WHERE o.user.username = :username")
    List<Order> findAllByUsername(@Param("username") String username);
}
