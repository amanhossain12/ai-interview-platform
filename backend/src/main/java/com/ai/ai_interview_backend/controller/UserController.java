package com.ai.ai_interview_backend.controller;

import com.ai.ai_interview_backend.entity.User;
import com.ai.ai_interview_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Signup API
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        userRepository.save(user);

        return "Signup Success";
    }

    // Login API
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser =
                userRepository.findByEmailAndPassword(
                        user.getEmail(),
                        user.getPassword()
                );

        if (existingUser != null) {
            return "Login Success";
        }

        return "Invalid Credentials";
    }
}