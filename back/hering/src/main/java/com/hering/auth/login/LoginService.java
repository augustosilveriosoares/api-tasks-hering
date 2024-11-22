package com.hering.auth.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.hering.auth.User;
import com.hering.config.jwt.JwtServiceGenerator;
import com.hering.exception.AuthenticationFailureException;

@Service
public class LoginService {
    
    @Autowired
    private LoginRepository repository;
    
    @Autowired
    private JwtServiceGenerator jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    public String logar(UserLoginDto login) {
    	User user = repository.findByUsername(login.getUsername()).orElseThrow(() -> new AuthenticationFailureException("Usuário não existe"));
        try {

            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    login.getUsername(),
                    login.getPassword()
                )
            );
            return jwtService.generateToken(user);
            
        } catch (AuthenticationException ex) {
            
            throw new AuthenticationFailureException("Credenciais Invalidas", ex);
        }
    }
}
