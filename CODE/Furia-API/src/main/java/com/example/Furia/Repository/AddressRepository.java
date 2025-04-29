package com.example.Furia.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Furia.Model.Address;

public interface AddressRepository extends JpaRepository<Address,Long> {

}
