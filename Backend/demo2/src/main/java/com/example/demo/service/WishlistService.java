package com.example.demo.service;

import com.example.demo.entity.Wishlist;
import com.example.demo.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    @Autowired
    WishlistRepository wishlistRepository;


    public Wishlist saveWishlist(Wishlist wishlist){
        return wishlistRepository.save(wishlist);
    }

    public List<Wishlist> getAllWishlistByProductId(long id){
        return wishlistRepository.findAllByProductId(id);
    }

    public Optional<Wishlist> getWishlistById(long id){
        Optional<Wishlist> optionalProduct = wishlistRepository.findById(id);
        return optionalProduct;
    }

    public Wishlist updateWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public void deleteWishlist(Wishlist wishlist) {
        wishlistRepository.delete(wishlist);
    }


}
