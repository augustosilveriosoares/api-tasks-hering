package com.hering.auth.login;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hering.auth.User;


public interface LoginRepository extends JpaRepository<User, UUID>{

	public Optional<User> findByUsername(String login);
	
}
