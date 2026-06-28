package com.ai.ai_interview_backend.controller;

import com.ai.ai_interview_backend.entity.User;
import com.ai.ai_interview_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(
        originPatterns = {
                "https://*.vercel.app",
                "http://localhost:5173"
        },
        allowCredentials = "true"
)
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // Test API
    @GetMapping("/test")
    public String test() {
        return "Backend Updated - 2026";
    }

    // Signup API
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        userRepository.save(user);

        return "Signup Success";
    }

    // Login API
    @PostMapping("/login")
    public String login(@RequestBody User user) {

        User existingUser = userRepository.findByEmailAndPassword(
                user.getEmail(),
                user.getPassword()
        );

        if (existingUser != null) {
            return "Login Success";
        }

        return "Invalid Credentials";
    }
}