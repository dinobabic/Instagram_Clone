package com.dino.socialAppClone.controller;

import org.springframework.http.MediaType;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.dino.socialAppClone.domain.Post;
import com.dino.socialAppClone.domain.User;
import com.dino.socialAppClone.service.PostService;

@RestController
@RequestMapping("/api/posts")
public class PostController {
	
	 @Autowired
	 private PostService postService;
	 
	 @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_JSON_VALUE})
	 public Post addPost(@RequestPart("file") String file, @RequestPart("post") String postText,
			 		@RequestPart("user") String user) throws Exception {
		 	
		int userId = Integer.parseInt(user.split(":")[1].split(",")[0]);
        Post post = new Post(postText, LocalDate.now(), 0, file, file, userId);
        
        postService.save(post);
        
        return post;
	 }
	 
	 @GetMapping
	 public List<Post> getPosts() {
		 return postService.findAll();
	 }

}
