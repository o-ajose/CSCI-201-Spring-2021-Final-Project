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
            const username = userInfo.username;
            name = userInfo.name;
            const profilePic = userInfo.profilePic;
            let bio = userInfo.bio;
            const location = userInfo.location;
            const song = userInfo.song;

            var userDiv = document.getElementById("UserContainer");
            // Checks if the return value is not null before printing it out
            document.getElementById("UserContainer").innerHTML =
                "<div class=\"userImage\">\n"+
                "    <img src=\"" + profilePic + "\" alt=\"" + name + "'s Profile Picture\">\n" +
                "</div>\n" +
                "<div class=\"userText\">\n";
            if(username !== "") {
                userDiv.innerHTML +=  "    <p>" + username + "</p>\n";
            }
            userDiv.innerHTML +=
                "    <p>Name: " + name + "</p>\n";
            if(bio !== "") {
                userDiv.innerHTML +=  "    <p>Biography: " + bio + "</p>";
            }
            userDiv.innerHTML +=
                "    <p>Location: " + location + "</p>\n" +
                "</div>\n" +
                "<br>";
        },
        error: function() {
            console.log("could not retrieve user data");
        }
    });

}

// Function to get pet info
function pullPetInfo() {
    console.log("Calling pullPet function!");
    var petsArray;

    $.ajax({
        type: 'POST',
        url: 'getAllPetDetails',
        // dataType: ''
        success: function(response) {
            console.log("retrived pet objects");
            console.log(response);
            const petsArray = response;

            document.getElementById("petHeader").innerHTML = name + "\'s Pets";

            var petDiv = document.getElementById("row");
            for(let i = 0; i < petsArray.length; i++) {
                // iterate through the array, and after every two pets, add a breakline for a new row
                if(i > 0 && i % 2 === 1) {
                    // we need to add a breakline
                    petDiv.innerHTML += "<br>\n";
                }
                petDiv.innerHTML +=
                    "<div class=\"column\">" +
                    "    <div class=\"image\">\n" +
                    "        <img src=\"" + petsArray[i].URL + "\" alt=\"" + petsArray[i].name + "\">\n" +
                    "    </div>\n" +
                    "    <div class=\"text\">\n" +
                    "        <p>Name: " + petsArray[i].name + "</p>\n" +
                    "        <p>Age: " + petsArray[i].age + " years </p>\n" +
                    "        <p>Breed: " + petsArray[i].breed + "</p>\n" +
                    "        <p>Size: " + petsArray[i].size + "</p>\n" +
                    "        <p>Personality: " + petsArray[i].personality + "</p>\n" +
                    "        <p>Relationship status: " + petsArray.relationshipStatus + "</p>\n" +
                    "    </div>\n" +
                    "</div>";
            }
        },
        error: function() {
            console.log("could not retrieve pet data");
        }
    });
}

// Get the song info and set up the javascript play function
function pullSongInfo() {
    console.log("calling getSong!");

    // Map to connect the filenames from the servlet to the actual names of each song
    let songMap = new Map();
    songMap.set('Music/All%20You%20Need%20Is%Love.mp3', 'All You Need Is Love - The Beatles');
    songMap.set('Music/Dog.mp3', 'Dog - Remo Drive');
    songMap.set('Music/Dog%20%Days%20Are%20Over.mp3', 'Dog Days Are Over - Florence + The Machine');
    songMap.set('Music/Dynamite.mp3', 'Dynamite - BTS');
    songMap.set('Music/Loving%20Is%20Easy.mp3', 'Loving Is Easy - Rex Orange County');
    songMap.set('Music/Me%20&%20You%20Together%20Song.mp3', "Me & You Together Song - The 1975");
    songMap.set('Music/Mooo!.mp3', 'Mooo! - Doja Cat');
    songMap.set('Music/Watermelon%20Sugar.mp3', 'Watermelon Sugar - Harry Styles');
    songMap.set('Music/What\'s%20New%20Pussycat.mp3', 'What\'s New Pussycat - Tom Jones');

    $.ajax({
        type: 'POST',
        url: 'getSong',
        // dataType: string representing the fileName
        success: function(response) {
            console.log("retrieved song object");
            console.log(response);
            const song = response.song;
            const songName = songMap.get(song);

            document.getElementById("audio").innerHTML =
                "<audio id=\"song\" src=\"" + song + "\" preload=\"auto\">\n" +
                "<p>If you are reading this, it is because your browser does not support the audio element.</p>\n" +
                "</audio>\n" +
                "<button class=\"button\" onclick=\"playPause()\">Chosen Song: " + songName + "</button>";
        },
        error: function() {
            console.log("could not retrieve song data");
        }
    });
}

/* Script to play the song */
function playPause() {
    var play = document.getElementById("song");
    return play.paused ? play.play() : play.pause();
}

/* TODO: button that checks if the user visiting the page is the owner of the page to see if the "AddFriend" button
*       or the "EditProfile" button should be displayed */
function setButton() {

}

/* *** Function for redirecting from nav bar *** */
// logs user out
function logout() {
    console.log("Logging user out");
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