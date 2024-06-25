package com.example.demo.repository;

import com.example.demo.entity.Wishlist;
import com.example.demo.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findAllByProductId(long productId);
    
}
