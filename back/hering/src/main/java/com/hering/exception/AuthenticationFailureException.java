package com.hering.exception;

public class AuthenticationFailureException extends RuntimeException {


	private static final long serialVersionUID = 1L;

	public AuthenticationFailureException(String message) {
        super(message);
    }

    public AuthenticationFailureException(String message, Throwable cause) {
        super(message, cause);
    }
}