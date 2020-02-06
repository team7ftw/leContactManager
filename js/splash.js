async function registerUser(e) {
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
    const valid = await checkNameAvailable(username);
    if(!valid) {
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
        alert('Success!');
        console.log(res.json());
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

        fetch('https://cop4331group7api.azurewebsites.net/users/login', {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': hashedPass
            })
        }).then(res => {
            return res.json();
        }).then(data => {
            localStorage.setItem('currentUser', data[0]);
            localStorage.setItem('currentUsername', username);

            window.location = 'contact.html'
        })
    });
}

// Check if username is taken
async function checkNameAvailable(name) {
    const res = await fetch('https://cop4331group7api.azurewebsites.net/users/get', {
        method: 'POST',
        body: JSON.stringify({
            'username': name
        })
    });

    const json = await res.json();

    if (json != 0) {
        alert('User already exists');
        return false;
    } else {
        return true;
    }
}
