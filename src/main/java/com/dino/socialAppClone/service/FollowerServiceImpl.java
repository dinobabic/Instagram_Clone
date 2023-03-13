package com.dino.socialAppClone.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dino.socialAppClone.domain.Follower;
import com.dino.socialAppClone.domain.User;
import com.dino.socialAppClone.repository.FollowerRepository;

@Service
public class FollowerServiceImpl implements FollowerService {
	
	@Autowired
	private FollowerRepository followerRepository;

	@Override
	public List<Follower> getFollowersByUserId(Long userId) {
		List<Follower> followers = followerRepository.findAll();
		followers = followers.stream()
				.filter((follower) -> follower.getUser() == userId)
				.collect(Collectors.toList());
		return followers;
	}

	@Override
	public Follower save(User user, User follower) {
		Follower newFollower = new Follower(user.getId(), follower.getId());
		return followerRepository.save(newFollower);
	}

}
