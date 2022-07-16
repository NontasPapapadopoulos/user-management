package com.example.usermanagementsystem.Controllers;


import com.example.usermanagementsystem.Models.User;
import com.example.usermanagementsystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    UserService userService;


    @GetMapping("users")
    public ResponseEntity<List<User>>getUsers() {

        ArrayList<User> users = (ArrayList<User>) userService.getUsers();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }


    @PostMapping("addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        userService.addUser(user);
        return new ResponseEntity<User>(user,HttpStatus.OK);
    }

    @DeleteMapping("deleteUser")
    public ResponseEntity<Long> deleteUser(@RequestParam Long userId) {
        System.out.println(userId);
        userService.deleteUser(userId);
        return new ResponseEntity<>(userId, HttpStatus.OK);
    }


    @PutMapping("updateUser")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        System.out.println(user);
        userService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("getUserDetails")
    public ResponseEntity<User> getUser(@RequestParam Long userId) {
        User user = userService.getUserDetailsById(userId);

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}
