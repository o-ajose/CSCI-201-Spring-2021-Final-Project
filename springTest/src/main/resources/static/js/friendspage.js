// when friends page first load call the get friend requests
// gets user's profile pic and username and requests
function loadFriendsPage() {
    $.ajax({
        type: 'POST',
        url:'fetchUserProfile',
        success: function(response) {
            console.log(response);
            // set up user's profile pic
            document.getElementById("bigProfilePic").src = response.profilePic;
            // set up user's username
            document.getElementById("userBtn").innerHTML = response.username;
            $("#requestName").show();
            $("#friendsName").show();
            // load all the user's friend request
            getRequests();
            // load all user's friends
            getFriends();
        }
    });
}

// gets all the friend requests
function getRequests() {
    $.ajax({
        type: 'POST',
        url: 'getRequests',
        success: function(response) {
            console.log("received friend requests");
            $("#requestName").show();
            $("#friendsName").show();
            console.log(response);
            var requests = response;
            // reset to empty table in div
            $("#requestsSpace").html("<table id=\"requests\"></table>");
            // if there are no friend requests, alert user
            if (requests.length == 0) {
                alert("You don't have any friend requests right now!");
            }
            // fill in the table with row
            for (i = 0; i < requests.length; i++) {
                console.log("Entered loop");
                $("#requests").append(
                    "<tr>\n" + "<td>\n" +
                    "<div class=\"request\">\n" +
                    "<div class=\"userPic\">\n" +
                    "<span class=\"bigCircle\"><img class=\"profileImage\" src=\"" + requests[i].profilePic + "\"></span>\n" +
                    "</div>\n" +
                    "<div class=\"userInfo\">\n" +
                    "<h2 class=\"friendname\">" + requests[i].user + "</h2>\n" +
                    "<h4 class=\"bio\">Bio: " + requests[i].bio + "</h4>\n" +
                    "</div>\n" +
                    "<div class=\"options\">\n" +
                    "<button class=\"accept\" onclick=\"acceptFriend('" + requests[i].user + "')\">Accept</button>\n" +
                    "<button class=\"ignore\" onclick=\"ignoreFriend('" + requests[i].user + "')\">Ignore</button>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>"
                );
            }
        }
    });
}

// gets all friends
function getFriends() {
    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        success: function(response) {
            console.log("received friends");
            $("#requestName").show();
            $("#friendsName").show();
            console.log(response);
            var friends = response.friends; // array of user's friends
            // reset to empty table in div
            $("#friendsSpace").html("<table id=\"friends\"></table>");
            // fill in the table with row
            for (i = 0; i < friends.length; i++) {
                console.log("Entered loop");
                $("#friends").append(
                    "<tr>\n" + "<td>\n" +
                    "<div class=\"friend\">\n" +
                    "<div class=\"userPic\">\n" +
                    "<span class=\"bigCircle\"><img class=\"profileImage\" src=\"" + friends[i].profilePic + "\"></span>\n" +
                    "</div>\n" +
                    "<div class=\"userInfo2\">\n" +
                    "<h2 class=\"friendname\">" + friends[i].user + "</h2>\n" +
                    "<h4 class=\"bio\">Bio: " + friends[i].bio + "</h4>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</td>\n" +
                    "</tr>"
                );
            }
        }
    });
}

// logs user out
function logout() {
    console.log("Logging user out");
    $.ajax({
        type: 'POST',
        url: 'logout',
        success: function(response) {
            alert(response); // tell user they logged out
            // redirect to login page
            location.href = "loginpage.html";
        }
    });
}

// redirects to account page
function getAccountPage() {
    console.log("Redirecting to account page");
    location.href = "ProfilePage.html";
}
// nav bar redirects to different pages
function goToFriends() {
    console.log("Redirecting to friends page");
    location.href = "friendsPage.html";
}
// nav bar redirects to different pages
function goToExplore() {
    console.log("Redirecting to explore page");
    location.href = "explorepage.html";
}
// nav bar redirects to different pages
function goToFeed() {
    console.log("Redirecting to explore page");
    location.href = "feedpage.html";
}

// When the user clicks on add friend option, open the popup and hide requests
function toggle() {
    // if the pop up is already showing, then hide it
    if($("#popUp").is(":visible")) {
        console.log("making pop up invisible");
        $("#popUp").hide();
        $("#requestsSpace").show();
        $("#requestName").show();
        $("#friendsSpace").show();
        $("#friendsName").show();
    }
    // else show the pop up since it is not yet shown
    else{
        console.log("making pop up visible");
        $("#popUp").show();
        $("#requestsSpace").hide();
        $("#requestName").hide();
        $("#friendsSpace").hide();
        $("#friendsName").hide();
    }
}

// accepts friend request
function acceptFriend(user) {
    $.ajax({
        type: 'POST',
        data: {
            "friend": user
        },
        url: 'acceptFriendRequest',
        success: function(response) {
            console.log(response);
            alert(response);
            // get friend requests again
            getRequests();
            // get friends again
            getFriends();
        }
    });
}
// ignores/declines friend request
function ignoreFriend(user) {
    $.ajax({
        type: 'POST',
        data: {
            "friend": user
        },
        url: 'rejectFriendRequest',
        success: function(response) {
            console.log(response);
            alert(response);
            // get friend requests again
            getRequests();
            // get friends again
            getFriends();
        }
    });
}

// resets inputs of friend request
function cancelRequest() {
    // reset the value in text area
    document.getElementById("userInput").value = null;
    // hide the pop up
    $("#popUp").hide();
    // get freshly fetched friend requests
    getRequests();
    // get freshly fetched friends
    getFriends();
    $("#requestsSpace").show();
    $("#friendsSpace").show();
}
// send the friend request to try to add a friend
function sendRequest() {
    var username = document.getElementById("userInput").value;
    console.log("Trying to add: " + username);
    // if the value of user input is empty, alert
    if (username == "") {
        alert("Please enter a username!");
    }
    // else try to send the request to servlet
    else {
        $.ajax({
            type: 'POST',
            data: {
                friend:username
            },
            url: 'requestFriend',
            success: function(response) {
                // if request was a success, alert them and close pop up and fetch friend requests
                // else alert user it was not a success
                console.log(response);
                alert(response);
                // reset values and hide pop up by calling cancel
                cancelRequest();
            }
        });
    }
}
