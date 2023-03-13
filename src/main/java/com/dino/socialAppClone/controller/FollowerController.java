package com.dino.socialAppClone.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dino.socialAppClone.domain.Follower;
import com.dino.socialAppClone.service.FollowerService;

@RestController
@RequestMapping("/api/followers")
public class FollowerController {

	@Autowired
	private FollowerService followerService;
	
	@GetMapping("{userId}")
	public ResponseEntity<?> getFollowers(@PathVariable Long userId) {
		return ResponseEntity.ok(followerService.getFollowersByUserId(userId));
	}
	
	@PostMapping("")
	public ResponseEntity<?> addFollow(@RequestBody FollowRequest request) {
		Follower follower = followerService.save(request.getUser(), request.getFollower());
		return ResponseEntity.ok(follower);
	}
}
