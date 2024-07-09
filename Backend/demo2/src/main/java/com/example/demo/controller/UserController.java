package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());
        if (existingUser != null) {
            return ResponseEntity.status(400).body("Username already exists");
        } else {
            userService.saveUser(user);
            return ResponseEntity.ok("User registered successfully");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
            String loginResponse = userService.loginUser(user);
        if (!loginResponse.equals("Invalid username or password")) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logOut(@RequestBody User user) {
        String logoutResponse = userService.logoutUser(user);
        if (logoutResponse.equals("Logout Successfully")) {
            return ResponseEntity.ok(logoutResponse);
        } else {
            return ResponseEntity.status(401).body(logoutResponse);
        }
    }



    @PostMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestBody User user){
        Boolean validateUser = userService.validateToken(user);
        return ResponseEntity.ok(validateUser);

    }

    @GetMapping("/user/{username}")
    public ResponseEntity<User> fetchUser(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}
