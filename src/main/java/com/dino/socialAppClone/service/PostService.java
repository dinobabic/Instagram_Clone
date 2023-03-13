package com.dino.socialAppClone.service;

import java.util.List;

import com.dino.socialAppClone.domain.Post;

public interface PostService {

	void save(Post post);

	List<Post> findAll();

}
