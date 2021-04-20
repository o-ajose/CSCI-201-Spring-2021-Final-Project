package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import java.util.concurrent.ExecutionException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@RestController
public class UserController {
    @Autowired
    FileService fileService;
    static Logger logger = Logger.getLogger(Application.class.getName());
    @Autowired
    UserService userService;

    @GetMapping("/login")
    @ResponseBody
    public String login(HttpServletRequest request,@RequestParam String username, @RequestParam String password ) throws InterruptedException, ExecutionException {
        String loggedIn =userService.getUserDetails(username,password);
        HttpSession session = request.getSession();
        session.setAttribute("loggedIn", true);
        session.setAttribute("username", username);
        return loggedIn;
    }

    @PostMapping("/register")
    public String register(HttpServletRequest request,@RequestParam String username1, @RequestParam String password1, @RequestParam String email1, @RequestParam String bio, @RequestParam String location /*, @RequestParam("file") MultipartFile multipartFile*/) throws InterruptedException, ExecutionException {
        //logger.info("HIT -/upload | File Name : {}"+multipartFile.getOriginalFilename());
        // String profilePic = fileService.upload(multipartFile);
        User newUser = new User(username1,email1,password1,bio,location,"https://firebasestorage.googleapis.com/v0/b/csci201finalproject-310216/o/eb937cd9-37f7-45af-87ed-7533f7f1826b.jpg?alt=media");
        HttpSession session = request.getSession();
        //return (String)session.getAttribute("username");
        session.setAttribute("username",username1);
        //session.setAttribute("profilePic","https://firebasestorage.googleapis.com/v0/b/csci201finalproject-310216/o/eb937cd9-37f7-45af-87ed-7533f7f1826b.jpg?alt=media")
        return userService.saveUserDetails(newUser);
    }

    @PostMapping("/createPost")
    public String makePost(HttpServletRequest request,@RequestParam("file") MultipartFile multipartFile, @RequestParam("comments") String comments) throws InterruptedException, ExecutionException {
        logger.info("HIT -/upload | File Name : {}"+multipartFile.getOriginalFilename());
        String imageURL = fileService.upload(multipartFile);
        HttpSession session = request.getSession();
        String username= (String)session.getAttribute("username");
        return userService.createPost(username,imageURL,comments);
    }
    @PutMapping("/updateUser")
    public String updateUser(HttpServletRequest request,@RequestParam String displayName,@RequestParam String password, @RequestParam("file") MultipartFile multipartFile,@RequestParam String email, @RequestParam String bio,@RequestParam String location) throws InterruptedException, ExecutionException {
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        return userService.updateUserDetails(username,displayName,password,email,location,bio,multipartFile);
    }

    @PutMapping("/updatePet")
    public String updatePet(HttpServletRequest request,@RequestBody Pet pet ) throws InterruptedException, ExecutionException {
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        return userService.updatePetDetails(username,pet);
    }

    @PostMapping("/setSong")
    @ResponseBody
    public String setSong(@RequestParam String username2, @RequestParam String song ) throws InterruptedException, ExecutionException {
        return userService.setUserSong(username2, song);
    }

    @PostMapping("/getSong")
    @ResponseBody
    public String getSong(@RequestParam String username3) throws InterruptedException, ExecutionException {
        return userService.getUserSong(username3);
    }



    @PostMapping("/createPet")
    public String createPet(@RequestParam String username4,
                            @RequestParam String name,
                            @RequestParam String personality,
                            @RequestParam String age,
                            @RequestParam String breed,
                            @RequestParam String relationshipStatus,
                            @RequestParam String size) throws InterruptedException, ExecutionException {
        Pet newPet = null;
        /*if(animaltype.equals("dog")){
            // how do you want to get the input of age? right now moving String to int
            newPet = new Dog(name, Integer.parseInt(age));
            newPet.setPersonality(personality);
            newPet.setBreed(breed);
            newPet.setRelationshipStatus(relationshipStatus);
            newPet.setSize(size);
        } else if(animaltype.equals("cat")){
            newPet = new Cat(name, Integer.parseInt(age));
            newPet.setPersonality(personality);
            newPet.setBreed(breed);
            newPet.setRelationshipStatus(relationshipStatus);
            newPet.setSize(size);
        }*/

        newPet = new Pet(name, Integer.parseInt(age));
        newPet.setPersonality(personality);
        newPet.setBreed(breed);
        newPet.setRelationshipStatus(relationshipStatus);
        newPet.setSize(size);

        return userService.savePetDetails(username4, newPet);
    }

    @GetMapping("/getAllPetDetails")
    @ResponseBody
    public String getAllPets(@RequestParam String username) throws InterruptedException, ExecutionException {
        return userService.getAllPetDetails(username);
    }
    @PostMapping("/getPosts")
    public ResponseEntity<List<Post>> getPosts(HttpServletRequest request) throws IOException,ExecutionException,InterruptedException {
        // logger.info("HIT -/download | File Name : {}"+ fileName);
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        if(username==null){
            List<Post> loggedOut = new ArrayList<Post>();
            loggedOut.add(new Post());
            return ResponseEntity.ok(loggedOut);
        }
        return ResponseEntity.ok(userService.getPosts(username));
    }

    @PostMapping("/getUsername")
    public String getUsername(HttpServletRequest request){
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        return username;
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("username","");
        session.setAttribute("loggedIn",false);
        return "Logged out!";
    }
    @PostMapping("/requestFriend")
    public String sendFriendRequest(HttpServletRequest request, @RequestParam("friend") String friend)throws ExecutionException,InterruptedException {
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        // return username+" "+friend;
        return userService.sendFriendRequest(username,friend);
    }

    @PostMapping("/getRequests")
    public ResponseEntity<List<String>> getRequests(HttpServletRequest request)throws ExecutionException,InterruptedException {
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        // return username+" "+friend;
        return ResponseEntity.ok(userService.getRequests(username));
    }

    @PostMapping("/acceptFriendRequest")
    public String acceptFriendRequest(HttpServletRequest request,@RequestParam("friend") String friend)throws ExecutionException,InterruptedException {
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        return userService.acceptRequest(username,friend);
    }
    @PostMapping("/areNewPosts")
    public String areNewPosts(HttpServletRequest request) throws InterruptedException, ExecutionException{
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
        return userService.checkForPosts(username);
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