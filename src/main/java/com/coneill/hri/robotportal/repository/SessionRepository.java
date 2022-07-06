package com.coneill.hri.robotportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.coneill.hri.robotportal.entity.Session;

public interface SessionRepository extends CrudRepository<Session, Long> {

	Optional<Session> findById(long sessionId);

	List<Session> findByUserId(long userId);

}
