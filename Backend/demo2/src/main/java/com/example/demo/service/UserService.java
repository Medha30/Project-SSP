package com.example.demo.service;

import com.example.demo.dto.UserInfo;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private HttpServletRequest request;

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        user.setPassword(hashPassword(user.getPassword()));
        return userRepository.save(user);
    }

    public String loginUser(User user){
        User foundUser = findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(hashPassword(user.getPassword()))) {
            String token=generateRandomString(15);
            foundUser.setLoginToken(token);
            userRepository.save(foundUser);
            return foundUser.getUsername()+""+ token;
        } else {
            return "Invalid username or password";
        }
    }

    public String logoutUser(User user){
        User foundUser = findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getLoginToken().equals(user.getLoginToken())) {
            foundUser.setLoginToken(null);
            userRepository.save(foundUser);
            return "Logout Successfully";
        } else {
            return "Invalid username or password";
        }
    }

    public Boolean validateToken(User user) {
        User foundUser = findByUsername(user.getUsername());
        if (foundUser != null && user.getLoginToken()!=null && foundUser.getLoginToken().equals(user.getLoginToken())) {
            return true;
        } else {
            return false;
        }
    }

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    public static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int index = RANDOM.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(index));
        }
        return sb.toString();
    }

    public String getUserNameFromUserInfoHeader()  {
        String userName=null;
        try {
            String userI = request.getHeader("UserInfo");
            ObjectMapper mapper= new ObjectMapper();
            UserInfo userInfo=mapper.readValue(userI,UserInfo.class);
            userName = userInfo.getUser();
//            return userName;
        }

        catch (Exception e){
            e.printStackTrace();
        }
        return userName;
    }

    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not found!", e);
        }
    }

    public static void main(String[] args) {
        System.out.println(hashPassword("ADMIN"));
    }
    
}
