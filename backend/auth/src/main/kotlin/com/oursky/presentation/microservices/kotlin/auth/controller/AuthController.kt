package com.oursky.presentation.microservices.kotlin.auth.controller

import java.util.Date
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.http.ResponseEntity
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.JWT

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Value("\${APP_JWT_SECRET}")
    private val jwtSecret: String = ""
    private val jwtIssuer = "demo"
    private val jwtAccessLifetime = 10 * 60 // 10 minutes
    private val jwtRefreshLifetime = 8 * 60 * 60 // 8 hours
    private val jwtAlgorithm by lazy { Algorithm.HMAC256(jwtSecret) }
    private val jwtVerifier by lazy {
        JWT.require(jwtAlgorithm)
            .withIssuer(jwtIssuer)
            .build()
    }

    data class LoginRequest(
        val user: String,
        val pass: String
    )
    data class LoginResponse(
        val accessToken: String
    )
    // curl -X POST http://127.0.0.1:8080/auth/login \
    //   -H "Content-Type: application/json" \
    //   -d '{"user": "test", "pass": "1234" }'
    @PostMapping("/login")
    fun login(
        @RequestBody body: LoginRequest
    ): ResponseEntity<LoginResponse> {
        val customerId = 1234
        val now = System.currentTimeMillis()
        val accessToken = JWT.create()
            .withClaim("customer_id", customerId)
            .withClaim("scope", "access")
            .withIssuer(jwtIssuer)
            .withIssuedAt(Date(now))
            .withExpiresAt(Date(now + (jwtAccessLifetime * 1000)))
            .sign(jwtAlgorithm)
        return ResponseEntity.ok(LoginResponse(
            accessToken = accessToken
        ))
    }

    // curl -X GET http://127.0.0.1:8080/auth/logout
    @GetMapping("/logout")
    fun logout(): ResponseEntity<Void> {
        return ResponseEntity.ok().build()
    }
}
