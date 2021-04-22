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
    $("#popUp").show();
    $("#requestsSpace").hide();
}
