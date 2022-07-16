package com.example.usermanagementsystem.Services;


import com.example.usermanagementsystem.Models.User;
import com.example.usermanagementsystem.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired( required = true)
    public UserRepository userRepository;

    public List<User> getUsers() {

        User user1 = new User("nondas", "pap","user", "132@gmail.com", "thessaloniki", "sykies 25 martioy" , "123");
        User user2 = new User("nikos", "psarakas","user", "132@gmail.com", "thessaloniki", "sykies 25 martioy","123");
        User user3 = new User("bill", "koul","user", "132@gmail.com", "thessaloniki", "sykies 25 martioy", "123");
        List<User> users = new ArrayList();
        users.add(user1);
        users.add(user2);
        users.add(user3);
        return (List<User>) userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public void updateUser(User updateUserInfo) {

        User user = userRepository.findById(updateUserInfo.getUserId()).orElse(null);

        if (updateUserInfo.getFirstName() != null) {
            user.setFirstName(updateUserInfo.getFirstName());
        }

        if (updateUserInfo.getLastName() != null) {
            user.setLastName(updateUserInfo.getLastName());
        }
        if (updateUserInfo.getEmail() != null) {
            user.setEmail(updateUserInfo.getEmail());
        }
        if (updateUserInfo.getAddress() != null) {
            user.setAddress(updateUserInfo.getAddress());
        }

        if (updateUserInfo.getCity() != null) {
            user.setCity(updateUserInfo.getCity());
        }

        if (updateUserInfo.getPassword() != null ) {
            user.setPassword(updateUserInfo.getPassword());
        }


        userRepository.save(user);

    }




    public User getUserDetailsById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

}