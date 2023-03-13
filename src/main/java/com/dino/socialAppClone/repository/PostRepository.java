package com.dino.socialAppClone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dino.socialAppClone.domain.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
