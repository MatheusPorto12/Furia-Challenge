package com.example.Furia.Services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Furia.DTO.RegisterDTO;
import com.example.Furia.Enum.UserRoles;
import com.example.Furia.Model.User;
import com.example.Furia.Repository.UserRepository;

@Service
public class AuthService implements UserDetailsService{
@Autowired
private UserRepository userRepository;

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
    User user=(User)userRepository.findByEmail(username);   
    if (user == null) {
        throw new UsernameNotFoundException("Usuário não encontrado com o email: " + username);
    }
    return user;
}

public User registerUser(RegisterDTO data){
    LocalDateTime now=LocalDateTime.now();
    DateTimeFormatter formater=DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String horaCadastro=now.format(formater);

    if(this.userRepository.findByEmail(data.email())!=null){
        throw new RuntimeException("Erro usuario existente");
    }
    try {
    String passwordEncrypt= new BCryptPasswordEncoder().encode(data.password());
    User user= new User();
    user.setNome(data.nome());
    user.setEmail(data.email());
    user.setPassword(passwordEncrypt);
    user.setAtivo(true);
    user.setTelefone(data.Telefone());
    user.setData_nascimento(data.data_nascimento());
    user.setCpf(data.cpf());
    user.setData_cadastro(horaCadastro);
    user.setRole(UserRoles.USER);
    userRepository.save(user);
    return user;
} catch (Exception e) {
    throw new RuntimeException(e.getMessage());
    }
}
}

