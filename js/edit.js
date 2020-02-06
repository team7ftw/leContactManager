// Get form data from user to edit:
const contactID = localStorage.getItem('editID');

fetch('https://cop4331group7api.azurewebsites.net/user/contacts/contact/photo/get', {
    method: 'POST',
    body: JSON.stringify({
        'contactID': contactID
    })
}).then(res => {
    return res.blob();
}).then(myBlob => {
    $('#avatar').css('background', 'url(' + URL.createObjectURL(myBlob) + ') 50% 50% no-repeat')
        .css('background-size', '120px');
});

// Page elements
const form = document.getElementById('newContactForm');
const birthdateForm = $('#birthday');

// Global vars
var birthdayDigits = $('#birthday').val();
var currentUser = localStorage.getItem('currentUser');
if (currentUser === null) {
    currentUser = 1; // Dev default
}



// Hide hidden toasts so they don't cover UI
$('.toast').hide();
$('.toast').on('hidden.bs.toast', function() {
    $('.toast').hide(); 
 });

// Populate form with contact info
populateForm(contactID, true);

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

            $('#successToast').show().toast("show");
            populateForm(contactID);
        });

    $('#enableEdit')
        .removeClass('hidden')
        .show();
    $('#submitEdit').addClass('hidden');
    $('#cancelEdit').addClass('hidden');

    $('input')
        .addClass('form-control-plaintext text-light')
        .removeClass('form-control')
        .prop('readonly', true);
});

$('#enableEdit').click(function() {
    birthdateForm.val(birthdayDigits);

    $('#enableEdit')
        .addClass('hidden')
        .hide();
    $('#submitEdit').removeClass('hidden');
    $('#cancelEdit').removeClass('hidden');

    $('input')
        .removeClass('form-control-plaintext text-light')
        .addClass('form-control')
        .prop('readonly', false);
});

$('#cancelEdit').click(function() {
    populateForm(contactID, false);

    $('#enableEdit')
        .removeClass('hidden')
        .show();
    $('#submitEdit').addClass('hidden');
    $('#cancelEdit').addClass('hidden');

    $('input')
        .addClass('form-control-plaintext text-light')
        .removeClass('form-control')
        .prop('readonly', true);
});

function populateForm(contactID, refresh) {
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
            birthdayDigits = cjson[0][5];
            var birthdayString = getBirthdayString(birthdayDigits);

            $('#firstName').val(cjson[0][2]);
            $('#lastName').val(cjson[0][3]);
            $('#phone').val(cjson[0][4]);
            $('#birthday').val(birthdayString);
            $('#address').val(cjson[0][6]);

            const name = cjson[0][2] + ' ' + cjson[0][3];

            $('#contactName').html(name);
        })
        .then(() => {
            // Display content
            if (refresh) {
                $('main')
                    .hide()
                    .removeClass('hidden')
                    .fadeIn();
            }
        });
}

// Get a string representing a birthday from a 6-digit string.
function getBirthdayString(s) {
    if(/(^\d{6}$)/.test(s) === false) {
        // Unparseable string
        return s;
    }

    var month = parseInt(s.substring(0, 2), 10);
    var day = parseInt(s.substring(2, 4), 10);
    var year = parseInt(s.substring(4, 6));
    if (year < 21) {
        year += 2000;
    }
    else {
        year += 1900;
    }

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var result = "";
    result += months[month-1] + " ";
    result += day + ", ";
    result += year;
    
    return result;
}
