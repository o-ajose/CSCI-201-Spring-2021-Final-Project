
/* Function to get user info from servlet */
function pullUserInfo() {
    console.log("Calling get user info function");

    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        // dataType: '' todo: figure out what is being returned in case response doesn't handle it correctly
        success: function(response) {
            console.log("retrieved user object");
            console.log(response);

            var userInfo = response;
            var name = userInfo.name;
            var profilePic = userInfo.profilePic;
            var bio = userInfo.bio;
            if(bio === "") {
                bio = "Tell us about yourself!";
            }
            let songMap = new Map(); // map that connects the song file to the actual name to be printed out
            songMap.set('Music/All%20You%20Need%20Is%Love.mp3', 'All You Need Is Love - The Beatles');
            songMap.set('Music/Dog.mp3', 'Dog - Remo Drive');
            songMap.set('Music/Dog%20%Days%20Are%20Over.mp3', 'Dog Days Are Over - Florence + The Machine');
            songMap.set('Music/Dynamite.mp3', 'Dynamite - BTS');
            songMap.set('Music/Loving%20Is%20Easy.mp3', 'Loving Is Easy - Rex Orange County');
            songMap.set('Music/Me%20&%20You%20Together%20Song.mp3', "Me & You Together Song - The 1975");
            songMap.set('Music/Mooo!.mp3', 'Mooo! - Doja Cat');
            songMap.set('Music/Watermelon%20Sugar.mp3', 'Watermelon Sugar - Harry Styles');
            songMap.set('Music/What\'s%20New%20Pussycat.mp3', 'What\'s New Pussycat - Tom Jones');

            var song = songMap.get(userInfo.song);
            document.getElementById("inputPersonInfo").innerHTML =
                "<form class=\"EditPersonPage\" name=\"EditPersonPage\" action=\"/updateUser\" method=\"post\">\n" +
                "        <p>Change Profile Photo: </p>\n" +
                "        <div style=\"display: flex\">\n" +
                "            <label for=\"avi\"><img class=\"userImage\" src=\"" + profilePic + "\"></label>\n" +
                "            <input style=\"display: none;\" type=\"file\" id=\"avi\" name=\"avi\" accept=\"image/*\">\n" +
                "        </div>\n" +
                "        <br/>\n" +
                "        <fieldset class=\"fieldsetAutoWidth\" style=\"width: 40%;\">\n" +
                "            Name <input type=\"text\" name=\"name\" placeholder=\"" + name + "\" /> <br />\n" +
                "            <hr style=\"size: 2px; width: 90%; color: black; float: left;\"> <br>\n" +
                "            <p class=\"formfield\">\n" +
                "                <label for=\"bio\" class=\"alignTop\"> Bio</label>\n" +
                "                <textarea id=\"bio\" name=\"bio\" rows=\"3\" cols=\"50\" placeholder=\"" + bio + "\" ></textarea>\n" +
                "            </p>\n" +
                "            <hr style=\"size: 2px; width: 90%; color: black; float: left;\"> <br>\n" +
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
                "            <br/>\n" +
                "            <hr style=\"size: 2px; width: 90%; color: black; float: left;\"> <br>\n" +
                "            Password <input type=\"password\" name=\"password\" /> <br />\n" +
                "        </fieldset>\n" +
                "        <br><br>\n" +
                "        <input class=\"button\" type=\"submit\" value=\"Save Changes\">\n" +
                "    </form>\n" +
                "    <br>\n" +
                // Created an extra form to set the song in order to call that servlet
                "    <form class='EditPersonPage' name='updateSong' action='/setSong' method='post'>\n" +
                "        <p style=\"font-size: medium\">Current Chosen Song: " + song + "</p>\n" +
                "        <label for=\"song\">Update Your Song</label>\n" +
                "        <select name=\"song\" id=\"song\">\n" +
                "            <option value=\"Who Let the Dogs Out\">Who Let the\n" +
                "                Dogs Out? - Baha Men</option>\n" +
                "            <option value=\"Me & You Together Song\">Me & Together Song - The 1975</option>\n" +
                "            <option value=\"Mooo!\">Mooo! - Doja Cat </option>\n" +
                "            <option value=\"Dynamite\">Dynamite - BTS</option>\n" +
                "            <option value=\"Dog\">Dog - Remo Drive</option>\n" +
                "            <option value=\"All You Need Is Love\">All You Need is Love - The Beatles</option>\n" +
                "            <option value=\"Watermelon Sugar\">Watermelon Sugar - Harry Styles</option>\n" +
                "            <option value=\"Dog Days Are Over\">Dog Days Are Over - Florence + The Machine</option>\n" +
                "            <option value=\"Essence\">Essence - Wizkid (Feat. Tems)</option>\n" +
                "            <option value=\"What's New Pussycat?\">What's New Pussycat? - Tom Jones</option>\n" +
                "            <option value=\"Loving Is Easy\">Loving Is Easy - Rex Orange County</option>\n" +
                "        </select>\n" +
                "        <input class=\"button\" type=\"submit\" value=\"Save New Song\"\n" +
                "    </form>";

        },
        error: function() {
            console.log("Could not retrieve user data");
        }
    });
}
