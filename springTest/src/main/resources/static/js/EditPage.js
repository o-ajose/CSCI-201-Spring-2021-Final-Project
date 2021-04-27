let username;
let profilePic;
let bio;
let userLocation;
/* Function to get user info from servlet */
function pullUserInfo() {
    console.log("Calling get user info function");
    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        // dataType: ''
        success: function(response) {
            console.log("retrieved user object");
            console.log(response);

            var userInfo = response;
            var name = userInfo.name;
            username = userInfo.displayName;
            profilePic = userInfo.profilePic;
            userLocation = userInfo.location;
            bio = userInfo.bio;
            if(bio === "") {
                bio = "Tell us about yourself!";
            }
            let songMap = new Map(); // map that connects the song file to the actual name to be printed out
            songMap.set('Music/All You Need Is Love.mp3', 'All You Need Is Love - The Beatles');
            songMap.set('Music/Dog.mp3', 'Dog - Remo Drive');
            songMap.set('Music/Dog Days Are Over.mp3', 'Dog Days Are Over - Florence + The Machine');
            songMap.set('Music/Dynamite.mp3', 'Dynamite - BTS');
            songMap.set('Music/Loving Is Easy.mp3', 'Loving Is Easy - Rex Orange County');
            songMap.set('Music/Me & You Together Song.mp3', "Me & You Together Song - The 1975");
            songMap.set('Music/Mooo!.mp3', 'Mooo! - Doja Cat');
            songMap.set('Music/Watermelon Sugar.mp3', 'Watermelon Sugar - Harry Styles');
            songMap.set('Music/What\'s New Pussycat.mp3', 'What\'s New Pussycat - Tom Jones');

            var song = userInfo.song;
            if(song === "Music/Default.mp3") {
                song = "No song chosen";
            }
            else {
                song = songMap.get(song);
            }
            document.getElementById("inputPersonInfo").innerHTML =
                "<form class=\"EditPersonPage\" id=\"EditPersonPage\" name=\"EditPersonPage\" enctype=\"multipart/form-data\">\n" +
                "        <p>Change Profile Photo: </p>\n" +
                "        <div style=\"display: flex\">\n" +
                "            <label for=\"file\">Click Photo to Update Your Profile Picture! (No more than 1 MB) <img class=\"userImage\" src=\"" + profilePic + "\"></label>\n" +
                "        <input type=\"file\" id=\"file\" name=\"file\" accept=\"image/*\">\n" +
                "        </div>\n" +
                "        <br/>\n" +
                "        <fieldset class=\"fieldsetAutoWidth\" style=\"width: 40%;\">\n" +
                "            <p class=\"formfield\">\n" +
                "                <label for=\"bio\" class=\"alignTop\"> Bio</label>\n" +
                "                <textarea id=\"bio\" name=\"bio\" rows=\"3\" cols=\"50\" placeholder=\"" + bio + "\" ></textarea>\n" +
                "            </p>\n" +
                "            <hr style=\"size: 2px; width: 90%; color: black; float: left;\"> <br>\n" +
                "            <p style=\"font-size: medium\">Current Location: " + userLocation + "</p>" +
                "            <label for=\"location\">Location: </label>\n" +
                "            <select name=\"location\" id=\"location\">\n" +
                "                <option value=\"AL\">Alabama</option>\n" +
                "                <option value=\"AK\">Alaska</option>\n" +
                "                <option value=\"AZ\">Arizona</option>\n" +
                "                <option value=\"AR\">Arkansas</option>\n" +
                "                <option value=\"CA\">California</option>\n" +
                "                <option value=\"CO\">Colorado</option>\n" +
                "                <option value=\"CT\">Connecticut</option>\n" +
                "                <option value=\"DE\">Delaware</option>\n" +
                "                <option value=\"DC\">District Of Columbia</option>\n" +
                "                <option value=\"FL\">Florida</option>\n" +
                "                <option value=\"GA\">Georgia</option>\n" +
                "                <option value=\"HI\">Hawaii</option>\n" +
                "                <option value=\"ID\">Idaho</option>\n" +
                "                <option value=\"IL\">Illinois</option>\n" +
                "                <option value=\"IN\">Indiana</option>\n" +
                "                <option value=\"IA\">Iowa</option>\n" +
                "                <option value=\"KS\">Kansas</option>\n" +
                "                <option value=\"KY\">Kentucky</option>\n" +
                "                <option value=\"LA\">Louisiana</option>\n" +
                "                <option value=\"ME\">Maine</option>\n" +
                "                <option value=\"MD\">Maryland</option>\n" +
                "                <option value=\"MA\">Massachusetts</option>\n" +
                "                <option value=\"MI\">Michigan</option>\n" +
                "                <option value=\"MN\">Minnesota</option>\n" +
                "                <option value=\"MS\">Mississippi</option>\n" +
                "                <option value=\"MO\">Missouri</option>\n" +
                "                <option value=\"MT\">Montana</option>\n" +
                "                <option value=\"NE\">Nebraska</option>\n" +
                "                <option value=\"NV\">Nevada</option>\n" +
                "                <option value=\"NH\">New Hampshire</option>\n" +
                "                <option value=\"NJ\">New Jersey</option>\n" +
                "                <option value=\"NM\">New Mexico</option>\n" +
                "                <option value=\"NY\">New York</option>\n" +
                "                <option value=\"NC\">North Carolina</option>\n" +
                "                <option value=\"ND\">North Dakota</option>\n" +
                "                <option value=\"OH\">Ohio</option>\n" +
                "                <option value=\"OK\">Oklahoma</option>\n" +
                "                <option value=\"OR\">Oregon</option>\n" +
                "                <option value=\"PA\">Pennsylvania</option>\n" +
                "                <option value=\"RI\">Rhode Island</option>\n" +
                "                <option value=\"SC\">South Carolina</option>\n" +
                "                <option value=\"SD\">South Dakota</option>\n" +
                "                <option value=\"TN\">Tennessee</option>\n" +
                "                <option value=\"TX\">Texas</option>\n" +
                "                <option value=\"UT\">Utah</option>\n" +
                "                <option value=\"VT\">Vermont</option>\n" +
                "                <option value=\"VA\">Virginia</option>\n" +
                "                <option value=\"WA\">Washington</option>\n" +
                "                <option value=\"WV\">West Virginia</option>\n" +
                "                <option value=\"WI\">Wisconsin</option>\n" +
                "                <option value=\"WY\">Wyoming</option>\n" +
                "            </select>\n" +
                "            <br>\n" +
                "            <hr style=\"size: 2px; width: 90%; color: black; float: left;\"> <br>\n" +
                "            Email <input type=\'email\' name=\'email\' id=\'email\'/> <br/>\n" +
                "            <hr style=\"size: 2px; width: 90%; color: black; float: left;\"> <br>\n" +
                "            Password <input type=\"password\" name=\"password\" id=\'password\' /> <br />\n" +
                "        </fieldset>\n" +
                "        <br><br>\n" +
                "        <input class=\"button\" type=\"submit\" value=\"Save Changes\" onclick=\'updateUser()\'>\n" +
                "    </form>\n" +
                "    <br>\n" +
                // Created an extra form to set the song in order to call that servlet
                "    <form class=\'EditPersonPage\' name=\'updateSong\' >\n" +
                "        <p style=\"font-size: medium\">Current Chosen Song: " + song + "</p>\n" +
                "        <label for=\"song\">Update Your Song</label>\n" +
                "        <select name=\"song\" id=\"song\">\n" +
                "            <option value=\"Me & You Together Song\">Me & Together Song - The 1975</option>\n" +
                "            <option value=\"Mooo!\">Mooo! - Doja Cat </option>\n" +
                "            <option value=\"Dynamite\">Dynamite - BTS</option>\n" +
                "            <option value=\"Dog\">Dog - Remo Drive</option>\n" +
                "            <option value=\"All You Need Is Love\">All You Need is Love - The Beatles</option>\n" +
                "            <option value=\"Watermelon Sugar\">Watermelon Sugar - Harry Styles</option>\n" +
                "            <option value=\"Dog Days Are Over\">Dog Days Are Over - Florence + The Machine</option>\n" +
                "            <option value=\"What's New Pussycat?\">What's New Pussycat? - Tom Jones</option>\n" +
                "            <option value=\"Loving Is Easy\">Loving Is Easy - Rex Orange County</option>\n" +
                "        </select>\n" +
                "        <input class=\"button\" type=\"submit\" value=\"Save Song\" onclick=\'setSong()\'>\n" +
                "    </form><br><br><br><br>";
        },
        error: function() {
            console.log("Could not retrieve user data");
        }
    });
}
function updateUser() {
    console.log('Calling updateUser servlet');
    var form = $('#EditPersonPage')[0];
    // Create an FormData object
    if(document.getElementById("file").valueOf() === "") {
        document.getElementById("file").value = profilePic;
    }
    if(document.getElementById("bio").valueOf() === "") {
        document.getElementById("bio").value = bio;
    }
    if(document.getElementById("location").valueOf() === "") {
        document.getElementById("location").value = userLocation;
    }
    console.log("HERE");
    var data = new FormData(form);
    $.ajax({
        type: 'post',
        enctype: 'multipart/form-data',
        url: "updateUser",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(response) {
            console.log(response);
            alert('Saved user\'s details!');
            window.location.href='../ProfilePage.html'
        },
        error: function(jqXHR,exception){
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
}

function setSong() {
    let songMap = new Map(); // map that connects the actual name taken in by the form to the song file name
    songMap.set('All You Need Is Love', '/Music/All You Need Is Love.mp3');
    songMap.set('Dog', 'Music/Dog.mp3');
    songMap.set('Dog Days Are Over', 'Music/Dog Days Are Over.mp3');
    songMap.set('Dynamite', 'Music/Dynamite.mp3');
    songMap.set('Loving Is Easy', 'Music/Loving Is Easy.mp3');
    songMap.set("Me & You Together Song", 'Music/Me & You Together Song.mp3');
    songMap.set('Mooo!','Music/Mooo!.mp3');
    songMap.set('Watermelon Sugar', 'Music/Watermelon Sugar.mp3');
    songMap.set('What\'s New Pussycat', 'Music/What\'s New Pussycat.mp3');

    var songName = document.updateSong.song.value;
    console.log(songName);
    var songFile = songMap.get(songName);
    console.log(songFile);
    console.log(username);
    console.log("Calling setSong!");
    $.ajax({
        method: "POST",
        url: "setSong",
        data: {
            username: username,
            song: songFile
        },
        success: function(response) {
            console.log(response);
            console.log('set song!');
            alert('Set song!');
            window.location.href='../ProfilePage.html'
        },
        error:function(jqXHR,exception){
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
        console.log('youre a dumbass');
        }
    });
}
/* *** Functions for nav bar redirections *** */
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
function getFeed() {
    // load user's name and image and posts
    $.ajax({
        type: 'POST',
        url:'fetchUserProfile',
        success: function(response) {
            console.log(response);
            // set up user's profile pic
            document.getElementById("bigProfilePic").src = response.profilePic;
            // set up user's username
            document.getElementById("userBtn").innerHTML = response.username;
        }
    });
}

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