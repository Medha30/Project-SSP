package com.example.demo.controller;

import com.example.demo.entity.Grocery;
import com.example.demo.repository.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/groceries")
public class GroceryController {

    @Autowired
    private GroceryRepository groceryRepository;

    @GetMapping
    public List<Grocery> getAllGroceries() {
        return groceryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Grocery> getGroceryById(@PathVariable Long id) {
        return groceryRepository.findById(id);
    }

    @PostMapping
    public Grocery createGrocery(@RequestBody Grocery grocery) {
        return groceryRepository.save(grocery);
    }

    @PutMapping("/{id}")
    public Grocery updateGrocery(@PathVariable Long id, @RequestBody Grocery groceryDetails) {
        Grocery grocery = groceryRepository.findById(id).orElseThrow();
        grocery.setName(groceryDetails.getName());
        grocery.setQuantity(groceryDetails.getQuantity());
        grocery.setPrice(groceryDetails.getPrice());
        return groceryRepository.save(grocery);
    }

    @DeleteMapping("/{id}")
    public void deleteGrocery(@PathVariable Long id) {
        groceryRepository.deleteById(id);
    }
}
