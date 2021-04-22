// when friends page first load call the get friend requests
function loadFriendsPage() {
    // load user's name and image
    // TODO
    // load all the user's friend request
    getRequests();
}
// gets all the friend requests
function getRequests() {
    $.ajax({
        type: 'POST',
        url: 'getRequests',
        success: function(response) {
            console.log("received friend requests");
            console.log(response);
            var requests = response;
            // reset to empty table in div
            $("#requestsSpace").html("<table id=\"requests\"></table>");
            // fill in the table with row
            for (i = 0; i < requests.length; i++) {
                $("#requestsSpace").append(
                    "<tr>\n" +
                    "<div class=\"request\">\n" +
                    "<div class=\"userPic\">\n" +
                    "<span class=\"bigCircle\"><img class=\"profileImage\" src=\"" + requests[i].profilePic + "\"></span>\n" +
                    "</div>\n" +
                    "<div class=\"userInfo\">\n" +
                    "<h2 class=\"friendname\">" + requests[i].user + "</h2>\n" +
                    "<h4 class=\"bio\">Bio: " + requests[i].bio + "</h4>\n" +
                    "</div>\n" +
                    "<div class=\"options\">\n" +
                    "<button class=\"accept\" onclick=\"acceptFriend(" + requests[i].user + ")\">Accept</button>\n" +
                    "<button class=\"ignore\" onclick=\"ignoreFriend(" + requests[i].user + ")\">Ignore</button>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</tr>"
                )
            }
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
    }
    // else show the pop up since it is not yet shown
    else{
        console.log("making pop up visible");
        $("#popUp").show();
        $("#requestsSpace").hide();
    }
}

// accepts friend request
function acceptFriend(user) {

}
// ignores/declines friend request
function ignoreFriend(user) {

}
