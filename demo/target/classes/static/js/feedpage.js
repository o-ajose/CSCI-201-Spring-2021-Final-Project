// When the user clicks on <div>, open the popup and hide posts
function toggle() {
    $("#popUp").show();
    $("#postsSpace").hide();
}

// remove the create post pop up and show the posts
function cancel() {
    $("#popUp").hide();
    $("#postsSpace").show();
}

// once user gets on feedpage or refreshes, get all the posts to be display
function getPosts() {
    console.log("posting...");
    var username;
    // will send username as input to servlet and expect an array of json

    // loop through row and continue appending posts (altering between post1 and post2 styles)
    for (i= 0; i < 6; i++) {
        // if we are on even number -> post1 style
        if (i % 2 == 0) {
            document.getElementById("row").innerHTML +=
                "<td>\n" +
                "<div class=\"post1\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/dog1.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">USERNAME</p>\n" +
                "<p class=\"description\">\n" +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>";
        }
        // elif we are on odd number -> post2 style
        else {
            document.getElementById("row").innerHTML +=
                "<td>\n" +
                "<div class=\"post2\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/dog2.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">USERNAME</p>\n" +
                "<p class=\"description\">\n" +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>"
        }
    }

}

// waiting for servlet
function post() {
    var username;
    var email;
}