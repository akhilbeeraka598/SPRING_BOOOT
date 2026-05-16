package com.example.backend.dto;

import lombok.Data;
import java.util.Set;

@Data
class LoginRequest {
    private String username;
    private String password;
}

@Data
class SignupRequest {
    private String username;
    private String password;
    private Set<String> roles;
}

@Data
class JwtResponse {
    private String token;
    private String username;
    private java.util.List<String> roles;

    public JwtResponse(String token, String username, java.util.List<String> roles) {
        this.token = token;
        this.username = username;
        this.roles = roles;
    }
}

@Data
class MessageResponse {
    private String message;
    public MessageResponse(String message) {
        this.message = message;
    }
}
