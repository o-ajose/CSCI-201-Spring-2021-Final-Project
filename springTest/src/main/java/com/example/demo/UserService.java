package com.example.demo;

import com.example.demo.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    public static final String COL_NAME="users";

    public String saveUserDetails(User user) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user.getUsername()).set(user);

        return collectionsApiFuture.get().getUpdateTime().toString();
    }
    public String getUserDetails(String name,String password) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(name);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        if(document.exists()) {
            user = document.toObject(User.class);
            if(user.getPassword().equals(password)){
                return "Success: Logged in";

            }
            else{
                return "Incorrect password";
            }
        }else {
            return "Invalid username";
        }
    }

    public String createPost(String username,String url, String comments)throws InterruptedException, ExecutionException{
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        DocumentReference docRef = dbFirestore.collection("posts").document("info");
        Integer totalPosts;
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        if(document.exists()) {
            User user = document.toObject(User.class);
            int numPosts = user.getNumPosts();
            numPosts+=1;
            user.incrementPost();
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(user.getUsername()).set(user);

            ApiFuture<Void> futureTransaction = dbFirestore.runTransaction(transaction -> {
                // retrieve document and increment population field
                DocumentSnapshot snapshot = transaction.get(docRef).get();
                //  PostInfo posts = snapshot.toObject(PostInfo);
                List<String> users = (List<String>) snapshot.get("user");
                List<Integer> posts = (List<Integer>)snapshot.get("num");
            //    totalPosts = posts.size();
                Post thisPost = new Post(posts.size(),url,comments,username);
                ApiFuture<WriteResult> collectionsApiFuture2 = dbFirestore.collection(COL_NAME).document(user.getUsername()).collection("posts").document(Integer.toString(user.getNumPosts())).set(thisPost);
                users.add(username);
                posts.add(user.getNumPosts());
                transaction.update(docRef, "user", users);
                transaction.update(docRef,"num",posts);
                return null;
            });

            return "Success: your post has been made!";

        }else {
            return "Failed to add post; please log in again/check your connection";

        }
    }
    /*
    public String updateUserDetails(User person) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(person.getName()).set(person);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }*/

    public List<Post> getPosts(String username) throws InterruptedException, ExecutionException{
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
        if(document.exists()) {
            DocumentSnapshot snapshot = docRef.get().get();
                        //  PostInfo posts = snapshot.toObject(PostInfo);
                        List<String> users = (List<String>) snapshot.get("user");
                      List<Integer>  posts = (List<Integer>) snapshot.get("num");
            user = document.toObject(User.class);
            List<String>friends = user.getFriends();
            //  PostInfo posts = snapshot.toObject(PostInfo);
           // List<String> users = (List<String>) snapshot.get("user");
            //List<Integer> posts = (List<Integer>) snapshot.get("num");

            for (int j = posts.size() - 1; j >= 0; j--) {

                if(friends.contains(users.get(j))||users.get(j).equals(username)) {
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
        }
        else{
            return returnPosts;
        }

    }

    public String sendFriendRequest(String username, String friend) throws InterruptedException, ExecutionException{
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(friend);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        if(document.exists()) {
            user = document.toObject(User.class);
            user.addFriendRequest(username);
            ApiFuture<WriteResult> collectionsApiFuture1 = dbFirestore.collection(COL_NAME).document(friend).set(user);
            return "Sent friend request to "+friend;

        }
        else{
            return "HTTP Session Timed Out: please log in again.";
        }
    }

    public List<String> getRequests(String username) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(username);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        List<String> invalid = new ArrayList<>();
        if(document.exists()) {
            user = document.toObject(User.class);
            return user.getFriendRequests();
        }else {
            invalid.add("HTTP Session Timed Out; please log in again");
            return invalid;
        }
    }

    public String acceptRequest(String username, String friend) throws InterruptedException, ExecutionException{
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COL_NAME).document(friend);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;
        if(document.exists()) {
            user = document.toObject(User.class);
           // user.removeFriendRequest(username);
            user.addFriend(username);

            DocumentReference documentReference1 = dbFirestore.collection(COL_NAME).document(username);
            ApiFuture<DocumentSnapshot> future1 = documentReference1.get();
            DocumentSnapshot document1 = future1.get();
            User user1 = null;
            if(document1.exists()) {
                user1 = document1.toObject(User.class);
                user1.removeFriendRequest(friend);
                user1.addFriend(friend);
                ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection(COL_NAME).document(username).set(user1);
                ApiFuture<WriteResult> collectionsApiFuture1 = dbFirestore.collection(COL_NAME).document(friend).set(user);
                return "Accepted friend request from "+friend;
            }
            else{
                return "HTTP Session Timed Out: please log in again.";
            }
        }
        else{
            return "HTTP Session Timed Out: please log in again.";
        }
    }

    public String deleteUser(String name) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COL_NAME).document(name).delete();
        return "Document with com.example.demo.User ID "+name+" has been deleted";
    }} 