package com.dino.socialAppClone.service;

import java.util.List;

import com.dino.socialAppClone.domain.Follower;
import com.dino.socialAppClone.domain.User;

public interface FollowerService {

	List<Follower> getFollowersByUserId(Long userId);

	Follower save(User user, User follower);

}
