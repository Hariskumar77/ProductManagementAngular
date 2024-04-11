package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@GetMapping("/{id}")
	public Product getProductDetails(@PathVariable Integer id) {
		return productService.getProductDetails(id);
		
	}
	@PostMapping
	public Product addProduct(@RequestBody Product product) {
		return  productService.addProduct(product);
	}
	
	@GetMapping
	public List<Product> getAllLocations() {
		return productService.getAllLocations();
	}
}
