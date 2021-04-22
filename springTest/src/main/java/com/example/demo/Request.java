package com.example.demo;

public class Request {
    public String user;
    public String profilePic;
    public String bio;
    Request(String u, String p,String b){
        user = u;
        profilePic = p;
        bio = b;
    }
    Request(){
        user="";
        profilePic="";
        bio="";
    }
}
