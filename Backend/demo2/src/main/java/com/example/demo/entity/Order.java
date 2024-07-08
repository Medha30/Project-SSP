//package com.example.demo.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import java.util.Date;
//import java.util.List;
//
//
//@Entity
//@Table(name = "orders")
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//public class Order {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Temporal(TemporalType.DATE)
//    private Date orderDate=new Date();
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "product_id", referencedColumnName = "id")
//    private Product productId;
//
//    private Integer orderNo;
//
//}
//


package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date orderDate = new Date();

    @Temporal(TemporalType.DATE)
    private Date deliveryDate;

    private Double price;

    private String deliveryStatus;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product productId;

    private Integer orderNo;

    private Integer quantity;

    public Order(Long id, Date orderDate, Date deliveryDate, Double price, String deliveryStatus, Product productId, Integer orderNo, Integer quantity) {
        this.id = id;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
        this.price = price;
        this.deliveryStatus = deliveryStatus;
        this.productId = productId;
        this.orderNo = orderNo;
        this.quantity = quantity;
    }

    // Constructors, getters, setters...
}
