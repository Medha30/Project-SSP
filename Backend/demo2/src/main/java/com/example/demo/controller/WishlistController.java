package com.example.demo.controller;

import com.example.demo.entity.Wishlist;
import com.example.demo.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/wishlist")
public class WishlistController {

    @Autowired
    WishlistService wishlistService;

    @PostMapping
    public ResponseEntity<Wishlist> createWishlist(@Validated @RequestBody Wishlist wishlist) {
        Wishlist savedWishlist = wishlistService.saveWishlist(wishlist);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedWishlist);
    }

    @GetMapping("Product/{id}")
    public ResponseEntity<List<Wishlist>> getAllWishlistOfProduct(@PathVariable Long id){
        List<Wishlist> wishlists = wishlistService.getAllWishlistByProductId(id);
        return ResponseEntity.ok().body(wishlists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Wishlist> getWishlistById(@PathVariable Long id){
        Optional<Wishlist> wishlists = wishlistService.getWishlistById(id);

        return wishlists.map(s->{return ResponseEntity.ok().body(s);
                }
        ).orElseGet(() -> ResponseEntity.notFound().build());
    }



    @DeleteMapping
    public ResponseEntity<Void> deleteProduct(@RequestBody Wishlist wishlist){
        wishlistService.deleteWishlist(wishlist);
        return ResponseEntity.noContent().build();
    }


    @PutMapping
    public ResponseEntity<Wishlist> updateProduct( @Validated @RequestBody Wishlist wishlist){
        Wishlist wishlists = wishlistService.updateWishlist(wishlist);

        return ResponseEntity.ok().body(wishlists);
    }
}
