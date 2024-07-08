package com.example.demo.service;

import com.example.demo.dto.PlaceOrder;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.OrderRepository;
import jakarta.transaction.Transactional;
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

    @Autowired
    CartService cartService;

    @Transactional
    public String saveOrder(PlaceOrder placeOrder) {
        List<Order> data = new ArrayList<>();
        User user = userService.findByUsername(placeOrder.getUser().getUsername());


        placeOrder.getProducts().forEach(s -> {
            Product product = productService.getProductById(s.getId()).get();
            Order order = new Order();
            order.setProductId(product);
            order.setUser(user);
            Integer orderId=orderRepository.findMaxOrderNo()!=null?orderRepository.findMaxOrderNo():1;
            order.setOrderNo(orderId);
            order.setPrice(product.getPrice());
            order.setQuantity(s.getQuantity());
            order.setDeliveryStatus("Pending");

            product.setQuantity(product.getQuantity()-s.getQuantity());
            productService.saveProduct(product);
            data.add(order);
        });

        orderRepository.saveAll(data);
        cartService.deletePlacedCart(user.getUsername());

        return "Order Saved Successfully";
    }

    public List<Order> getAllOrdersByUserName(String userName) {
        User user= userService.findByUsername(userName);
        return orderRepository.findAllByUsername(user.getUsername());
    }
}
