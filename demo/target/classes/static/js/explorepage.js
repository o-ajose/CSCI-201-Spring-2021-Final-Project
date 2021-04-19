// when user gets to feed page
function getFeed() {
    // load user's name and image
    // TODO
    // load posts
    getPosts();
}


function displayConnectMessage(){
    alert("You must be logged-in to connect. Make an account now!");
}

// once user gets on feedpage or refreshes, get all the posts to be display
function getPosts() {
    console.log("called get posts function...");
    var posts;
    // call get post servlets that returns json of array
    $.ajax ({
        type: 'POST',
        url: 'getPosts',
        dataType: 'json',
        success: function(response) {
            console.log("retrieved json post objects");
            posts = response;
        }
    });
    // sort the post objects from new to old (descending order of num key of json object)
    //posts.sort((a, b) => parseInt(b.num) - parseInt(a.num));

    /*
    for (i = 0; i < posts.length; i++) {
        // if we are on even number -> post1 style
        if (i % 2 == 0) {
            document.getElementById("row").innerHTML +=
                "<td>\n" +
                "<div class=\"post1\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"" + posts[i].URL + "\">\n" +
                "</div>\n" +
                "<p class=\"user\">" + posts[i].username + "</p>\n" +
                "<p class=\"description\">\n" + posts[i].comments +
                "</p>\n" +
                "</div>\n" +
                "</td>";
        }
        // if we are on an odd number -> post2 style
        else {
            document.getElementById("row").innerHTML +=
                "<td>\n" +
                "<div class=\"post2\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"" + posts[i].URL + "\">\n" +
                "</div>\n" +
                "<p class=\"user\">" + posts[i].username + "</p>\n" +
                "<p class=\"description\">\n" + posts[i].comments +
                "</p>\n" +
                "</div>\n" +
                "</td>";
        }
    }

     */

    // TEST: loop through row and continue appending posts (altering between post1 and post2 styles)
    for (i=0; i < 6; i++) {
        // if we are on even number -> post1 style
        if (i % 2 == 0) {
            document.getElementById("row").innerHTML +=
                "<td>\n" +
                "<div class=\"post1\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/dog1.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">USERNAME: </p>\n" +
                "<p class=\"user\">OWNER: </p>\n" +
                "<p class=\"user\">LOCATION: </p>\n" +
                "<p class=\"user\">BREED: </p>\n" +
                "<p class=\"description\">\n" +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                "</p>\n" +
                "<button id='post1' type='button' onclick='displayConnectMessage();'>Connect!</input>" +
                "</div>\n" +
                "</td>";
        }
        // elif we are on odd number -> post2 style
        else {
            document.getElementById("row").innerHTML +=
                "<td>\n" +
                "<div class=\"post2\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/dog3.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">USERNAME: </p>\n" +
                "<p class=\"user\">OWNER: </p>\n" +
                "<p class=\"user\">LOCATION: </p>\n" +
                "<p class=\"user\">BREED: </p>\n" +
                "<p class=\"description\">\n" +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                "</p>\n" +
                "<button type='button' onclick='displayConnectMessage();'>Connect!</button>" +
                "</div>\n" +
                "</td>";
        }
    }
}


