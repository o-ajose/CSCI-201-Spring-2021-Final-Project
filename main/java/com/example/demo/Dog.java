package com.example.demo;
public class Dog extends Pet{
    Dog(String name, int age){
        super(name,age);
    }
    public int getAge(){
        return age*7;
    }
}
