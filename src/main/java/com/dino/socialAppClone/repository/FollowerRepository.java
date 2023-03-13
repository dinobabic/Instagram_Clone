package com.dino.socialAppClone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dino.socialAppClone.domain.Follower;

@Repository
public interface FollowerRepository extends JpaRepository<Follower, Long>{

}
