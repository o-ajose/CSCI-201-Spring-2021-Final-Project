var numPets = 0;
var name;
var age;
var breed;
var personality;
var petsArray;
var relationshipStatus;
var bio;
var size;
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
            petsArray = response.petList;
            if(petsArray.length === 0) {
                document.getElementById("row").innerHTML += "No pets added yet!";
                return false;
            }
            numPets = petsArray.length;
            name = petsArray[0].name;
            age = petsArray[0].age;
            size = petsArray[0].size;
            breed = petsArray[0].breed;
            personality = petsArray[0].personality;
            relationshipStatus = petsArray[0].relationshipStatus;
            bio = petsArray[0].bio;
            var petDiv = document.getElementById("row");
            /*
            var oldSel = $('.choosePet').get(0);
            for (i = 0; i < petsArray.length; i++)
            {
                var opt = document.createElement('option');

                opt.text = petsArray[i].name;
                opt.value = i;

                oldSel.add(opt, null);
            }
            */
            for (i = 0; i < petsArray.length; i++) {
                $('#choosePet').append($("<option></option>").attr("value", i).text(petsArray[i].name));
            }
            $('#choosePet').val(0);
            /*
            if(petsArray.length === 1) {
                document.getElementById("addPet").style.display = "none";
            }*/
            for(let i = 0; i < 1; i++) {
                petDiv.innerHTML =
                    "<div class=\"column\" id=\'pet" + (i+1) + "\'>\n" +
                    "    <p>Change " + petsArray[i].name + "\'s Profile Photo: </p>\n" +
                    "    <div style=\"display: flex\">\n" +
                    "        <label for=\"pic\"><img class=\"userImage\" src=\"" + petsArray[i].pic + "\"> No more than 1 MB</label>\n" +
                    "        <input type=\"file\" id=\"pic\" name=\"pic\" accept=\"image/*\">\n" +
                    "    </div>\n" +
                    "    <br/>\n" +
                    "    Name <input type=\"text\" name=\"name\" value=\'" + petsArray[i].name + "\' placeholder=\"" + petsArray[i].name + "\" required/> <br>\n" +
                    "    Age (only enter the number) <input type=\"number\" name=\"age\" placeholder=\"" + petsArray[i].age + " years\"/> <br>\n" +
                    "    <label for=\"size\">Size</label>\n" +
                    "    <select name=\"size\" id=\"size\">\n" +
                    "        <option value=\"small\">Small </option>\n" +
                    "        <option value=\"medium\">Medium</option>\n" +
                    "        <option value=\"large\">Large </option>\n" +
                    "     </select><br>\n" +
                    "     Breed <input type=\'text\' name=\'breed\' placeholder=\"" + petsArray[i].breed + "\"/> <br>\n" +
                    "    <p class=\"formfield\">\n" +
                    "        <label for=\"personality\" class=\"alignTop\"> Personality</label>\n" +
                    "        <textarea id=\"personality\" name=\"personality\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].personality + "\"></textarea>\n" +
                    "    </p>\n" +
                    "    <p class=\"formfield\">\n" +
                    "        <label for=\"relationshipStatus\" style=\"height: 50px;\"> Relationship Status</label>\n" +
                    "        <textarea id=\"relationshipStatus\" name=\"relationshipStatus\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].relationshipStatus + "\"></textarea>\n" +
                    "    </p>\n" +
                    "    <p class=\"formfield\">\n" +
                    "        <label for=\"bio1\" style=\"height: 50px;\"> Bio</label>\n" +
                    "        <textarea id=\"bio1\" name=\"bio1\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].bio + "\"></textarea>\n" +
                    "    </p>\n" +
                    "</div>";
            }
        },
        error: function() {
            console.log("could not retrieve pet data");
        }
    });
    return false;
}
function updateForm(){
    var petDiv = document.getElementById("row");
    var i = $('#choosePet').val();
    petDiv.innerHTML =
        "<div class=\"column\" id=\'pet" + (i+1) + "\'>\n" +
        "    <p>Change " + petsArray[i].name + "\'s Profile Photo: </p>\n" +
        "    <div style=\"display: flex\">\n" +
        "        <label for=\"pic\"><img class=\"userImage\" src=\"" + petsArray[i].pic + "\"> No more than 1 MB</label>\n" +
        "        <input type=\"file\" id=\"pic\" name=\"pic\" accept=\"image/*\">\n" +
        "    </div>\n" +
        "    <br/>\n" +
        "    Name <input type=\"text\" name=\"name\" value=\'" + petsArray[i].name + "\' placeholder=\"" + petsArray[i].name + "\" required/> <br>\n" +
        "    Age (only enter the number) <input type=\"number\" name=\"age\" placeholder=\"" + petsArray[i].age + " years\"/> <br>\n" +
        "    <label for=\"size\">Size</label>\n" +
        "    <select name=\"size\" id=\"size\">\n" +
        "        <option value=\"small\">Small </option>\n" +
        "        <option value=\"medium\">Medium</option>\n" +
        "        <option value=\"large\">Large </option>\n" +
        "     </select><br>\n" +
        "     Breed <input type=\'text\' name=\'breed\' placeholder=\"" + petsArray[i].breed + "\"/> <br>\n" +
        "    <p class=\"formfield\">\n" +
        "        <label for=\"personality\" class=\"alignTop\"> Personality</label>\n" +
        "        <textarea id=\"personality\" name=\"personality\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].personality + "\"></textarea>\n" +
        "    </p>\n" +
        "    <p class=\"formfield\">\n" +
        "        <label for=\"relationshipStatus\" style=\"height: 50px;\"> Relationship Status</label>\n" +
        "        <textarea id=\"relationshipStatus\" name=\"relationshipStatus\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].relationshipStatus + "\"></textarea>\n" +
        "    </p>\n" +
        "    <p class=\"formfield\">\n" +
        "        <label for=\"bio1\" style=\"height: 50px;\"> Bio</label>\n" +
        "        <textarea id=\"bio1\" name=\"bio1\" rows=\"3\" cols=\"50\" placeholder=\"" + petsArray[i].bio + "\"></textarea>\n" +
        "    </p>\n" +
        "</div>";
}

// Function to update the pets
function updatePets() {
    console.log("Calling updatePets function!");
    var form = $('#updatePets')[0];
    var data = new FormData(form);

    console.log(data);
    // add in formData function and update the ID of bio1 in the form
    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: 'updatePet',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(response) {
            console.log(response);
            console.log('Saved pet details!');
            alert('Saved pet details!');
            window.location.href = "ProfilePage.html";
        },
        error: function() {
            console.log("Error found, could not save pet");
        }
    });
    /*for(let i =0; i< numPets; i++) {
        // gets the data within that id and creates an object that updatePets can understand
        var nameID = 'name' + (i+1);
        var ageID = 'age' + (i+1);
        var breedID = 'breed' + (i+1);
        var sizeID = 'size' + (i+1);
        var relationshipStatusID = 'relationshipStatus' + (i+1);
        var personalityID = 'personality' + (i+1);
        var petPic = 'pet' + (i+1) + 'Avi';
        var bio = 'bio' + (i+2);
        var pet = {
            name: document.getElementById(nameID).valueOf(),
            age: document.getElementById(ageID).valueOf(),
            breed: document.getElementById(breedID).valueOf(),
            size: document.getElementById(sizeID).valueOf(),
            relationshipStatus: document.getElementById(relationshipStatusID).valueOf(),
            personality: document.getElementById(personalityID).valueOf(),
            profilePic: document.getElementById(petPic).valueOf(),
            bio: document.getElementById(bio).valueOf()
        };
        updatePet(pet); // calls update Pet on that object to send over pets one at a time

        console.log(pet);

    }
    window.location.href = '../ProfilePage.html'; */
}

function updatePet(dataObj) {
    $.ajax({
        // dataForm
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
    console.log("Calling create pet!");
    var form = $('#addNewPet')[0];
    var data = new FormData(form);
    console.log(data);
    // add in formData function and update the ID of bio1 in the form
    $.ajax({
        type: 'POST',
        enctype: 'multipart/form-data',
        url: 'createPet',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(response) {
            console.log(response);
            console.log('Saved new pet!');
            window.location.href = "ProfilePage.html";
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
    $('#newPetInfo').show();
  //  const newInputBox = document.getElementById("newPetInfo").innerHTML.toString();
    /*
    document.getElementById("Pet").innerHTML += newInputBox;

    document.getElementById("addPet").style.display = "none";
    document.getElementById("updatePets").style.display = "none";
    document.getElementById("Edit").style.display="block";

     */

}

/* *** Functions for redirecting from navBar **/
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
    $('#newPetInfo').hide();
}

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
