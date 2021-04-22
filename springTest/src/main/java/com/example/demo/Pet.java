package com.example.demo;

import java.util.ArrayList;

public /*abstract*/ class Pet {
    private String name;
    private String personality;
    public int age;
    private String breed;
    private String relationshipStatus;
    private String bio;
    private String pic;
    private String size;

    public Pet(){
        name = "BROKEN";
        personality = "BROKEN";
        age = -1;
        breed = "BROKEN";
        relationshipStatus = "BROKEN";
        size = "BROKEN";
        bio="BROKEN";
        pic ="BROKEN";
    }

    public Pet(String name,int age){
        this.name = name;
        this.age = age;
    }
    public Pet(String name, int age, String personality, String breed, String rS, String size, String bio,String pic){
        this.name = name;
        this.age = age;
        this.personality = personality;
        this.breed = breed;
        this.relationshipStatus =rS;
        this.size = size;
        this.bio = bio;
        this.pic = pic;
    }

    void setName(String name){
        this.name = name;
    }
    void setBio(String b){bio = b;}
    void setPic(String p){pic = p;}
    void setPersonality(String personality){
        this.personality = personality;
    }
    void setAge(int age){
        this.age = age;
    }
    void setBreed(String breed){
        this.breed = breed;
    }
    void setRelationshipStatus(String rs){
        this.relationshipStatus = rs;
    }
    void setSize(String size){
        this.size = size;
    }
    public String getPic(){return pic;}
    public String getBio(){return bio;}
    public String getName(){
        return name;
    }
    public String getPersonality(){
        return personality;
    }
    public String getBreed(){
        return breed;
    }
    public /*abstract*/ int getAge(){
        return age;
    }
    public String getRelationshipStatus(){
        return relationshipStatus;
    }
    public String getSize(){
        return size;
    }
}

