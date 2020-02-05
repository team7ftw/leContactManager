const form = document.getElementById('newContactForm');

var currentUser = localStorage.getItem('currentUser');
if (currentUser === null) {
    currentUser = 1; // Dev default
}

// Get form data from user to edit:
const contactID = localStorage.getItem('editID');

// Populate form with contact info
populateForm(contactID);

form.onsubmit = e => {
    // Prevent page refresh
    e.preventDefault();

    if(validateForm() === false) {
        return false;
    }

    const newUserData = {
        "userID": currentUser,
        "contactID": contactID.toString(),
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "phoneNumber": $("#phone").val(),
        "address": $("#address").val(),
        "birthday": $("#birthday").val()
    }

    console.log(JSON.stringify(newUserData));

    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/contact', {
        method: 'POST',
        body: JSON.stringify(newUserData)
    }).then( (res) => {
        return res.json();
    }).then( (rjson) => {
        // Clear form
        $(".form-control").val('');

        alert('User updated!');
        window.location = 'index.html';
    });
}

// GET request at url
async function getData(url) {
    const res = await fetch(url);
    return await res.json();
}

// PUT request at url with args object
async function putData(url, args) {
    const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(args),
    });
    return await res.json();
}

function populateForm(contactID) {
    const body = {
        'userID': parseInt(currentUser),
        'contactID': contactID
    }

    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/contact/get', {
        method: 'POST',
        body: JSON.stringify(body)
    }).then(res => {
        return res.json();
    }).then(cjson => {
        $("#firstName").val(cjson[0][2]);
        $('#lastName').val(cjson[0][3]);
        $('#phone').val(cjson[0][4]);
        $('#birthday').val(cjson[0][5]);
        $('#address').val(cjson[0][6]);
    });

}