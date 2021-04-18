// when user gets to feed page
function getFeed() {
    // load user's name and image
    // TODO
    // load posts
    getPosts();
}

// when user uploads image file, it will show preview
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
        // hide the upload button area
        $('#uploadHeader').hide();
        // show preview area
        $('#previewHolder').show();
        // inform user on how to change photo
        $('#instructions').html("Preview of uploaded image. To upload a different image," +
            " please press Cancel.")
    } else {
        alert('Please upload an image file.');
        $('#preview').attr('src', '');
    }
}

$(function(ready){
    $("#file-upload").change(function() {
        console.log("photo picked");
        readURL(this);
    });
});

function countCharacters() {
    // set up variables
    var textEntered, countRemaining, counter;
    // get the number of characters in the description box
    textEntered = document.getElementById("descript").value;
    // number left = number of characters - our max (280)
    counter = (280 - (textEntered.length));
    console.log(counter);
    countRemaining = document.getElementById("remaining");
    // update the character count on user's page
    countRemaining.innerHTML = "Characters remaining: " + counter;
}

$(function(){ // this will be called when the DOM is ready
    $('#descript').keyup(function() {
       countCharacters();
    });
});


// When the user clicks on <div>, open the popup and hide posts
function toggle() {
    $("#popUp").show();
    $("#postsSpace").hide();
}

// remove the create post pop up and show the posts
function cancel() {
    console.log("User cancel post");
    // put back the upload image option
    $("#uploadHeader").show();
    // inform user on how to change photo
    $("#instructions").html("Recommendation: Use high-quality.jpg files less than 10 MB.");
    // hide photo preview and remove uploaded file
    $("#previewHolder").hide();
    document.getElementById("file-upload").value = null;
    $("#popUp").hide();
    $("#postsSpace").show();
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
                "<img class=\"photo\" src=\"images/dog3.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">USERNAME</p>\n" +
                "<p class=\"description\">\n" +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>";
        }
    }
}

// sends user's file image and description
function post() {
    var file = document.getElementById("file-upload").files[0];
    var caption = document.getElementById("descript").value;
    // if image file is null, then alert user
    if (file == null) {
        alert("Please select a photo to upload!");
        return;
    }
    else {
        console.log("Image was selected");
    }
    // if caption is empty
    if (!caption || (caption == "")) {
        alert("Please add a caption!");
        return;
    }
    // call servlet to put post into database
    $.ajax ({
        type: 'POST',
        url: 'createPost',
        data: {
            file: file,
            comments: descript
        },
        success: function(response) {
            alert(response);
            // call getPost to refresh for new posts
            getPosts();
        }
    });

}

