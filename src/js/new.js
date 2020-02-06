const form = document.getElementById('newContactForm');

var currentUser = localStorage.getItem('currentUser');
if (currentUser === null) {
    currentUser = 1; // Dev default
}

form.onsubmit = e => {
    // Prevent page refresh
    e.preventDefault();

    if (validateForm() === false) {
        return false;
    }

    const newUserData = {
        userID: currentUser.toString(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        phoneNumber: $('#phone').val(),
        address: $('#address').val(),
        birthday: $('#birthday').val()
    };

    // Clear form
    $('.form-control').val('');

    console.log(JSON.stringify(newUserData));

    putData(
        'https://cop4331group7api.azurewebsites.net/user/contacts/contact',
        newUserData
    ).then(res => {
        alert('User added!');
        console.log(res);
    });
};

// GET request at url
async function getData(url) {
    const res = await fetch(url);
    return await res.json();
}

// PUT request at url with args object
async function putData(url, args) {
    const res = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(args)
    });
    return await res.json();
}