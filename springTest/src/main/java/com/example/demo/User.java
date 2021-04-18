package com.example.demo;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private String password;
    private String email;
    private String bio;
    private int numPets;
    private int numPosts;
    private List<String> friends;
    private List<String> friendRequests;

    User(String username, String email, String password,String bio){
        this.username = username;
        this.email = email;
        this.password=password;
        this.bio = bio;
        this.numPets = 0;
        this.numPosts = 0;
        this.friends = new ArrayList<String>();
        this.friendRequests = new ArrayList<String>();
    }
    User(String username, String email, String password,String bio, int numPosts, int numPets, List<String>friends,List<String>friendRequests){
        this.username = username;
        this.email = email;
        this.password=password;
        this.bio = bio;
        this.numPets = numPets;
        this.numPosts = numPosts;
       this.friends = friends;
        this.friendRequests = friendRequests;
    }
    User(){
        username = "newUser";
        email = "hi@usc.edu";
        password="123";
        bio="Hell there";
        numPets = 0;
        numPosts = 0;
        friends = new ArrayList<String>();
        friendRequests= new ArrayList<String>();
    }

    public String getUsername(){
        return username;
    }

    public List<String> getFriends(){return friends;}

    public String getBio(){return bio;}

    public String getPassword(){
        return password;
    }
    public String getEmail(){
        return email;
    }
    public List<String> getFriendRequests(){return friendRequests;}
    public int getNumPets(){return numPets;}

    public int getNumPosts(){return numPosts;}
    public void setusername(String newName){
        username = newName;
    }

    public void setEmail(String newEmail){
        email = newEmail;
    }
    public void setPassword(String newPass){
        password = newPass;
    }

    public void setBio(String newBio){
        bio = newBio;
    }
    public void setNumPosts(int num){
        numPosts = num;
    }
    public void incrementPost(){
        numPosts+=1;
    }
    public void setNumPets(int num){
        numPets = num;
    }
    public void setFriendRequests(List<String> newRequests){friendRequests = newRequests;}
    public void setFriends(List<String> newFriends){
        friends = newFriends;
    }
    public void addFriend(String newFriend){
        friends.add(newFriend);
    }
    public void addFriendRequest(String name){
        if(friendRequests==null){
        friendRequests = new ArrayList<String>();
        }
        friendRequests.add(name);
    }
    public void removeFriendRequest(String name){
        if(friendRequests.contains(name)){
            friendRequests.remove(name);
        }
    }
}