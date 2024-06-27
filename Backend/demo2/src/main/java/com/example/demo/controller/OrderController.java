package com.example.demo.controller;

import com.example.demo.dto.PlaceOrder;
import com.example.demo.entity.Order;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    OrderService orderService;
    @GetMapping
    public List<Order> getAllOrders()
    {
        return orderRepository.findAll();
    }

//    @GetMapping("/{userid}")
//    public Optional<Order> getOrderByUserId(@PathVariable Long Userid) {
//        return orderRepository.findByUserId(Userid);
//    }

    @PostMapping
    public String createOrder(@RequestBody PlaceOrder placeOrder)
    {
        return "";
//        return orderRepository.save(order);
    }

//    @PutMapping("/{id}")
//    public Order updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
//        Order order = orderRepository.findById(id).orElseThrow();
//        order.setOrderDate(orderDetails.getOrderDate());
//        order.setCustomer(orderDetails.getCustomer());
//        return orderRepository.save(order);
//    }


}
