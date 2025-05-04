package com.example.Furia.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Furia.DTO.UpdateUserDTO;
import com.example.Furia.Model.User;
import com.example.Furia.Repository.UserRepository;
import com.example.Furia.Services.UserServices;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserServices userServices;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){
        User user=this.userServices.getUserById(id);
        if(user==null){
            return ResponseEntity.ok().body(user);
        }
        return ResponseEntity.badRequest().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(UpdateUserDTO data){
        if(userServices.updateUser(data)!=true){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    } 
}
