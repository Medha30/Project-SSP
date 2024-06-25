//package com.example.demo.controller;
//
//import com.example.demo.entity.Product;
//import com.example.demo.repository.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/product")
//public class ProductController {
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @GetMapping
//    public List<Product> getAllProducts() {
//        return productRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public Optional<Product> getProductById(@PathVariable Long id) {
//        return productRepository.findById(id);
//    }
//
//    @PostMapping
//    public Product createProduct(@RequestBody Product product) {
//        return productRepository.save(product);
//    }
//
//    @PutMapping("/{id}")
//    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
//        Product product = productRepository.findById(id).orElseThrow();
//        product.setProductType(productDetails.getProductType());
//        return productRepository.save(product);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteProduct(@PathVariable Long id) {
//        productRepository.deleteById(id);
//    }
//}

//
//package com.example.demo.controller;
//
//import com.example.demo.entity.Product;
//import com.example.demo.repository.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/products")
//public class ProductController {
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    @GetMapping
//    public List<Product> getAllProducts() {
//        return productRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public Optional<Product> getProductById(@PathVariable Long id) {
//        return productRepository.findById(id);
//    }
//
//    @PostMapping
//    public Product createProduct(@RequestBody Product product) {
//        product.setProductType(Product.ProductType.valueOf(product.getProductType().name().toUpperCase()));
//        return productRepository.save(product);
//    }
//
//    @PutMapping("/{id}")
//    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
//        Product product = productRepository.findById(id).orElseThrow();
//        product.setProductType(Product.ProductType.valueOf(productDetails.getProductType().name().toUpperCase()));
//        product.setName(productDetails.getName());
//        return productRepository.save(product);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteProduct(@PathVariable Long id) {
//        productRepository.deleteById(id);
//    }
//}


package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/all/{productType}/{size}")
    public ResponseEntity<List<Product>> getAllProductList(@PathVariable("productType") String productType,@PathVariable int size) {

        return ResponseEntity.ok(productService.getSliceAllData(productType,size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.map(product -> ResponseEntity.ok().body(product))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Validated @RequestBody Product product) {
        product.setImageUrl("https://via.placeholder.com/150?text="+product.getName());
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Validated @RequestBody Product productDetails) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        return optionalProduct.map(product -> {
            product.setProductType(Product.ProductType.valueOf(productDetails.getProductType().name().toUpperCase()));
            product.setName(productDetails.getName());
            Product updatedProduct = productRepository.save(product);
            return ResponseEntity.ok().body(updatedProduct);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
