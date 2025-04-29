package com.example.Furia.Security;



import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.Furia.Repository.UserRepository;
import com.example.Furia.Utils.JWTutils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    JWTutils jwTutils;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException{
    var token= this.recoveryToken(request);
    if(token!=null){
        var login = jwTutils.validateToken(token);
        UserDetails user= userRepository.findByEmail(login);

        var authentication = new UsernamePasswordAuthenticationToken(user, null,user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    filterChain.doFilter(request, response);
    }

    public String recoveryToken(HttpServletRequest request){
        var authHeader= request.getHeader("Authorization");
        if(authHeader==null)return null;
        return authHeader.replace("Bearer ", "");
    }

}