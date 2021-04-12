package com.example.demo;

public class User {
    private String username;
    private String password;
    private String email;

    User(String username, String email, String password){
        this.username = username;
        this.email = email;
        this.password=password;
    }

    User(){
        username = "newUser";
        email = "hi@usc.edu";
        password="123";
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }
    public String getEmail(){
        return email;
    }
    public void setusername(String newName){
        username = newName;
    }

    public void setEmail(String newEmail){
        email = newEmail;
    }
    public void setPassword(String newPass){
        password = newPass;
    }

}