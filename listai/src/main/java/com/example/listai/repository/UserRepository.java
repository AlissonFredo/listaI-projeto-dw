package com.example.listai.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.listai.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserNameOrEmail(String userName, String email);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);
}
