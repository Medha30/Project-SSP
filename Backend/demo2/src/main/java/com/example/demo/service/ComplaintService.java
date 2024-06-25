package com.example.demo.service;

import com.example.demo.entity.Complaint;
import com.example.demo.entity.Complaint;
import com.example.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {
    @Autowired
    ComplaintRepository complaintRepository;


    public Complaint saveComplaint(Complaint complaint){
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaintByProductId(long id){
        return complaintRepository.findAllByProductId(id);
    }

    public Optional<Complaint> getComplaintById(long id){
        Optional<Complaint> optionalProduct = complaintRepository.findById(id);
        return optionalProduct;
    }

    public Complaint updateComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    public void deleteComplaint(Complaint complaint) {
        complaintRepository.delete(complaint);
    }

}
