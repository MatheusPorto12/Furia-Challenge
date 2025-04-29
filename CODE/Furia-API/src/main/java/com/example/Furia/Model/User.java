package com.example.Furia.Model;

import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.Comment;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CookieValue;

import com.example.Furia.Enum.UserRoles;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User implements UserDetails{
    
    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_name")
    private String nome;

    @Column(name = "user_password")
    private String password;

    @Column
    private boolean ativo;
    
    @Column(name = "user_telefone")
    private String telefone;

    @Column(name = "user_cpf")
    private String cpf;

    @Column(name = "user_data_cadastro")
    public String data_cadastro;

    @Column(name = "user_role")
    private UserRoles role;
    
    @OneToMany
    @JoinColumn(name ="addres_id")
    private List<Address> address;
    
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    if (this.role.equals(UserRoles.ADMIN)) {
       return List.of(new SimpleGrantedAuthority("ROLE_USER"),new SimpleGrantedAuthority("ROLE_ADMIN"));}
       return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }


}
