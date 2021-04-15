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
    var username;
    // will send username as input to servlet and expect an array of json

}

// waiting for servlet
function post() {
    var username;
    var email;
}