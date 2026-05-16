package com.example.backend.controller;

import com.example.backend.model.MemberImage;
import com.example.backend.repository.MemberImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MemberController {
    @Autowired
    MemberImageRepository memberImageRepository;

    @GetMapping("/images")
    @PreAuthorize("hasRole('ROLE_MEMBER') or hasRole('ROLE_ADMIN')")
    public List<MemberImage> getAllImages() {
        return memberImageRepository.findAll();
    }
}
