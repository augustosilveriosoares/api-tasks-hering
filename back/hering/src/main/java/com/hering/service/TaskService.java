package com.hering.service;

import java.util.ArrayList;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hering.dto.TaskDto;
import com.hering.exception.task.TaskNotFoundException;
import com.hering.model.Task;
import com.hering.repository.TaskRepository;

import jakarta.validation.Valid;

@Service
public class TaskService {
	
	@Autowired
	private TaskRepository taskRepository;

	public Page<TaskDto> findAll(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
	    Page<Task> tasksPage = taskRepository.findAll(pageable);
	    return tasksPage.map(this::convertToDto);
	}

	public TaskDto findById(UUID id) {
		var task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task "+id+" não encontrada!"));
		return convertToDto(task);
	}
	
	public TaskDto save(@Valid TaskDto taskDto) {
		Task task = new Task();
		BeanUtils.copyProperties(taskDto, task);
		taskRepository.save(task);
		return convertToDto(task);
	}
	

	public TaskDto update(UUID id, TaskDto taskDto) {
		Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task "+id+" não encontrada!"));
		BeanUtils.copyProperties(taskDto, task);
		taskRepository.save(task);
		return convertToDto(task);		
	}
	
	public TaskDto updateComplete(UUID id, TaskDto taskDto) {
		Task task = taskRepository.findById(id).orElseThrow(() -> new TaskNotFoundException("Task "+id+" não encontrada!"));
		task.setCompleted(taskDto.completed());
		taskRepository.save(task);
		return convertToDto(task);		
	}

	public void delete(UUID id) {
		if (!taskRepository.existsById(id)) 
	        throw new TaskNotFoundException("Task " + id + " não encontrada!");
	    
		taskRepository.deleteById(id);	
	}

	private TaskDto convertToDto(Task task) {
		return new TaskDto(
				task.getId(), 
				task.getTitle(),
				task.getDate(),
				task.getDescription(),
				task.isCompleted()
				);
	}

}
