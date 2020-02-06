function registerUser(e) {
    // Prevent page reload
    e.preventDefault();

    // Generate salt
    const salt = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Get values
    const username = $('#username').val();
    const password = $('#password').val();

    // Hash password and salt
    const hashedPass = md5(password + salt);

    // Ensure valid username
    if(checkNameAvailable(username) === false) {
        alert('Username is taken!');
        return false;
    }

    fetch('https://cop4331group7api.azurewebsites.net/users',
        {
            method: 'PUT',
            body: JSON.stringify({
                'username': username,
                'password': hashedPass,
                'salt': salt
            })
        })
    .then(res => {
        // TODO: Replace with toast
        console.log(res.json());
        alert('Success');
    });
}

function submitLoginUser(e) {
    // Prevent page reload
    e.preventDefault();

    // Get form values
    const username = $('#username').val();
    const password = $('#password').val();

    // Retreive salt
    fetch('https://cop4331group7api.azurewebsites.net/users/get', {
        method: 'POST',
        body: JSON.stringify({
            'username': username
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        const salt = data[1];

        const hashedPass = md5(password + salt);
    });

    /*
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
    */
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
