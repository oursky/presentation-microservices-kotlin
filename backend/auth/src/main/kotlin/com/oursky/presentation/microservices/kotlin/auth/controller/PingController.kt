package com.oursky.presentation.microservices.kotlin.auth.controller

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.http.ResponseEntity

@RestController
public class PingController {
    @GetMapping("/auth/ping")
    fun ping(): ResponseEntity<String> {
        return ResponseEntity.ok("pong")
    }
}
