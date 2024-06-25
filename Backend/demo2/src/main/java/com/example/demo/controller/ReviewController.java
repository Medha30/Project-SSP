package com.example.demo.controller;

import com.example.demo.entity.Review;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;



    @PostMapping
    public  ResponseEntity<Review> createReview(@Validated @RequestBody Review review) {
        Review savedReview = reviewService.saveReview(review);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReview);
    }

    @GetMapping("Product/{id}")
    public ResponseEntity<List<Review>> getAllReviewOfProduct(@PathVariable Long id){
             List<Review> reviews = reviewService.getAllReviewByProductId(id);
            return ResponseEntity.ok().body(reviews);
        }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id){
        Optional<Review> reviews = reviewService.getReviewById(id);

        return reviews.map(s->{return ResponseEntity.ok().body(s);
                }
        ).orElseGet(() -> ResponseEntity.notFound().build());
     }



    @DeleteMapping
    public ResponseEntity<Void> deleteProduct(@RequestBody Review review){
        reviewService.deleteReview(review);
        return ResponseEntity.noContent().build();
    }


        @PutMapping
    public ResponseEntity<Review> updateProduct( @Validated @RequestBody Review review){
            Review reviews = reviewService.updateReview(review);

              return ResponseEntity.ok().body(reviews);
      }

}




