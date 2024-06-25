package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    CartService cartService;

    @PostMapping
    public ResponseEntity<Cart> createCart(@Validated @RequestBody Cart cart) {
        Cart savedCart = cartService.saveCart(cart);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCart);
    }



    @GetMapping("/{id}")
    public ResponseEntity<List<Cart>> getCartById(@PathVariable Long id){
        List<Cart> carts = cartService.getAllCartsByUserId(id);
        return ResponseEntity.ok().body(carts);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteProduct(@RequestBody Cart cart){
        cartService.deleteCart(cart);
        return ResponseEntity.noContent().build();
    }
}
