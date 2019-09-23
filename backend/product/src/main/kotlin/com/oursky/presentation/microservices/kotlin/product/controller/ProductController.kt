package com.oursky.presentation.microservices.kotlin.product.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import com.oursky.presentation.microservices.kotlin.product.service.ProductService
import com.oursky.presentation.microservices.kotlin.product.entity.Product
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import org.springframework.web.multipart.MultipartHttpServletRequest

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    lateinit var productService: ProductService

    data class AddProductResponse(
        val productId: Long
    )

    data class AddImageResponse(
        val data: String
    )

    data class AllProductResponse(
        val products: MutableIterable<Product>
    )

    data class DeleteProductResponse(
        val success: Boolean
    )

    @CrossOrigin(origins = ["http://localhost:3000"])
    @PostMapping("/")
    fun add(
        request: MultipartHttpServletRequest,
        @RequestParam("files") image: MultipartFile,
        @RequestParam("name") name: String,
        @RequestParam("description") description: String,
        @RequestParam("price") price: Float
    ): ResponseEntity<AddProductResponse> {
        val productId = productService.addNewProduct(name, description, price, image)
                ?: return ResponseEntity(HttpStatus.BAD_REQUEST)
        return ResponseEntity.ok(AddProductResponse(
                productId = productId
        ))
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping("/")
    fun getAllProduct(): ResponseEntity<AllProductResponse> {
        val data = productService.getAll()
        return ResponseEntity.ok(AllProductResponse(
                products = data
        ))
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @DeleteMapping("/{id}")
    fun deleteProduct(
        @PathVariable id: Long
    ): ResponseEntity<DeleteProductResponse> {
        return ResponseEntity.ok(DeleteProductResponse(
                success = productService.deleteProduct(id)
        ))
    }
}
