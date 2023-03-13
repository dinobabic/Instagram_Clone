package com.dino.socialAppClone.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dino.socialAppClone.domain.User;
import com.dino.socialAppClone.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void save(User user) {
		user.addAuthority("ROLE_USER");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
	}

	@Override
	public List<User> findAll() {
		List<User> users = userRepository.findAll();
		users.stream().forEach((user) -> user.setPassword(null));
		return users;
	}

	@Override
	public User findByUsername(String username) {
		User user = userRepository.findByUsername(username).get();
		user.setPassword(null);
		return user;
	}

	@Override
	public User findById(long userId) {
		return userRepository.findById(userId).get();
	}

	@Override
	public User update(User user) {
		
		if (user.getPassword().equals("")) {
			User userDb = userRepository.findById(user.getId()).get();
			user.setPassword(userDb.getPassword());
		}
		else {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		}
		
		return userRepository.save(user);
	}




}
