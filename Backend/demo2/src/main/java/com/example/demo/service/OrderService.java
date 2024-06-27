package com.example.demo.service;

import com.example.demo.dto.PlaceOrder;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired UserService userService;

    @Autowired
    ProductService productService;

    
    public String saveOrder(PlaceOrder placeOrder) {
        List<Order> data = new ArrayList<>();
        User user = userService.findByUsername(placeOrder.getUser().getUsername());


        placeOrder.getProducts().forEach(s -> {
            Product product = productService.getProductById(s.getId()).get();
            Order order = new Order();
            order.setProductId(product);
            order.setUser(user);
            order.setOrderNo(orderRepository.findMaxOrderNo());
            data.add(order);
        });
        orderRepository.saveAll(data);

        return "Order Saved Successfully";
    }
}
