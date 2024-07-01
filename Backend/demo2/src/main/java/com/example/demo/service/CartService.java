package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
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
        String userName=userService.getUserNameFromUserInfoHeader();

        User user= userService.findByUsername(userName);
        Product product=productService.getProductById(cart.getProduct().getId()).get();
        cart.setUser(user);
        cart.setProduct(product);
        return cartRepository.save(cart);
    }

    public List<Cart> getAllCartsByUserName(String userName) {
        User user= userService.findByUsername(userName);
        return cartRepository.findAllByUserId(user.getId());
    }

    public Cart updateCart(long cartID,int quantity) {
        Optional<Cart> cart = cartRepository.findById(cartID);
        cart.get().setQuantity(quantity);
        return cartRepository.save(cart.get());
    }



    public void deleteCart(long productId)  {
        String userName=userService.getUserNameFromUserInfoHeader();
        List<Cart> cart=cartRepository.findCartIdUsingUP(userName,productId);
         cartRepository.deleteAll(cart);
    }
}
