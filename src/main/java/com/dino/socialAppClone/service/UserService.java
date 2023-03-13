package com.dino.socialAppClone.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.dino.socialAppClone.domain.User;

public interface UserService {

	void save(User user);

	List<User> findAll();

	User findByUsername(String username);

	User findById(long userId);

	User update(User user);


}
