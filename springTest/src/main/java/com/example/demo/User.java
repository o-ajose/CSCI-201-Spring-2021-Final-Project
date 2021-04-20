package com.example.demo;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String username;
    private String password;
    private String location;
    private String displayName;
    private String profilePic;
    private String email;
    private String bio;
    private int numPosts;
    private List<String> friends;
    private List<String> friendRequests;
    private String song;
    private ArrayList<Pet> petList = new ArrayList<Pet>();

    User(String username, String email, String password,String bio,String location,String pic){
        this.username = username;
        this.email = email;
        this.password=password;
        this.displayName = username;
        this.bio = bio;
        this.song = "Music/Default.mp3";
        this.numPosts = 0;
        this.friends = new ArrayList<String>();
        this.location = location;
        profilePic = pic;
        this.friendRequests = new ArrayList<String>();
    }
    User(String username, String email, String password,String bio, int numPosts,  List<String>friends,List<String>friendRequests,String location,String pic){
        this.username = username;
        this.email = email;
        this.displayName = username;
        this.password=password;
        this.bio = bio;
        this.song = "Music/Default.mp3";
        this.numPosts = numPosts;
        this.friends = friends;
        this.friendRequests = friendRequests;
        this.location = location;
        this.profilePic = pic;
    }
    User(){
        this.song = "Music/Default.mp3";
        username = "newUser";
        displayName = username;
        email = "hi@usc.edu";
        password="123";
        bio="Hell there";
        location = "California";
        profilePic = "";
        numPosts = 0;
        friends = new ArrayList<String>();
        friendRequests= new ArrayList<String>();
    }

    public String getUsername(){
        return username;
    }

    public String getProfilePic(){return profilePic;}

    public String getLocation(){return location;}

    public String getDisplayName(){
        return displayName;
    }

    public List<String> getFriends(){return friends;}
    public String getSong(){return song;}
    public ArrayList<Pet> getPetList() {
        return petList;
    }
    public String getBio(){return bio;}

    public String getPassword(){
        return password;
    }
    public String getEmail(){
        return email;
    }
    public List<String> getFriendRequests(){return friendRequests;}

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
    public void setFriendRequests(List<String> newRequests){friendRequests = newRequests;}
    public void setFriends(List<String> newFriends){
        friends = newFriends;
    }
    public void addFriend(String newFriend){
        friends.add(newFriend);
    }
    public void setSong(String newSong){
        song = newSong;
    }
    public void setDisplayName(String displayName){
        this.displayName = displayName;
    }

    public void addPet(Pet newPet){
        petList.add(newPet);
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

    public void setLocation(String location){
        this.location = location;
    }
    public void setProfilePic(String pic){
        this.profilePic = pic;
    }
}