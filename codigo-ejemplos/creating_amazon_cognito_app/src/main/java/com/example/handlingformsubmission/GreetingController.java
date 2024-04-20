// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

package com.example.handlingformsubmission;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;


@Controller
@Configuration
public class GreetingController {
    private final DynamoDBEnhanced dde;
    private final PublishTextSMS msg;


    @Autowired
    GreetingController(
            DynamoDBEnhanced dde,
            PublishTextSMS msg) {
        this.dde = dde;
        this.msg = msg;
    }

    @GetMapping("/")
    public String greetingForm(Model model) {
        model.addAttribute("greeting", new Greeting());
        return "greeting";
    }

    @PostMapping("/greeting")
    public String greetingSubmit(@ModelAttribute Greeting greeting) {

        // Persist submitted data into a DynamoDB table.
        dde.injectDynamoItem(greeting);

        // Send a mobile notification.
//        msg.sendMessage(greeting.getId());

        return "result";
    }

    @GetMapping("/refresh")
    public String getRefreshToken(@RegisteredOAuth2AuthorizedClient("cognito") OAuth2AuthorizedClient authorizedClient) {

        OAuth2RefreshToken refreshToken = authorizedClient.getRefreshToken();
        System.out.println("Este es el refresh token = " + refreshToken.getTokenValue());
        System.out.println("Este es el principal name = " + authorizedClient.getPrincipalName());
        System.out.println("Este es el client registration id = " + authorizedClient.getClientRegistration());

        return "okresponse";
    }

    @GetMapping("/user")
    public String getOAuth2User(Authentication authentication) {
        Map<String, Object> attributes = ((OAuth2User) authentication.getPrincipal()).getAttributes();
        OAuth2User oauth2user = ((OAuth2User) authentication.getPrincipal());

        // Podriamos sacar también el objeto authentication del contexto sin necesidad de recibirlo
        // en el get.
        // Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("Estos son los atributos de usuario = " + attributes.toString());
        System.out.println("Este es el oauth2 user = " + oauth2user.toString());

        return "okresponse";
    }
}