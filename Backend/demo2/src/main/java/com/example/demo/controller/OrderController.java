package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.PlaceOrder;
import com.example.demo.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired OrderService orderService;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody PlaceOrder placeOrder)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.saveOrder(placeOrder));
    }

    @GetMapping("/{userName}")
    public ResponseEntity<List<Order>> getOrderByUserName(@PathVariable String userName) {
        List<Order> orders = orderService.getAllOrdersByUserName(userName);
        return ResponseEntity.ok().body(orders);
    }

}
