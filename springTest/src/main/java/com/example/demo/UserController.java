package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public String register(HttpServletRequest request,@RequestParam String username1, @RequestParam String password1, @RequestParam String email1, @RequestParam String bio) throws InterruptedException, ExecutionException {
        User newUser = new User(username1,email1,password1,bio);
        HttpSession session = request.getSession();
        //return (String)session.getAttribute("username");
        session.setAttribute("username",username1);
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

    @PostMapping("/getPosts")
    public ResponseEntity<List<Post>> getPosts(HttpServletRequest request) throws IOException,ExecutionException,InterruptedException {
       // logger.info("HIT -/download | File Name : {}"+ fileName);
        HttpSession session = request.getSession();
        String username = (String)session.getAttribute("username");
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