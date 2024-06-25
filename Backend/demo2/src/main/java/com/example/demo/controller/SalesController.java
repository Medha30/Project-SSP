package com.example.demo.controller;

import com.example.demo.entity.Sale;
import com.example.demo.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3004/")
@RequestMapping("/api")
public class SalesController {

    @Autowired
    private SaleRepository saleRepository;

    @GetMapping("/sales")
    public List<Sale> getSales() {
        return saleRepository.findAll();
    }
}
