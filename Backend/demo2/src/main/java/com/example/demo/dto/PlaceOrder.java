package com.example.demo.dto;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import lombok.Data;

import java.util.List;
@Data
public class PlaceOrder {
    User user;
    List<Product> products;
}
