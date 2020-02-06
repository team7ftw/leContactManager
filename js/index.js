var currentUser;

try {
    currentUser = localStorage.getItem('currentUser');
} catch (err) {
    // Possible the user has disabled local storage
    console.log('Error setting active user: ' + err);
} finally {
    if (currentUser === null) {
        currentUser = 1; // Default dev user
        localStorage.setItem('currentUser', currentUser);
    }

    const userData = {
        userID: currentUser
    };

    // Populate table with contact list
    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/get', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            return res.json();
        })
        .then(cjson => {
            $.each(cjson, (i, e) => {
                const row = $('<tr>');
                row.append(
                    $('<td>').text(i),
                    $('<td>').text(e[1]),
                    $('<td>').text(e[2]),
                    $('<td>').html(
                        '<a href="#" onclick="gotoEdit(' + e[0] + ')">Edit</a>'
                    ),
                    $('<td>').html(
                        '<a href="#" onclick="deleteContact(' +
                            e[0] +
                            ', this)">Delete</a>'
                    )
                ).appendTo('#contact-table');
                $('#contact-table')
                    .removeClass('hidden')
                    .hide()
                    .fadeIn();
            });
        });
}

function gotoEdit(id) {
    localStorage.setItem('editID', id);

    window.location = 'edit.html';
}

function deleteContact(id, td) {
    const domrow = $(td)
        .parent()
        .parent();

    const body = {
        userID: currentUser,
        contactID: id
    };

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
