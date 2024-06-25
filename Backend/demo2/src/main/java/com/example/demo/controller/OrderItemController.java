package com.example.demo.controller;

import com.example.demo.entity.OrderItem;
import com.example.demo.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orderitem")
public class OrderItemController {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<OrderItem> getOrderItemById(@PathVariable Long id) {
        return orderItemRepository.findById(id);
    }

    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

//    @PutMapping("/{id}")
//    public OrderItem updateOrderItem(@PathVariable Long id, @RequestBody OrderItem orderItemDetails) {
//        OrderItem orderItem = orderItemRepository.findById(id).orElseThrow();
//        orderItem.setQuantity(orderItemDetails.getQuantity());
//        orderItem.setPrice(orderItemDetails.getPrice());
//        orderItem.setOrder(orderItemDetails.getOrder());
//        orderItem.setProduct(orderItemDetails.getProduct());
//        return orderItemRepository.save(orderItem);
//    }

    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Long id) {
        orderItemRepository.deleteById(id);
    }
}
