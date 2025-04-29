package com.example.Furia.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.Furia.Model.User;

public interface UserRepository extends JpaRepository<User,Long>{

    public UserDetails findByEmail(String email);

}
