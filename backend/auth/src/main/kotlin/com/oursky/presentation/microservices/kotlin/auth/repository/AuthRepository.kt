package com.oursky.presentation.microservices.kotlin.auth.repository

import org.springframework.stereotype.Repository
import org.springframework.data.repository.CrudRepository
import com.oursky.presentation.microservices.kotlin.auth.entity.Auth

@Repository
interface AuthRepository : CrudRepository <Auth, Long> {
    fun findByUsername(username: String): Auth
}