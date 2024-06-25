package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    @Autowired UserService userService;

    @Autowired ProductService productService;

    public Cart saveCart(Cart cart) {
        User user= userService.findByUsername(cart.getUser().getUsername());
        Product product=productService.getProductById(cart.getProduct().getId()).get();
        cart.setUser(user);
        cart.setProduct(product);
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCartsByUserId(long userId) {
        return cartRepository.findAllByUserId(userId);
    }

    public Optional<Cart> getCartByUserId(long userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart updateCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCart(Cart cart) {
        cartRepository.delete(cart);
    }
}
