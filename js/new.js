const form = document.getElementById('newContactForm');

// Hide hidden toasts so they don't cover UI
$('.toast').hide();
$('.toast').on('hidden.bs.toast', function() {
    $('.toast').hide(); 
 });

var currentUser = localStorage.getItem('currentUser');
if (currentUser === null) {
    currentUser = 1; // Dev default
}

$('document').ready(function() {
    $('main').hide().removeClass('hidden').fadeIn();
});

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

    putData(
        'https://cop4331group7api.azurewebsites.net/user/contacts/contact',
        newUserData
    ).then( () => {
        $('#successToast').show().toast("show");
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
