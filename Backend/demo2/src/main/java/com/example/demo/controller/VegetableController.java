package com.example.demo.controller;

import com.example.demo.entity.Vegetable;
import com.example.demo.repository.VegetableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/vegetables")
public class VegetableController {

    @Autowired
    private VegetableRepository vegetableRepository;

    @GetMapping
    public List<Vegetable> getAllVegetables() {
        return vegetableRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Vegetable> getVegetableById(@PathVariable Long id) {
        return vegetableRepository.findById(id);
    }

    @PostMapping
    public Vegetable createVegetable(@RequestBody Vegetable vegetable) {
        return vegetableRepository.save(vegetable);
    }

    @PutMapping("/{id}")
    public Vegetable updateVegetable(@PathVariable Long id, @RequestBody Vegetable vegetableDetails) {
        Vegetable vegetable = vegetableRepository.findById(id).orElseThrow();
        vegetable.setName(vegetableDetails.getName());
        vegetable.setQuantity(vegetableDetails.getQuantity());
        vegetable.setPrice(vegetableDetails.getPrice());
        return vegetableRepository.save(vegetable);
    }

    @DeleteMapping("/{id}")
    public void deleteVegetable(@PathVariable Long id) {
        vegetableRepository.deleteById(id);
    }
}
