package com.example.cognito;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api")
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class CognitoController {


    @GetMapping("/readPhoto")
    @PreAuthorize("hasAuthority('SCOPE_https://myphotosapi.example.com/photo.read')")
    public String readingPhoto() {
        return "This is your Photo !!";
    }

    @PostMapping("/writePhoto")
    @PreAuthorize("hasAuthority('SCOPE_https://myphotosapi.example.com/photo.write')")
    public String writingPhoto() {
        return "Your Photo was inserted in the Data Base !!";
    }

    @GetMapping("/checkAuthorization")
    public String getCheck() {
        return "This is your Photo API !!";
    }
}
