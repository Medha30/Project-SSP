package com.example.demo.controller;

import com.example.demo.entity.Fruit;
import com.example.demo.repository.FruitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fruits")
public class FruitController {

    @Autowired
    private FruitRepository fruitRepository;

    @GetMapping
    public List<Fruit> getAllFruits() {
        return fruitRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Fruit> getFruitById(@PathVariable Long id) {
        return fruitRepository.findById(id);
    }

    @PostMapping
    public Fruit createFruit(@RequestBody Fruit fruit) {
        return fruitRepository.save(fruit);
    }

    @PutMapping("/{id}")
    public Fruit updateFruit(@PathVariable Long id, @RequestBody Fruit fruitDetails) {
        Fruit fruit = fruitRepository.findById(id).orElseThrow();
        fruit.setName(fruitDetails.getName());
        fruit.setQuantity(fruitDetails.getQuantity());
        fruit.setPrice(fruitDetails.getPrice());
        return fruitRepository.save(fruit);
    }

    @DeleteMapping("/{id}")
    public void deleteFruit(@PathVariable Long id) {
        fruitRepository.deleteById(id);
    }
}
