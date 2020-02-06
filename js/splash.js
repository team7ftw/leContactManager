function registerUser(e) {
    // Prevent page reload
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    if(checkNameAvailable(username) === false) {
        alert('Username is taken!');
        return false;
    }

    fetch('https://cop4331group7api.azurewebsites.net/users',
        {
            method: 'PUT',
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
    .then(res => {
        // TODO: Display this message in the page
        alert('Success');
    });
}

function submitLoginUser(e) {
    // Prevent page reload
    e.preventDefault();

    const username = $('#username').val();
    const password = $('#password').val();

    fetch('https://cop4331group7api.azurewebsites.net/users/get',
        {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
    .then(res => {
        return res.json();
    })
    .then(rjson => {
        if(rjson == 0) {
            alert('Incorrect username/password!');
            $('#password').val('');
        } else {
            localStorage.setItem('currentUser', rjson[0][0]);
            localStorage.setItem('currentUsername', rjson[0][1]);
            window.location = 'contact.html';
        }
    });
}

// Check if username is taken
function checkNameAvailable(name) {
    fetch("https://cop4331group7api.azurewebsites.net/dev/showtable/users")
    .then(res => {
        return res.text();
    })
    .then(data => {
        // Fetch usernames from string
        const usernames = /row = \d ([a-zA-Z]*) /gm;
    
        const matches = data.matchAll(usernames);
        for (const m of matches) {
            if (m[1] === name) alert("User already exists!");
            return false;
        }
    });

    return true;
}
