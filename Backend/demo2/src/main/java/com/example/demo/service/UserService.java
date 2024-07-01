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
        return userRepository.save(user);
    }

    public String loginUser(User user){
        User foundUser = findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            String token=generateRandomString(15);
            foundUser.setLoginToken(token);
            saveUser(foundUser);
            return foundUser.getUsername()+""+ token;
        } else {
            return "Invalid username or password";
        }
    }

    public String logoutUser(User user){
        User foundUser = findByUsername(user.getUsername());
        if (foundUser != null && foundUser.getLoginToken().equals(user.getLoginToken())) {
            user.setLoginToken(null);
            saveUser(user);
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
//        String userI = request.getHeader("UserInfo");
//        ObjectMapper mapper= new ObjectMapper();
//        UserInfo userInfo=mapper.readValue(userI,UserInfo.class);
//        String userName = userInfo.getUser();

//        String userName = request.getHeader("UserInfo");
        return userName;
    }
    
}
