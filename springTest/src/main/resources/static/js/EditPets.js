var numPets = 0;
// Function to get all pet details and place them accordingly on the page
function getPetDetails() {
    console.log("Calling pullPet function for updates!!");

    $.ajax({
        type: 'POST',
        url: 'fetchUserProfile',
        // dataType: ''
        success: function(response) {
            console.log("retrieved pet objects");
            console.log(response);
            const petsArray = response.petList;
            numPets = petsArray.length;
            var petDiv = document.getElementById("row");
            for(let i = 0; i < petsArray.length; i++) {
                petDiv.innerHTML +=
                    "<div class=\"column\" id=\'pet" + (i+1) + "\'>\n" +
                    "    <p>Change " + petsArray[i].name + "\'s Profile Photo: </p>\n" +
                    "    <div style=\"display: flex\">\n" +
                    "        <label for=\"pet" + (i+1) + "Avi\"><img class=\"userImage\" src=\"" + petsArray[i].URL + "\"></label>\n" +
                    "        <input style=\"display: none;\" type=\"file\" id=\"pet" + (i+1) + "Avi\" name=\"pet" + (i+1) + "Avi\" accept=\"image/*\">\n" +
                    "    </div>\n" +
                    "    <br/>\n" +
                    "    Name <input type=\"text\" name=\"name\" placeholder=\"" + petsArray[i].name + "\" REQUIRED/> <br>\n" +
                    "    Age <input type=\"text\" name=\"age\" placeholder=\"" + petsArray[i].age + " years\"/> <br>\n" +
                    "    <label for=\"size\">Size</label>\n" +
                    "    <select name=\"size\" id=\"size\">\n" +
                    "        <option value=\"small\">Small </option>\n" +
                    "        <option value=\"medium\">Medium</option>\n" +
                    "        <option value=\"large\">Large </option>\n" +
                    "     </select><br>\n" +
                    "     Breed <input type=\'text\' name=\'breed\' placeholder=\"" + petsArray[i].breed + "\" required/> <br>\n" +
                    "    <p class=\"formfield\">\n" +
                    "        <label for=\"personality" + (i+1) + "\" class=\"alignTop\"> Personality</label>\n" +
                    "        <textarea id=\"personality" + (i+1) + "\" name=\"personality" + (i+1) + "\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].personality + "\"></textarea>\n" +
                    "    </p>\n" +
                    "    <p class=\"formfield\">\n" +
                    "        <label for=\"relStatus" + (i+1) + "\" style=\"height: 50px;\"> Relationship Status</label>\n" +
                    "        <textarea id=\"relStatus" + (i+1) + "\" name=\"relStatus" + (i+1) + "\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].relationshipStatus + "\"></textarea>\n" +
                    "    </p>\n" +
                    "</div>\n" +
                    "<br>";
            }
        },
        error: function() {
            console.log("could not retrieve pet data");
        }
    });
    return false;
}

// Function to update the pets
function updatePets() {
    console.log("Calling updatePets function!");
    for(let i =0; i< numPets; i++) {
        // gets the data within that id and creates an object that updatePets can understand
        var nameID = 'name' + (i+1);
        var ageID = 'age' + (i+1);
        var breedID = 'breed' + (i+1);
        var sizeID = 'size' + (i+1);
        var relationshipStatusID = 'relationshipStatus' + (i+1);
        var personalityID = 'personality' + (i+1);
        var petPic = 'pet' + (i+1) + 'Avi';
        var pet = {
            name: document.getElementById(nameID).valueOf(),
            age: document.getElementById(ageID).valueOf(),
            breed: document.getElementById(breedID).valueOf(),
            size: document.getElementById(sizeID).valueOf(),
            relationshipStatus: document.getElementById(relationshipStatusID).valueOf(),
            personality: document.getElementById(personalityID).valueOf(),
            profilePic: document.getElementById(petPic).valueOf()
        };
        updatePet(pet); // calls update Pet on that object to send over pets one at a time

        console.log(pet);

    }
    window.location.href = '../ProfilePage.html';
}

function updatePet(dataObj) {
    $.ajax({
        type: 'POST',
        url: 'updatePet',
        contentType: 'application/json',
        data: dataObj,
        success: function() {
            var msg = 'Saved ' + dataObj.name + '\'s info!'
            console.log(msg);
        },
        error: function(response) {
            console.log(response);
        }
    });
}

function createPet() {
    console.log("Calling create pet!")

    $.ajax({
        type: 'POST',
        url: 'createPet',
        success: function(response) {
            console.log(response);
            console.log('Saved new pet!');
            window.location.href = '../ProfilePage.html';
        },
        error: function() {
            console.log("Error found, could not save pet");
        }
    });
    return false;
}
/* If the user tries to add a new pet, they can only update the pet and not also
        their other pets to save us a headache and time */
function createNewElement() {
    const newInputBox = document.getElementById("newPetInfo").innerHTML.toString();
    document.getElementById("Pet").innerHTML += newInputBox;

    document.getElementById("addPet").style.display = "none";
    document.getElementById("updatePets").style.display = "none";
    document.getElementById("Edit").style.display="block";

}

/* *** Functions for redirecting from navBar **/
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