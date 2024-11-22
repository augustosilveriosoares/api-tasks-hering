package com.hering.dto;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record TaskDto(
	
	UUID id,
	
	@NotNull(message = "Informe um titulo para a Task")
	String title,

    @NotNull(message = "Uma data e obrigatória")
	LocalDate date,
	
	@Size(max = 255, message = "Descrição nao pode exceder 255 caracteres")
	String description,
	boolean completed
	
	)
{}
