// when user gets to explore page
function getExplorePage() {
    // TODO
    noFilterExplorePage();
}

// logs user out
function logout() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        alert("Make an account to access this function!");
    }else{
        console.log("Logging user out");
    }
}

// redirects to account page
function getAccountPage() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const username = urlParams.get('username');
    if(username === "guest"){
        alert("Make an account to access this function!");
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
        alert("Make an account to access this function!");
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
        alert("Make an account to access this function!");
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
        var friend = $('#friend').val();
        $.ajax({
            url: "requestFriend",
            type: "POST",
            data: {"friend": friend},
            success: function (response) {
                alert("Friend request sent to " + friend + "!");

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

// once user gets on feedpage or refreshes, get all the posts to be display
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
                            "<p id='friend' class=\"owner\">\n" + "Owner: " + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + "Breed: " + pet.bio +
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
                            "<p class= id='friend' \"owner\">\n" + "Owner: " + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + "Bio: " + pet.bio +
                            "</p>\n" +
                            "<button id='post2' type='button' onclick='displayConnectMessage();'>Connect!</button>" +
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
                            "<p id = 'friend' class=\"owner\">\n" + "Owner: " + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + "Breed: " + pet.bio +
                            "</p>\n" +
                            "<button id='post1' type='button' onclick='displayConnectMessage();'>Connect!</button>" +
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
                            "<p id = 'friend' class=\"owner\">\n" + "Owner: " + users[i].username + "</p>\n" +
                            "<p class=\"location\">\n" + "Location: " + users[i].location + "</p>\n" +
                            "<p class=\"breed\">\n" + "Breed: " + pet.breed + "</p>\n" +
                            "<p class=\"bio\">\n" + "Breed: " + pet.bio +
                            "</p>\n" +
                            "<button id='post2' type='button' onclick='displayConnectMessage();'>Connect!</button>" +
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
