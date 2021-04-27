let name; // Creates a global variable that can be accessed by the petInfo function when printing out the owner's name
// Function to call user info to be printed out
function pullUserInfo() {
    console.log("Calling fetchUser function!");
    var userInfo;

    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        // dataType: ''
        success: function(response) {
            console.log("retrieved user object");
            console.log(response);

            const userInfo = response;
            var username = userInfo.displayName;
            name = userInfo.name;
            const profilePic = userInfo.profilePic;
            let bio = userInfo.bio;
            const location = userInfo.location;

            var userDiv = document.getElementById("UserContainer");
            // Checks if the return value is not null before printing it out
            document.getElementById("UserContainer").innerHTML =
                "<div class=\"userImage\">\n"+
                "    <img src=\"" + profilePic + "\" alt=\"" + name + "'s Profile Picture\">\n" +
                "</div>\n" +
                "<div class=\"userText\">\n" + "" +
                    "<p>" + username + "</p>\n" +
                    "<p>Name: " + name + "</p>\n"+
                    "<p>Biography: " + bio + "</p>" +
                    "<p>Location: " + location + "</p>\n" +
                "</div>\n" +
                "<br>";
            pullSongInfo(username);
        },
        error: function() {
            console.log("could not retrieve user data");
        }
    });

    return false;
}

// Function to get pet info
function pullPetInfo() {
    console.log("Calling pullPet function!");

    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        // dataType: ''
        success: function(response) {
            console.log("retrieved pet objects");
            console.log(response);
            const petsArray = response.petList;

            var petDiv = document.getElementById("row");
            if(petsArray.length === 0) {
                petDiv.innerHTML += "You have no pets! Add some to get started.";
            }
            else {
                document.getElementById("petHeader").innerHTML = name + "\'s Pets";
                for(let i = 0; i < petsArray.length; i++) {
                    // iterate through the array, and after every two pets, add a breakline for a new row
                    if(i > 0 && i % 2 === 1) {
                        // we need to add a breakline
                        petDiv.innerHTML += "<br>\n";
                    }
                    petDiv.innerHTML +=
                        "<div class=\"column\">" +
                        "    <div class=\"image\">\n" +
                        "        <img src=\"" + petsArray[i].pic + "\" alt=\"" + petsArray[i].name + "\">\n" +
                        "    </div>\n" +
                        "    <div class=\"text\">\n" +
                        "        <p>Name: " + petsArray[i].name + "</p>\n" +
                        "        <p>Bio: " + petsArray[i].bio + "</p>" +
                        "        <p>Age: " + petsArray[i].age + " years </p>\n" +
                        "        <p>Breed: " + petsArray[i].breed + "</p>\n" +
                        "        <p>Size: " + petsArray[i].size + "</p>\n" +
                        "        <p>Personality: " + petsArray[i].personality + "</p>\n" +
                        "        <p>Relationship status: " + petsArray[i].relationshipStatus + "</p>\n" +
                        "    </div>\n" +
                        "</div>";
                }
            }
        },
        error: function() {
            console.log("could not retrieve pet data");
        }
    });
    return false;
}

// Get the song info and set up the javascript play function
function pullSongInfo(username) {
    console.log("calling getSong!");
    console.log(username);
    // Map to connect the filenames from the servlet to the actual names of each song
    let songMap = new Map();
    songMap.set('Music/All You Need Is Love.mp3', 'All You Need Is Love - The Beatles');
    songMap.set('Music/Dog.mp3', 'Dog - Remo Drive');
    songMap.set('Music/Dog Days Are Over.mp3', 'Dog Days Are Over - Florence + The Machine');
    songMap.set('Music/Dynamite.mp3', 'Dynamite - BTS');
    songMap.set('Music/Loving Is Easy.mp3', 'Loving Is Easy - Rex Orange County');
    songMap.set('Music/Me & You Together Song.mp3', "Me & You Together Song - The 1975");
    songMap.set('Music/Mooo!.mp3', 'Mooo! - Doja Cat');
    songMap.set('Music/Watermelon Sugar.mp3', 'Watermelon Sugar - Harry Styles');
    songMap.set('Music/What\'s New Pussycat.mp3', 'What\'s New Pussycat - Tom Jones');

    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        // dataType: string representing the fileName
        success: function(response) {
            console.log("retrieved song object");
            console.log(response);
            var song = response.song;
            if(song === "Music/Default.mp3") {
                song = "No song chosen";
                document.getElementById("audio").innerHTML = song;
            }
            else {
                var songName = songMap.get(song);
                document.getElementById("audio").innerHTML =
                    "<audio id=\"song\" src=\"" + song + "\" preload=\"auto\">\n" +
                    "<p>If you are reading this, it is because your browser does not support the audio element.</p>\n" +
                    "</audio>\n" +
                    "<button class=\"button\" onclick=\"playPause()\">Chosen Song: " + songName + "</button>";
            }

        },
        error: function(jqXHR,exception) {
            console.log("could not retrieve song data");
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status === 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status === 500) {
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
            console.log('could not save details');
        }
    });
    return false;
}

/* Script to play the song */
function playPause() {
    var play = document.getElementById("song");
    return play.paused ? play.play() : play.pause();
}


/* *** Function for redirecting from nav bar *** */
// logs user out
function logout() {
    console.log("Logging user out");
    // added this - karen
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