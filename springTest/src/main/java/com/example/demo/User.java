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
    private List<Request> friends = new ArrayList<Request>();
    private List<Request> friendRequests = new ArrayList<Request>();
    private String song;
    private ArrayList<Pet> petList = new ArrayList<Pet>();
    private String name;
    User(String name,String username, String email, String password,String bio,String location,String pic){
        this.name = name;
        this.username = username;
        this.email = email;
        this.password=password;
        this.displayName = username;
        this.bio = bio;
        this.song = "Music/Default.mp3";
        this.numPosts = 0;
        this.location = location;
        profilePic = pic;
    }
    User(String name,String username, String email, String password,String bio, int numPosts,  List<String>friends,List<String>friendRequests,String location,String pic){
        this.name = name;
        this.username = username;
        this.email = email;
        this.displayName = username;
        this.password=password;
        this.bio = bio;
        this.song = "Music/Default.mp3";
        this.numPosts = numPosts;
        this.location = location;
        this.profilePic = pic;
    }
    User(){
        this.song = "Music/Default.mp3";
        name = "Jane Doe";
        username = "newUser";
        displayName = username;
        email = "hi@usc.edu";
        password="123";
        bio="Hell there";
        location = "California";
        profilePic = "";
        numPosts = 0;
    }

    public String getUsername(){
        return username;
    }

    public String getName(){return name;}

    public String getProfilePic(){return profilePic;}

    public String getLocation(){return location;}

    public String getDisplayName(){
        return displayName;
    }

    public List<Request> getFriends(){return friends;}
    public String getSong(){return song;}
    public ArrayList<Pet> getPetList() {
        return petList;
    }
    public String getBio(){return bio;}
    public boolean hasFriendRequest(String username){
        for(int i = 0; i<friendRequests.size();i++){
            if(friendRequests.get(i).user.equals(username))
                return true;
        }
        return false;
    }
    public boolean hasFriend(String username){
        for(int i = 0; i<friends.size();i++){
            if(friends.get(i).user.equals(username))
                return true;
        }
        return false;
    }
    public String getPassword(){
        return password;
    }
    public String getEmail(){
        return email;
    }
    public List<Request> getFriendRequests(){return friendRequests;}

    public int getNumPosts(){return numPosts;}
    public void setusername(String newName){
        username = newName;
    }
    public void setName(String name){this.name =name;}
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
    public void setFriendRequests(List<Request> newRequests){friendRequests = newRequests;}
    public void setFriends(List<Request> newFriends){
        friends = newFriends;
    }
    public void addFriend(Request newFriend){
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
    public void addFriendRequest(Request name){
        if(friendRequests==null){
        friendRequests = new ArrayList<Request>();
        }
        friendRequests.add(name);
    }
    public void removeFriendRequest(String name){
        for(int i = 0; i<friendRequests.size();i++){
            if(friendRequests.get(i).user.equals(name)){
                friendRequests.remove(friendRequests.get(i));
            }
        }
    }

    public void setLocation(String location){
        this.location = location;
    }
    public void setProfilePic(String pic){
        this.profilePic = pic;
    }
}
