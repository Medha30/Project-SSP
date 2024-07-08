package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name", "product_type"})
})
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "product_type")
    private ProductType productType;

    @Column(unique = true) // Ensures unique constraint for 'name'
    private String name;

    @Min(value = 0, message = "Quantity cannot be less than 0")
    private int quantity;

    private double price;
    private String imageUrl;
    private String productDescription;

    public enum ProductType {
        fruit, vegetable, grocery
    }

    // Getters and setters
}
