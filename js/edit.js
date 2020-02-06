const form = document.getElementById('newContactForm');

var currentUser = localStorage.getItem('currentUser');
if (currentUser === null) {
    currentUser = 1; // Dev default
}

// Get form data from user to edit:
const contactID = localStorage.getItem('editID');

// Populate form with contact info
populateForm(contactID);



$('#submitEdit').click(function() {
    if (validateForm() === false) {
        return false;
    }

    const newUserData = {
        userID: currentUser,
        contactID: contactID.toString(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        phoneNumber: $('#phone').val(),
        address: $('#address').val(),
        birthday: $('#birthday').val()
    };

    console.log(JSON.stringify(newUserData));

    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/contact', {
        method: 'POST',
        body: JSON.stringify(newUserData)
    })
        .then(res => {
            return res.json();
        })
        .then(rjson => {
            // Clear form
            $('.form-control').val('');

            alert('User updated!');
            window.location = 'index.html';
        });

    $('#enableEdit').removeClass('hidden').show();
    $('#submitEdit').addClass('hidden');
    $('#cancelEdit').addClass('hidden');

    $('input')
        .addClass('form-control-plaintext text-light')
        .removeClass('form-control')
        .prop('readonly', true);
});

$('#enableEdit').click(function() {
    console.log('Edit');
    $('#enableEdit').addClass('hidden').hide();
    $('#submitEdit').removeClass('hidden');
    $('#cancelEdit').removeClass('hidden');

    $('input')
        .removeClass('form-control-plaintext text-light')
        .addClass('form-control')
        .prop('readonly', false);
});

$('#cancelEdit').click(function() {
    populateForm(contactID);

    $('#enableEdit').removeClass('hidden').show();
    $('#submitEdit').addClass('hidden');
    $('#cancelEdit').addClass('hidden');

    $('input')
        .addClass('form-control-plaintext text-light')
        .removeClass('form-control')
        .prop('readonly', true);
});

function populateForm(contactID) {
    const body = {
        userID: parseInt(currentUser),
        contactID: contactID
    };

    fetch(
        'https://cop4331group7api.azurewebsites.net/user/contacts/contact/get',
        {
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
        .then(res => {
            return res.json();
        })
        .then(cjson => {
            $('#firstName').val(cjson[0][2]);
            $('#lastName').val(cjson[0][3]);
            $('#phone').val(cjson[0][4]);
            $('#birthday').val(cjson[0][5]);
            $('#address').val(cjson[0][6]);

            const name = cjson[0][2] +  ' ' + cjson[0][3];
            console.log(name);

            $('#contactName').html(name);
            
        })
        .then( () => {
            // Display content
            $('main').hide().removeClass('hidden').fadeIn();
        });

}
