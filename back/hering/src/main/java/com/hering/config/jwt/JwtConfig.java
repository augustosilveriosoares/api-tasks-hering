package com.hering.config.jwt;

import io.jsonwebtoken.SignatureAlgorithm;

public class JwtConfig {

	
	public static final SignatureAlgorithm ALGORITMO_ASSINATURA = SignatureAlgorithm.HS256;
	public static final int HORAS_EXPIRACAO_TOKEN = 1;

}
