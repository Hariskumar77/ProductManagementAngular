package com.example.demo.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	
	public Product getProductDetails(Integer id) {
	return productRepository.findByProductId(id);	
	}
	
	@Transactional
	public Product addProduct(Product product) {
		return productRepository.save(product);
	}
	
	public List<Product> getAllLocations() {
		return productRepository.findAll();
	}
}

