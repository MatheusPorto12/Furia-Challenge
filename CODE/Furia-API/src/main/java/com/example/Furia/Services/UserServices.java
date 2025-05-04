package com.example.Furia.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Furia.DTO.UpdateUserDTO;
import com.example.Furia.Model.User;
import com.example.Furia.Repository.UserRepository;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;


    public User getUserById(Long id){
        return this.userRepository.findById(id).get();
    }

    public boolean updateUser(UpdateUserDTO data){
        User objUpdate=userRepository.findById(data.id()).get();
        objUpdate.setEmail(data.email());
        objUpdate.setPassword(data.password());
        objUpdate.setTelefone(data.telefone());
        objUpdate.setCpf(data.cpf());
        userRepository.save(objUpdate);
        return true;
    }
}
