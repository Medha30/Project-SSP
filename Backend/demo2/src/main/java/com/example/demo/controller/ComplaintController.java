package com.example.demo.controller;

import com.example.demo.entity.Complaint;
import com.example.demo.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaint")
public class ComplaintController {

    @Autowired
    ComplaintService complaintService;

    @PostMapping
    public ResponseEntity<Complaint> createComplaint(@Validated @RequestBody Complaint complaint) {
        Complaint savedComplaint = complaintService.saveComplaint(complaint);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedComplaint);
    }

    @GetMapping("Product/{id}")
    public ResponseEntity<List<Complaint>> getAllComplaintOfProduct(@PathVariable Long id){
        List<Complaint> complaints = complaintService.getAllComplaintByProductId(id);
        return ResponseEntity.ok().body(complaints);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Complaint> getComplaintById(@PathVariable Long id){
        Optional<Complaint> complaints = complaintService.getComplaintById(id);

        return complaints.map(s->{return ResponseEntity.ok().body(s);
                }
        ).orElseGet(() -> ResponseEntity.notFound().build());
    }



    @DeleteMapping
    public ResponseEntity<Void> deleteProduct(@RequestBody Complaint complaint){
        complaintService.deleteComplaint(complaint);
        return ResponseEntity.noContent().build();
    }


    @PutMapping
    public ResponseEntity<Complaint> updateProduct( @Validated @RequestBody Complaint complaint){
        Complaint complaints = complaintService.updateComplaint(complaint);

        return ResponseEntity.ok().body(complaints);
    }
}
