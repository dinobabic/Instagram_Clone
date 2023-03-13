package com.dino.socialAppClone.controller;

import com.dino.socialAppClone.domain.Follower;
import com.dino.socialAppClone.domain.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowRequest {

	private User user;
	private User follower;
}
