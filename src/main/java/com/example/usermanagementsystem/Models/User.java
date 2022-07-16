package com.example.usermanagementsystem.Models;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "user_seq")
    private Long userId;
    private String firstName;
    private String lastName;
    private String password;
    private String role;
    private String email;
    private String address;
    private String city;


//    public User(Long userId, String firstName, String lastName, String role, String email, String address, String city) {
//        this.userId = userId;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.role = role;
//        this.email = email;
//        this.address = address;
//        this.city = city;
//    }


    public User(String firstName, String lastName, String password, String role, String email, String address, String city) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.role = role;
        this.email = email;
        this.address = address;
        this.city = city;
    }


}