package com.oursky.presentation.microservices.kotlin.app.service

import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
class AuthService {
    private val log = LoggerFactory.getLogger(this.javaClass.name)
    @Value("\${APP_AUTH_ENDPOINT}")
    private val authEndpoint: String = ""

    fun verify(authorization: String): Long? {
        try {
            val response = khttp.get(
                "$authEndpoint/auth/verify",
                headers = mapOf("Authorization" to authorization)
            )
            return response.jsonObject.getLong("userId")
        } catch (e: Exception) {
            log.warn(e.message)
            return null
        }
    }
}