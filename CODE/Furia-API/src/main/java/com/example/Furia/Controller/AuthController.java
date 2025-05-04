package com.example.Furia.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.Authentication;

import com.example.Furia.DTO.LoginRequestDTO;
import com.example.Furia.DTO.RegisterDTO;
import com.example.Furia.DTO.TokenResponse;
import com.example.Furia.Model.User;
import com.example.Furia.Repository.UserRepository;
import com.example.Furia.Services.AuthService;
import com.example.Furia.Utils.JWTutils;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    private JWTutils jwtutils;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO data) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());
        Authentication auth = this.authenticationManager.authenticate(usernamePassword);

        var token = this.jwtutils.generateJWTtoken((User) auth.getPrincipal());

        return ResponseEntity.ok(new TokenResponse(token));

    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO data){
        if(this.userRepository.findByEmail(data.email())!=null){
            throw new RuntimeException("Usuario ja cadastrado");
        }
        try{
           User user=this.authService.registerUser(data);
           var token=this.jwtutils.generateJWTtoken(user);
           return ResponseEntity.status(201).body(new TokenResponse(token));
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }

}
