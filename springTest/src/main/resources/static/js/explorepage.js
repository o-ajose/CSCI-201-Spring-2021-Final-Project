// when user gets to explore page
function getExplorePage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username != "guest"){

        $.ajax({
            type: 'POST',
            url: 'fetchUserProfile',
            success: function (response) {
                console.log(response);
                // set up user's profile pic
                document.getElementById("bigProfilePic").src = response.profilePic;
                // set up user's username
                document.getElementById("userBtn").innerHTML = response.username;

                // load all the posts in explore page
                noFilterExplorePage();
            }
        });
    }else{
        // set up user's username
        document.getElementById("userBtn").innerHTML = "<div style='color:black;'>" + "Log In" + "</div>";
        noFilterExplorePage();
    }
}

// logs user out
function logout() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        alert("Make an account to be able to logout!");
    }else{
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
}

// redirects to account page
function loginOrProfilePage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        location.href = "loginpage.html"
    } else{
        console.log("Redirecting to account page");
        location.href = "ProfilePage.html";
    }
}

// nav bar redirects to different pages
function goToFriends() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        alert("Make an account to be able to see your friends");
    }else{
        console.log("Redirecting to friends page");
        location.href = "friendsPage.html";
    }

}
// nav bar redirects to different pages
function goToExplore() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    console.log("Redirecting to explore page");
    location.href = "explorepage.html?username=" + username;
}
// nav bar redirects to different pages
function goToFeed() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        alert("Make an account to be get access to your own feed page!");
    }else{
        console.log("Redirecting to feed page");
        location.href = "feedpage.html";
    }

}


function connectFriend(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        alert("You must be logged-in to connect with friends. Make an account now!");
    }else{
        var friend = $('#friend').html();
        console.log(friend);
        $.ajax({
            url: "requestFriend",
            type: "POST",
            data: {"friend": friend},
            success: function (response) {
                alert(response);
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
            }
        });
    }
}

function clearPosts(){
    var users = [];
    var location = $('#location').val();

    $.ajax({
        type: 'POST',
        url: 'noFilterExplorePage',
        data: {"location": location},
        success: function (response) {
            console.log("retrievedd json objects");
            console.log(response);
            users = response;
            for (var i = users.length - 1; i >= 0; i--) {
                // if we are on even number -> post1 style
                var petList = [];
                petList =users[i].petList;
                console.log(users[i].username);
                console.log(petList);
                if (i % 2 == 0) {
                    for (var j = 0; j < petList.length; j++) {

                        var pet = petList[j];
                        console.log(pet);
                        document.getElementById("row").innerHTML =
                            "<td>\n" +
                            "</td>";
                    }

                }
                // if we are on an odd number -> post2 style
                else {
                    for (var j= 0; j < petList.length; j++) {
                        var pet = petList[j];
                        console.log(pet);
                        document.getElementById("row").innerHTML =
                            "<td>\n" +
                            "</td>";
                    }
                }
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        }
    });
}

function noFilterExplorePage(){
    console.log("called noFilterExplorePage() function");
    var users = [];
    var location = $('#location').val();

    $.ajax({
        type: 'POST',
        url: 'noFilterExplorePage',
        data: {"location": location},
        success: function (response) {
            console.log("retrievedd json objects");
            console.log(response);
            users = response;
            for (var i = users.length - 1; i >= 0; i--) {
                // if we are on even number -> post1 style
                var petList = [];
                petList =users[i].petList;
                console.log(users[i].username);
                console.log(petList);
                if (i % 2 == 0) {
                    for (var j = 0; j < petList.length; j++) {

                        var pet = petList[j];
                        console.log(pet);
                        document.getElementById("row").innerHTML =
                            "<td>\n" +
                            "<div class=\"post1\">\n" +
                            "<div class=\"photos\">\n" +
                            "<img class=\"photo\" src=\"" + pet.pic + "\">\n" +
                            "</div>\n" +
                            "<p class=\"pet\">" + "Name: " + pet.name + "</p>\n" +
                            "<p class=\"owner\">\n" + "Owner: " + "</p>" +
                            "<p id='friend' class=\"owner\">" + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + pet.bio +
                            "</p>\n" +
                            "<button id='post1' type='button' onclick='connectFriend();'>Connect!</button>" +
                            "</div>\n" +
                            "</td>" + document.getElementById("row").innerHTML;
                    }

                }
                // if we are on an odd number -> post2 style
                else {
                    for (var j= 0; j < petList.length; j++) {
                        var pet = petList[j];
                        console.log(pet);
                        document.getElementById("row").innerHTML =
                            "<td>\n" +
                            "<div class=\"post2\">\n" +
                            "<div class=\"photos\">\n" +
                            "<img class=\"photo\" src=\"" + pet.pic + "\">\n" +
                            "</div>\n" +
                            "<p class=\"pet\">" + "Name: " + pet.name + "</p>\n" +
                            "<p class=\"owner\">\n" + "Owner: " + "</p>" +
                            "<p class= id='friend' class=\"owner\">" + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + pet.bio +
                            "</p>\n" +
                            "<button id='post2' type='button' onclick='connectFriend();'>Connect!</button>" +
                            "</div>\n" +
                            "</td>" + document.getElementById("row").innerHTML;
                    }
                }
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        }
    });
}

function getExplorePageFiltered() {
    clearPosts();
    console.log("called getExplorePageFiltered() function");
    var users = [];
    var location = $('#location').val();

    $.ajax({
        type: 'POST',
        url: 'getExplorePage',
        data: {"location": location},
        success: function (response) {
            console.log("retrieved json objects");
            console.log(response);
            users = response;
            for (var i = users.length - 1; i >= 0; i--) {
                // if we are on even number -> post1 style
                var petList = [];
                petList=users[i].petList;
                if (i % 2 == 0) {
                    for (var j = 0; j < petList.length; j++) {
                        var pet = petList[j];
                        document.getElementById("row").innerHTML =
                            "<td>\n" +
                            "<div class=\"post1\">\n" +
                            "<div class=\"photos\">\n" +
                            "<img class=\"photo\" src=\"" + pet.pic + "\">\n" +
                            "</div>\n" +
                            "<p class=\"pet\">" + "Name: " + pet.name + "</p>\n" +
                            "<p class=\"owner\">\n" + "Owner: " + "</p>" +
                            "<p id = 'friend' class=\"owner\">" + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + pet.bio +
                            "</p>\n" +
                            "<button id='post1' type='button' onclick='connectFriend();'>Connect!</button>" +
                            "</div>\n" +
                            "</td>" + document.getElementById("row").innerHTML;
                    }
                  //  var pet = petList;

                }
                // if we are on an odd number -> post2 style
                else {
                    for (var j = 0; j < petList.length; j++) {
                        var pet = petList[j];
                        document.getElementById("row").innerHTML =
                            "<td>\n" +
                            "<div class=\"post2\">\n" +
                            "<div class=\"photos\">\n" +
                            "<img class=\"photo\" src=\"" + pet.pic + "\">\n" +
                            "</div>\n" +
                            "<p class=\"pet\">" + "Name: " + pet.name + "</p>\n" +
                            "<p class=\"owner\">\n" + "Owner: " + "</p>" +
                            "<p id = 'friend' class=\"owner\">" + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + pet.bio +
                            "</p>\n" +
                            "<button id='post2' type='button' onclick='connectFriend();'>Connect!</button>" +
                            "</div>\n" +
                            "</td>" + document.getElementById("row").innerHTML;
                    }
                }
            }
        },
        error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        }
    });
}
