package com.coneill.hri.robotportal.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.coneill.hri.robotportal.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {

	Optional<User> findByUsername(String username);

}
