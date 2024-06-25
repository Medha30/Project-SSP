package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ProductType productType;
    private String name;
    private int quantity;
    private double price;
    private String imageUrl;
    private String productDescription;
    public enum ProductType {
        fruit, vegetable, grocery
    }

    // Getters and setters
}
