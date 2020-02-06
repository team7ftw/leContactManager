var currentUser;
var delTD;
var delID;

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

    // Fetch contact list JSON
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
                // Populate table
                const row = $('<tr>');
                row.append(
                    $('<td>').text(i),
                    $('<td>').text(e[1]),
                    $('<td>').text(e[2]),
                    $('<td>').html(
                        '<a href="#" onclick="gotoEdit(' + e[0] + ')">View</a>'
                    ),
                    $('<td>').html(
                        '<a href="#" data-toggle="modal" data-target="#confirmDelete" onclick="setDelete(' +
                            e[0] +
                            ', this)">Delete</a>'
                    )
                ).appendTo('#contact-table');

                // Fade table in once loaded completely
                $('#contact-table')
                    .removeClass('hidden')
                    .hide()
                    .fadeIn();
            });
        });
}

// Update table on search submit
$('#contactSearch').submit(e => {
    e.preventDefault();

    const s = $('#contactQuery').val();
    updateSearchResults(s);
});

// Reset table on clear search bar
$('#contactQuery').keyup(function() {
    if (!this.value) {
        updateSearchResults('');
    }
});

// Reset table on clear field 'x'
$('#contactQuery').on('search', function() {
    if (!this.value) {
        updateSearchResults('');
    }
});

function gotoEdit(id) {
    localStorage.setItem('editID', id);

    window.location = 'edit.html';
}

function setDelete(id, td) {
    delTD = td;
    delID = id;
}

function deleteContact() {
    $('#confirmDelete').modal('hide');

    const domrow = $(delTD)
        .parent()
        .parent();

    const body = {
        userID: currentUser,
        contactID: delID
    };

    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/contact', {
        method: 'DELETE',
        body: JSON.stringify(body)
    }).then(res => {
        domrow.fadeOut(200, () => {
            domrow.remove();
        });
    });
}

function updateSearchResults(query) {
    $('#contact-table').hide();

    fetch('https://cop4331group7api.azurewebsites.net/user/contacts/search', {
        method: 'POST',
        body: JSON.stringify({
            userID: currentUser,
            searchString: query
        })
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            // New code since the format of this response differs

            // Clear table
            $('tbody').empty();

            // No results found
            if (data.length === 0) {
                const p = $('<p>');
                p.text('No results found.');
                p.attr('id', 'no-results');
                p.addClass('py-4');
                p.appendTo('#contact-table');
            } else {
                $('#no-results').remove();
            }

            for (const c of data) {
                const row = $('<tr>');
                row.append(
                    $('<td>').text(c[0]),
                    $('<td>').text(c[2]),
                    $('<td>').text(c[3]),
                    $('<td>').html(
                        '<a href="#" onclick="gotoEdit(' + 
                            c[1] + 
                            ')">View</a>'
                    ),
                    $('<td>').html(
                        '<a href="#" data-toggle="modal" data-target="#confirmDelete" onclick="setDelete(' +
                            c[1] +
                            ', this)">Delete</a>'
                    )
                ).appendTo('#contact-table');
            }

            $('#contact-table').fadeIn();
        });
}
