package com.dino.socialAppClone.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dino.socialAppClone.domain.User;
import com.dino.socialAppClone.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping
	public List<User> getUsers() {
		return userService.findAll();
	}
	
	@GetMapping("{username}")
	public ResponseEntity<?> getUserUsername(@PathVariable String username) {
		return ResponseEntity.ok(userService.findByUsername(username));
	}
	
	@GetMapping("byId/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable long userId) {
		return ResponseEntity.ok(userService.findById(userId));
	}
	
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		User updatedUser = userService.update(user);
		updatedUser.setPassword("");
		return ResponseEntity.ok(updatedUser);
	}
	
}









