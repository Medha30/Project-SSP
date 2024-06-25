package com.example.demo.service;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    public Customer saveCustomer(Customer customer) {
        return repository.save(customer);
    }

    public List<Customer> saveCustomers(List<Customer> customers) {
        return repository.saveAll(customers);
    }

    public List<Customer> getCustomers() {
        return repository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public String deleteCustomer(Long id) {
        repository.deleteById(id);
        return "Customer removed !! " + id;
    }

    public Customer updateCustomer(Customer customer) {
        Customer existingCustomer = repository.findById(customer.getId()).orElse(null);
        if (existingCustomer != null) {
            existingCustomer.setName(customer.getName());
            existingCustomer.setAddress(customer.getAddress());
            existingCustomer.setPhoneNumber(customer.getPhoneNumber());
            return repository.save(existingCustomer);
        }
        return null;
    }
}
