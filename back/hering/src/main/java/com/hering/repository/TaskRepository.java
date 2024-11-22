package com.hering.repository;


import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hering.model.Task;


@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

		Page<Task> findAll(Pageable pageable);
}
