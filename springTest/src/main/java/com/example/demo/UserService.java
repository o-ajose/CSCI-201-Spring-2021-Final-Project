package com.example.demo;

import com.example.demo.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    public static final String COL_NAME = "users";

    public String saveUserDetails(User user) throws InterruptedException, ExecutionException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(user.getUsername());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            return "Sorry; that username is taken; please try another.";
        } else {
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user.getUsername()).set(user);
            return "SUCCESS: You have registered and logged in!";
        }
    }

    public String getUserDetails(String name, String password) throws InterruptedException, ExecutionException,NullPointerException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        if (document.exists()) {
            user = document.toObject(User.class);
            if (user.getPassword().equals(password)) {
                return "Success: Logged in";

            } else {
                return "Incorrect password";
            }
        } else {
            return "Invalid username";
        }
    }

    public String updateUserDetails(String username, String password, String email, String location, String bio, MultipartFile multipartFile) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        Map<String, Object> map = new HashMap<>();
        FileService fs = new FileService();
        String profilePic;
        if(!multipartFile.isEmpty()){
            profilePic=fs.upload(multipartFile);
            map.put("profilePic",profilePic);
        }
        if(!bio.equals(""))
            map.put("bio", bio);
        if(!email.equals(""))
            map.put("email", email);
        if(!password.equals(""))
            map.put("password", password);
        if(!location.equals(""))
            map.put("location",location);
        ApiFuture<WriteResult> collectionsApiFuture = documentReference.update(map);
//        return collectionsApiFuture.get().getUpdateTime().toString();
        //profile picture and song not yet added
        return "added Details"; //how to check if changes saved or error
    }


    public String updatePetDetails(String username,Pet pet) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        /*
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(pet.getPetOwnerUsername())
                .collection("pets").document(pet.getName());
        Map<String, Object> map = new HashMap<>();
        map.put("age", pet.getAge());
        map.put("breed", pet.getBreed());
        map.put("name", pet.getName());
        map.put("personality", pet.getPersonality());
        map.put("petOwnerUsername", pet.getPetOwnerUsername());
        map.put("relationshipStatus", pet.getRelationshipStatus());
        map.put("size", pet.getSize());
        ApiFuture<WriteResult> collectionsApiFuture = documentReference.update(map);*/
        ArrayList<Pet> tempPetList = new ArrayList<Pet>();

        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        //ArrayList<Pet> pets = null;

        if(!document.exists()) {
            return "Invalid username";
        }

        user = document.toObject(User.class);
        tempPetList = user.getPetList();
        int index=-1;
        for(int i = 0; i<tempPetList.size();i++){
            if(tempPetList.get(i).getName().equals(pet.getName())){
                index = i;
            }
        }
        if(index==-1){
            return "ERROR: could not update pet.";
        }
        tempPetList.set(index,pet);
        //pets = document.toObject(PetDocument.class).pets;
        //pets.add(newPet);

        //Map<String, ArrayList> doc = new HashMap<>();
        Map<String, Object> docData = new HashMap<>();
        docData.put("petList", tempPetList);

        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(username).set(docData, SetOptions.merge());

        return ""; //how to check if changes saved or error
    }

    public String createPost(String username, String url, String comments) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        DocumentReference docRef = dbFirestore.collection("posts").document("info");
        Integer totalPosts;
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            User user = document.toObject(User.class);
            int numPosts = user.getNumPosts();
            numPosts += 1;
            user.incrementPost();
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user.getUsername()).set(user);

            ApiFuture<Void> futureTransaction = dbFirestore.runTransaction(transaction -> {
                // retrieve document and increment population field
                DocumentSnapshot snapshot = transaction.get(docRef).get();
                //  PostInfo posts = snapshot.toObject(PostInfo);
                List<String> users = (List<String>) snapshot.get("user");
                List<Integer> posts = (List<Integer>) snapshot.get("num");
                //    totalPosts = posts.size();
                Post thisPost = new Post(posts.size(), url, comments, username);
                ApiFuture<WriteResult> collectionsApiFuture2 = dbFirestore.collection(COL_NAME).document(user.getUsername()).collection("posts").document(Integer.toString(user.getNumPosts())).set(thisPost);
                users.add(username);
                posts.add(user.getNumPosts());
                transaction.update(docRef, "user", users);
                transaction.update(docRef, "num", posts);
                return null;
            });

            return "Success: your post has been made!";

        } else {
            return "Failed to add post; please log in again/check your connection";

        }
    }
    /*
    public String updateUserDetails(User person) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(person.getName()).set(person);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }*/
    public String checkForPosts(String username) throws InterruptedException, ExecutionException{
        List<Post>initialList = getPosts(username);
        long start= System.currentTimeMillis();
        while(true){
            if(System.currentTimeMillis()-start>10000){
                return "";
            }
            Thread.sleep(3000);
            List<Post>newList = getPosts(username);
            if(newList.size()>initialList.size()){
                return "New posts!";
            }
        }
    }

    public List<Post> getPosts(String username) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("posts").document("info");
        //ApiFuture<DocumentSnapshot> future = docRef.get();
        //DocumentSnapshot snapshot = future.get();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future2 = documentReference.get();
        DocumentSnapshot document = future2.get();
        User user = null;
        //List<String> users1 = new ArrayList<String>();
        // List<Integer> posts1 = new ArrayList<Integer>();
        List<Post> returnPosts = new ArrayList<Post>();
        if (document.exists()) {
            DocumentSnapshot snapshot = docRef.get().get();
            //  PostInfo posts = snapshot.toObject(PostInfo);
            List<String> users = (List<String>) snapshot.get("user");
            List<Integer> posts = (List<Integer>) snapshot.get("num");
            user = document.toObject(User.class);
            List<Request> friendsInfo = user.getFriends();
            List<String> friends = new ArrayList<String>();
            for(int i = 0; i<friendsInfo.size();i++){
                friends.add(friendsInfo.get(i).user);
            }
            //  PostInfo posts = snapshot.toObject(PostInfo);
            // List<String> users = (List<String>) snapshot.get("user");
            //List<Integer> posts = (List<Integer>) snapshot.get("num");

            for (int j = posts.size() - 1; j >= 0; j--) {

                if (friends.contains(users.get(j)) || users.get(j).equals(username)) {
                    //   DocumentReference documentReference3 = dbFirestore.collection(COL_NAME).document(username).collection("posts").document("2");
                    DocumentReference documentReference3 = dbFirestore.collection(COL_NAME).document(users.get(j)).collection("posts").document(String.valueOf(posts.get(j)));
                    ApiFuture<DocumentSnapshot> future3 = documentReference3.get();
                    DocumentSnapshot document3 = future3.get();
                    returnPosts.add(document3.toObject(Post.class));

                    // returnPosts.add(new Post(j,"this",String.valueOf(posts.get(j)),users.get(j)));
                }

                //  returnPosts.add(new Post(1,"url","comment",username));
            }
            return returnPosts;
        } else {
            return returnPosts;
        }

    }

    public String sendFriendRequest(String username, String friend) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(friend);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        DocumentReference documentReference2 = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future2 = documentReference2.get();
        DocumentSnapshot document2 = future2.get();
        User user = null;
        User thisUser = null;
        if (document.exists()) {
            thisUser = document2.toObject(User.class);
            String pic = thisUser.getProfilePic();
            String bio = thisUser.getBio();
            user = document.toObject(User.class);
            user.addFriendRequest(new Request(username,pic,bio));
            ApiFuture<WriteResult> collectionsApiFuture1 = dbFirestore.collection(COL_NAME).document(friend).set(user);
            return "Sent friend request to " + friend;

        } else {
            return "HTTP Session Timed Out: please log in again.";
        }
    }

    public List<Request> getRequests(String username) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        List<Request> invalid = new ArrayList<Request>();
        if (document.exists()) {
            user = document.toObject(User.class);
            return user.getFriendRequests();
        } else {
            invalid.add(new Request("HTTP Session Timed Out; please log in again","",""));
            return invalid;
        }
    }

    public String acceptRequest(String username, String friend) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(friend);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        if (document.exists()) {
            user = document.toObject(User.class);
            // user.removeFriendRequest(username);
            String friendProfilePic = user.getProfilePic();
            String friendBio = user.getBio();
            DocumentReference documentReference1 = dbFirestore.collection(COL_NAME).document(username);
            ApiFuture<DocumentSnapshot> future1 = documentReference1.get();
            DocumentSnapshot document1 = future1.get();
            User user1 = null;
            if (document1.exists()) {
                user1 = document1.toObject(User.class);
                String myProfilePic = user1.getProfilePic();
                String myBio = user1.getBio();
                user1.removeFriendRequest(friend);
                user.addFriend(new Request(username,myProfilePic,myBio));
                user1.addFriend(new Request(friend,friendProfilePic,friendBio));
                ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(username).set(user1);
                ApiFuture<WriteResult> collectionsApiFuture1 = dbFirestore.collection(COL_NAME).document(friend).set(user);
                return "Accepted friend request from " + friend;
            } else {
                return "HTTP Session Timed Out: please log in again.";
            }
        } else {
            return "HTTP Session Timed Out: please log in again.";
        }
    }

    public String deleteUser(String name) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();
        return "Document with com.example.demo.User ID " + name + " has been deleted";
    }

    public String setUserSong(String username, String song) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Map<String, Object> docData = new HashMap<>();
        //docData.put("email", "test@gmail.com");
        //docData.put("password", "pwdtest");
        //docData.put("username", "songtest");
        docData.put("song", song);
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(username).set(docData, SetOptions.merge());
        return collectionsApiFuture.get().getUpdateTime().toString();
    }
    public String getUserSong(String username) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        if(document.exists()) {
            user = document.toObject(User.class);
            return user.getSong();
        }else {
            return "Invalid username";
        }
    }

    public String savePetDetails(String username, Pet newPet) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ArrayList<Pet> tempPetList = new ArrayList<Pet>();

        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        //ArrayList<Pet> pets = null;

        if(!document.exists()) {
            return "Invalid username";
        }

        user = document.toObject(User.class);
        tempPetList = user.getPetList();
        tempPetList.add(newPet);

        //pets = document.toObject(PetDocument.class).pets;
        //pets.add(newPet);

        //Map<String, ArrayList> doc = new HashMap<>();
        Map<String, Object> docData = new HashMap<>();
        docData.put("petList", tempPetList);

        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(username).set(docData, SetOptions.merge());

        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String getAllPetDetails(String username) throws InterruptedException, ExecutionException {
        return "dummy";
    }

}