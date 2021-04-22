// when user gets to feed page
function getFeed() {
    // load user's name and image
    // TODO
    // load posts
    getPosts();
}

// redirects to account page
function getAccountPage() {
    console.log("Redirecint go account page");
    location.href = "test.html";
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
function cancelFunc() {
    console.log("User cancel post");
    // put back the upload image option
    $("#uploadHeader").show();
    // inform user on how to change photo
    $("#instructions").html("Recommendation: Use high-quality.jpg files less than 10 MB.");
    // hide photo preview and remove uploaded file
    $("#previewHolder").hide();
    document.getElementById("file-upload").value = null;
    // clear the text description input
    document.getElementById("descript").value = null;
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
        //dataType: 'json',
        success: function(response) {
            console.log("retrieved json post objects");
            console.log(response);
            var posts = response;
            // reset newsfeed posts to be the original ones
            document.getElementById("row").innerHTML = "<td>\n" +
                "<div class=\"post1\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/alex.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">Alex Bruckhaus</p>\n" +
                "<p class=\"description\">\n" +
                "This is Snowball, a 7 year old (49 dog years) Bichon Frise. He got his license when he was 3 years old and is driving a fresh new Red Ferrari. He loves tirebiters because he can meet new friends and loves to go on long drives down the Pacific Coast Highway.\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>\n" +
                "<td>\n" +
                "<div class=\"post2\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/steven.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">Steven Alexander</p>\n" +
                "<p class=\"description\">\n" +
                "This is Oscar— a friendly black, white, and brown short-haired chihuahua. He is a belly rub-loving puppy who loves food, napping, and the occasional walk.\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>\n" +
                "<td>\n" +
                "<div class=\"post1\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/max.jpg\">\n" +
                "</div>\n" +
                "<p class=\"user\">Max Bacani</p>\n" +
                "<p class=\"description\">\n" +
                "Chillin' out on the beach with my dog Chonky! No one is cooler than this dog right here!!\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>\n" +
                "<td>\n" +
                "<div class=\"post2\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/karen.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">Karen Ly</p>\n" +
                "<p class=\"description\">\n" +
                "Today has been ruff, but I've been up coding this website the past week! It's paw-some right???\n" +
                "#living #staypawsitive #coder #dogs\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>\n" +
                "<td>\n" +
                "<div class=\"post1\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/allison.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">Allison Ohara</p>\n" +
                "<p class=\"description\">\n" +
                "My dog Bijou can only seem to lift one of her ears...\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>\n" +
                "<td>\n" +
                "<div class=\"post2\">\n" +
                "<div class=\"photos\">\n" +
                "<img class=\"photo\" src=\"images/karen.jpeg\">\n" +
                "</div>\n" +
                "<p class=\"user\">Oju Ajose</p>\n" +
                "<p class=\"description\">\n" +
                "Today has been ruff, but I've been up coding this website the past week! It's paw-some right???\n" +
                "#living #staypawsitive #coder #dogs\n" +
                "</p>\n" +
                "</div>\n" +
                "</td>";
            // append from old to new
            for (i = posts.length - 1; i >= 0; i--) {
                // if we are on even number -> post1 style
                if (i % 2 == 0) {
                    document.getElementById("row").innerHTML =
                        "<td>\n" +
                        "<div class=\"post1\">\n" +
                        "<div class=\"photos\">\n" +
                        "<img class=\"photo\" src=\"" + posts[i].URL + "\">\n" +
                        "</div>\n" +
                        "<p class=\"user\">" + posts[i].username + "</p>\n" +
                        "<p class=\"description\">\n" + posts[i].comments +
                        "</p>\n" +
                        "</div>\n" +
                        "</td>" + document.getElementById("row").innerHTML;
                }
                // if we are on an odd number -> post2 style
                else {
                    document.getElementById("row").innerHTML =
                        "<td>\n" +
                        "<div class=\"post2\">\n" +
                        "<div class=\"photos\">\n" +
                        "<img class=\"photo\" src=\"" + posts[i].URL + "\">\n" +
                        "</div>\n" +
                        "<p class=\"user\">" + posts[i].username + "</p>\n" +
                        "<p class=\"description\">\n" + posts[i].comments +
                        "</p>\n" +
                        "</div>\n" +
                        "</td>" + document.getElementById("row").innerHTML;
                }
            }
            // check if there are new posts from user's friend
            $.ajax({
                type: 'POST',
                url: 'areNewPosts',
                success: function (response) {
                    console.log(response);
                    // if received a response, then update by calling getposts
                    getPosts();
                }
            });
        }
    });
}

// sends user's file image and description
function createPost() {
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
    var form = $('#fileUploadForm')[0];

    // Create an FormData object
    var data = new FormData(form);
    // call servlet to put post into database
    $.ajax ({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "createPost",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(response) {
            alert(response);
            // hide the upload pop up and restart it by calling cancel
            cancelFunc();

            // call getPost to refresh for new posts
            getPosts();
        }
    });
}