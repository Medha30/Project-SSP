package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.entity.Review;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;


    public Review saveReview(Review review){
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviewByProductId(long id){
        return reviewRepository.findAllByProductId(id);
    }

    public Optional<Review> getReviewById(long id){
        Optional<Review> optionalProduct = reviewRepository.findById(id);
        return optionalProduct;
    }

    public Review updateReview(Review review) {
         return reviewRepository.save(review);
    }

    public void deleteReview(Review review) {
        reviewRepository.delete(review);
    }


}
