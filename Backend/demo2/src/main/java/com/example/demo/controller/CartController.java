package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.service.CartService;
import com.fasterxml.jackson.core.JsonProcessingException;
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


    @GetMapping("/{userName}")
    public ResponseEntity<List<Cart>> getCartByUserName(@PathVariable String userName) {
        List<Cart> carts = cartService.getAllCartsByUserName(userName);
        return ResponseEntity.ok().body(carts);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long productId) throws JsonProcessingException {
        cartService.deleteCart(productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{cartId}/{quantity}")
    public ResponseEntity<Void> updateProduct(@PathVariable long cartId,@PathVariable int quantity)  {
        cartService.updateCart(cartId,quantity);
        return ResponseEntity.noContent().build();
    }
}