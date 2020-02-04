// Hardcoded userID for dev
const userData = {
    "userID": "2"
}

$(document).ready(populateTable);

function populateTable() {
    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/get', {
        method: 'POST',
        body: JSON.stringify(userData)
    }).then(res => {
        return res.json();
    }).then(cjson => {
        $.each(cjson, (i, e) => {
            console.log('Appending... ' + e);
            const row = $('<tr>').append(
                $('<td>').text(i),
                $('<td>').text(e[1]),
                $('<td>').text(e[2]),
                $('<td>').html('<a href="#" onclick="gotoEdit(' + e[0] + ')">Edit</a>'),
                $('<td>').html('<a href="#" onclick="deleteContact(' + e[0] + ', this)">Delete</a>')
            ).appendTo('#contact-table');
        });
    });
}

function gotoEdit(id) {
    localStorage.setItem('editID', id);

    window.location = "edit.html";
}

function deleteContact(id, td) {
    const domrow = $(td).parent().parent();

    const body = {
        'userID': 2,
        'contactID': id
    }

    // TODO: Fade element instantly, then catch errors
    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/contact', {
        method: 'DELETE',
        body: JSON.stringify(body)
    }).then(res => {
        domrow.fadeOut(200, () => {
            domrow.remove();
        });
    });
    
}