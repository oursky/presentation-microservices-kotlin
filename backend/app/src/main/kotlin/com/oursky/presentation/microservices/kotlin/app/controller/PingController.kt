package com.oursky.presentation.microservices.kotlin.app.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.http.ResponseEntity
import org.springframework.http.HttpStatus
import com.oursky.presentation.microservices.kotlin.app.service.AuthService

@RestController
public class PingController {
    @Autowired
    lateinit var authService: AuthService

    // curl -X GET http://127.0.0.1:8080/app/ping
    @GetMapping("/app/ping")
    fun ping(): ResponseEntity<String> {
        return ResponseEntity.ok("pong")
    }

    // curl -X GET http://127.0.0.1:8080/app/ping2 -H "Authorization: Bearer ACCESS_TOKEN"
    @GetMapping("/app/ping2")
    fun ping2(
        @RequestHeader("authorization") authorization: String
    ): ResponseEntity<String> {
        @Suppress("UNUSED_VARIABLE")
        val userId = authService.verify(authorization)
            ?: return ResponseEntity(HttpStatus.UNAUTHORIZED)
        return ResponseEntity.ok("pong")
    }
}
