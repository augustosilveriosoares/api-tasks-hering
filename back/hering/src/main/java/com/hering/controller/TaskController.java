package com.hering.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.PatchExchange;

import com.hering.dto.TaskDto;
import com.hering.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("tasks")
@CrossOrigin(origins = "http://localhost")
public class TaskController {
	
	@Autowired
	private TaskService taskService;
	
	@GetMapping
	public  ResponseEntity<Page<TaskDto>> findAll(@RequestParam int page, @RequestParam int size){
		return ResponseEntity.ok(taskService.findAll(page,size));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TaskDto> findById(@PathVariable(value = "id") UUID id){
		return ResponseEntity.ok(taskService.findById(id));
	}
	
	@PostMapping
	public ResponseEntity<TaskDto> save(@RequestBody @Valid TaskDto taskDto){
		return ResponseEntity.status(HttpStatus.CREATED).body(taskService.save(taskDto));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<TaskDto> update(@PathVariable(value = "id") UUID id , @RequestBody @Valid TaskDto taskDto){
		return ResponseEntity.ok(taskService.update(id, taskDto));
		
	}
	
	@PatchMapping("/complete/{id}")
	public ResponseEntity<TaskDto> updateComplete(@PathVariable(value = "id") UUID id , @RequestBody @Valid TaskDto taskDto){
		return ResponseEntity.ok(taskService.updateComplete(id, taskDto));
		
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<TaskDto> delete(@PathVariable(value = "id") UUID id){
		taskService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
