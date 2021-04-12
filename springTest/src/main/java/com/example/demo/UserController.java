package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;


@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/getUserDetails")
    @ResponseBody
    public String getUser(@RequestParam String username, @RequestParam String password ) throws InterruptedException, ExecutionException {
        return "<html>\n" + "<header><title>Welcome</title></header>\n" +
                "<body><h1>" + userService.getUserDetails(username,password)+ "</h1></body>\n" + "</html>";
    }

    @PostMapping("/createUser")
    public String createUser(@RequestParam String username1, @RequestParam String password1, @RequestParam String email1) throws InterruptedException, ExecutionException {
        User newUser = new User(username1,email1,password1);
        return userService.saveUserDetails(newUser);
    }
    /*
    @PutMapping("/updateUser")
    public String updateUser(@RequestBody User user ) throws InterruptedException, ExecutionException {
        return userService.updateUserDetails(user);
    }
    @DeleteMapping("/deleteUser")
    public String deleteUser(@RequestParam String name){
        return userService.deleteUser(name);
    }
     */



}