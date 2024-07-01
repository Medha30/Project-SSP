package com.example.demo.repository;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
//    List<Cart> findAllByProductId(long productId);
      Optional<Cart> findByUserId(Long userId);
      List<Cart> findAllByUserId(Long userId);

      @Query(value="select c from Cart c where c.user.username=:userName and c.product.id=:productId")
      List<Cart> findCartIdUsingUP(@Param("userName") String userName,@Param("productId") long productId);
}
