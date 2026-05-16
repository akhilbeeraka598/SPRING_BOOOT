package com.example.backend.controller;

import com.example.backend.model.MemberImage;
import com.example.backend.repository.MemberImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminController {
    @Autowired
    MemberImageRepository memberImageRepository;

    @PostMapping("/images")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addImage(@RequestBody MemberImage image) {
        memberImageRepository.save(image);
        return ResponseEntity.ok(Map.of("message", "Image metadata saved successfully!"));
    }

    @DeleteMapping("/images/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteImage(@PathVariable Long id) {
        memberImageRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Image deleted successfully!"));
    }
}
