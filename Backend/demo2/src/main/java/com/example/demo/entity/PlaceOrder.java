//package com.example.demo.entity;
//
//public class PlaceOrder {
//}

package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "placeOrder")
@Data
public class PlaceOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;

    private Double grandTotal;

    private String phoneNumber;

    @Column(name = "payment_mode")
    private String paymentMode = "Cash on Delivery";

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

}
