package com.example.demo.service;

import com.example.demo.entity.Grocery;
import com.example.demo.repository.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroceryService {

    private final GroceryRepository groceryRepository;

    @Autowired
    public GroceryService(GroceryRepository groceryRepository) {
        this.groceryRepository = groceryRepository;
    }

    public List<Grocery> getAllGroceries() {
        return groceryRepository.findAll();
    }

    public Optional<Grocery> getGroceryById(Long id) {
        return groceryRepository.findById(id);
    }

    public Grocery saveGrocery(Grocery grocery) {
        return groceryRepository.save(grocery);
    }

    public void deleteGroceryById(Long id) {
        groceryRepository.deleteById(id);
    }

    // Other methods as needed
}
