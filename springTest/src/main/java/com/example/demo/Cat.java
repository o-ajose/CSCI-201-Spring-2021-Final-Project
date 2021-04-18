package com.example.demo;
public class Cat extends Pet{
    Cat(String name, int age){
        super(name,age);
    }
    public int getAge(){
        return age*15;
    }
}